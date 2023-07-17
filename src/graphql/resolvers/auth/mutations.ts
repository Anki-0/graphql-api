import { addMinutes, isPast } from 'date-fns';
import {
  MutationResolvers,
  TokenType
} from '../../../types/__generated__/resolvers-types.js';

import {
  accessDeniedError,
  emailAlreadyExistsError,
  invalidCredentialsError
} from '../../../lib/graphql-error.js';
import { logger } from '../../../utils/logger.js';
import { __PRODUCTION__ } from './../../../utils/assertions.js';
import { generateOTP, validateScryptHash } from '../../../auth/lib/helpers.js';

export const AuthMutation: MutationResolvers = {
  signinWithCredentials: async (_, { input }, { db, auth, req, res }, info) => {
    /** Validation User-Input */

    //TODO

    // Checking if user is in Database
    const user = await db.user.findOne({
      where: {
        email: input.email
      },
      attributes: ['id', 'name', 'username', 'image', 'email', 'user_role'],
      include: [{ model: db.account }]
    });

    if (!user) {
      return invalidCredentialsError('Invalid email or password', {
        password: input.password,
        email: input.email
      });
    }

    if (user.accounts) {
      for (let i = 0; i < user.accounts?.length; i++) {
        const account = user.accounts[i];

        // Checking if input password is valid
        if (
          account.provider === 'credentials' &&
          !(await validateScryptHash(
            input.password,
            account.password as string
          ))
        ) {
          return invalidCredentialsError('Invalid email or password', {
            password: input.password,
            email: input.email
          });
        }

        // Checking Account Status
        if (
          account.provider === 'credentials' &&
          !account.status?.includes('ACTIVE')
        ) {
          return accessDeniedError(
            'Account not active. Please check your email.',
            {
              email: input.email
            }
          );
        }
      }
    }

    const authTokens = await auth.options.jwt.generateJwtToken({
      req,
      user,
      options: auth.options
    });
    // sending authentication cookies
    authTokens.cookies.map(({ name, value, options }) => {
      res.cookie(name, value, options);
    });
    logger.info('Signin JWT TOKENS ==> ', authTokens);

    return {
      success: {
        message: 'Singin successfull.',
        token: authTokens.encodedToken
      }
    };
  },
  signupWithCredentials: async (_, { input }, { db, auth }, info) => {
    const { CredentialsProvider } = auth.options.providers;

    if (!input.email || input.email.length === 0) {
      return invalidCredentialsError('Provided Email is Invalid.', {
        email: input.email
      });
    }
    if (!input.password || input.password.length === 0) {
      return invalidCredentialsError('Incorrect password. Please try again.', {
        email: input.password
      });
    }

    // Checking if user exist in Database
    const [user, isNewUser] = await db.user.findOrCreate({
      where: {
        email: input.email
      },
      defaults: {
        username: input.username,
        email: input.email,
        user_role: 'user'
      },
      attributes: [
        'id',
        'username',
        'name',
        'email',
        'email_verified',
        'user_role',
        'image'
      ]
    });

    // if user already exist inside Database
    if (!isNewUser) {
      return emailAlreadyExistsError('Account registration failed.', {
        user_email: input.email
      });
    }

    // Inserting accout details for the user
    await db.account.create({
      user_id: user.id,
      provider_type: CredentialsProvider.type,
      provider: CredentialsProvider.name,
      provider_account_id: input.email,
      password: input.password,
      status: 'PENDING'
    });

    /**
     * TODO: Handle if unable to create Account
     *
     *
     *
     * CODE
     */

    /**
     * Creating email verification token
     */
    const { OTP } = await CredentialsProvider.generateOTP({
      identifier: input.email,
      operation: 'register',
      expires: addMinutes(new Date(), 30) // 30 min
    });

    /** Maling OTP to the provided Email */
    await CredentialsProvider.sendVerificationRequest({
      url: `https://dev.to/signup/callback?otp=${OTP}&operation=register`,
      to: input.email,
      OTP: OTP
    });

    return {
      success: {
        message: `We need to verify that this email address is yours. Check your email. ${OTP}`
      }
    };
  },
  verifyToken: async (_, { input }, { db, auth }, info) => {
    const { CredentialsProvider } = auth.options.providers;

    if (input.type === TokenType['Otp']) {
      // Generating hash for gicen OTP
      const { OTP_HASH } = generateOTP({ otp: Number(input.token) });

      // find OTP hash in database
      const token = await db.verificationTokens.findOne({
        where: {
          token: OTP_HASH,
          identifier: input.email,
          operation: input.operation
        }
      });

      if (!token) {
        return {
          verified: false,
          message: 'Invalid OTP.'
        };
      }

      if (token && isPast(token.expires)) {
        // New OTP Generated
        const { OTP } = await CredentialsProvider.generateOTP({
          identifier: input.email,
          operation: 'register',
          updatePrev: true
        });

        await CredentialsProvider.sendVerificationRequest({
          OTP: OTP,
          to: input.email,
          url: 'https:dev.to/'
        });

        return {
          message: 'Invalid OTP or Expired. Check Your mail for new OTP.',
          verified: false
        };
      }

      await db.verificationTokens.destroy({
        where: {
          token: OTP_HASH,
          identifier: input.email,
          operation: input.operation
        }
      });

      const user = await db.user.findOne({
        where: {
          email: input.email
        },
        attributes: ['id', 'name', 'username', 'image', 'email', 'user_role'],
        include: [{ model: db.account }]
      });

      if (user) {
        user?.accounts?.forEach(async (account) => {
          console.log(account);
          if (account.provider === input.provider) {
            account.status = 'ACTIVE';
            await account.save();
          }
        });
      }
    }

    return {
      message: 'Valid OTP.',
      verified: true
    };
  }
};
