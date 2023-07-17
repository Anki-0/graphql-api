import { GraphQLError } from 'graphql';
import { createTransport } from 'nodemailer';
import { addMinutes } from 'date-fns';

import db from '../../database/index.js';
import { generateOTP } from '../lib/helpers.js';

export interface SendVerificationRequestParams {
  to: string; // E-Mail address of reciver
  OTP: number;
  url: string;
}

interface GenerateOTPParams {
  identifier: string;
  expires?: Date;
  updatePrev?: boolean;
  operation?: string;
}

export const CredentialsProvider = {
  id: 'credentials',
  type: 'credentials',
  name: 'credentials',
  /**
   * @default maxAge for otp is 30 min
   */
  generateOTP: async (params: GenerateOTPParams) => {
    const { OTP, OTP_HASH } = generateOTP();

    if (params.updatePrev) {
      const token = await db.verificationTokens.update(
        {
          token: OTP_HASH,
          expires: addMinutes(new Date(), 30) // 30 min
        },
        {
          where: {
            identifier: params.identifier,
            operation: params.operation
          }
        }
      );

      if (!token) {
        throw new GraphQLError(`Verificaiton Token Updataion Failed.`, {
          extensions: {
            user_email: params.identifier,
            operation: params.operation
          }
        });
      }
    }

    if (!params.updatePrev) {
      /**
       * storing otp token hash inside database
       * @default maxAge for otp is 30 min
       * ⚠ REVIEW THIS IN FUTURE
       */
      const token = await db.verificationTokens.create({
        token: OTP_HASH,
        identifier: params.identifier,
        operation: params.operation as string,
        expires: params.expires ?? addMinutes(new Date(), 30) // @default 30 min
      });

      if (!token) {
        throw new GraphQLError(`Verificaiton Token Insertion Failed.`, {
          extensions: {
            identifier: params.identifier,
            operation: params.operation
          }
        });
      }
    }

    return { OTP, OTP_HASH };
  },
  sendVerificationRequest: async (params: SendVerificationRequestParams) => {
    const { to, OTP, url } = params;

    if (process.env.EMAIL_FROM === undefined) {
      throw new Error(
        `Email could not be sent due to EMAIL_FROM Environment Variable is not defined.`
      );
    }
    if (process.env.EMAIL_HOST === undefined) {
      throw new Error(
        `Email could not be sent due to EMAIL_HOST Environment Variable is not defined.`
      );
    }
    if (
      process.env.EMAIL_USERNAME === undefined ||
      process.env.EMAIL_PASSWORD === undefined
    ) {
      throw new Error(
        `Email could not be sent due to EMAIL_PASSWORD || EMAIL_USERNAME Environment Variable is not defined.`
      );
    }

    const transport = createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const result = await transport.sendMail({
      to,
      from: process.env.EMAIL_FROM,
      subject: `Signin to DevBlog`,
      // text: text({ url, host }),
      html: html({ url, OTP })
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);

    if (failed.length) {
      throw new Error(`Email (${failed.join(', ')}) could not be sent`);
    }
  }
};

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; OTP: number }) {
  const { url, OTP } = params;

  return `
<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: left;">
                    <!---->
                  </div>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                    <div style="color: rgb(0, 0, 0); text-align: center;">
                      <h1 style="margin: 1rem 0">Verification code</h1>
                      <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                      <p style="padding-bottom: 16px"><em><strong style="font-size: 130%">${OTP}</strong></em></p>
                      <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>The Dev team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
`;
}
