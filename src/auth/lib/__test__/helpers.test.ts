import * as helpers from '../helpers';

describe('Testing createScryptHash Funtion', () => {
  it('it should return salt and hashedBuffer', async () => {
    const { salt, hashedKeyBuffer } = await helpers.createScryptHash('test');

    expect(typeof salt).toBe('string');
    expect(typeof hashedKeyBuffer).toBe('object');
    expect(typeof hashedKeyBuffer.toString('hex')).toBe('string');
  });
});

describe('Testing validateScryptHash Funtion', () => {
  it('it should return `true`, if both key and hash match', async () => {
    const { salt, hashedKeyBuffer } = await helpers.createScryptHash('test');
    const hash = salt + '|' + hashedKeyBuffer.toString('hex');
    const valid = await helpers.validateScryptHash('test', hash);

    expect(typeof valid).toBe('boolean');
    expect(valid).toEqual(true);
  });

  it('it should return `false`, if both key and hash match', async () => {
    const { salt, hashedKeyBuffer } = await helpers.createScryptHash('test');
    const hash = salt + '|' + hashedKeyBuffer.toString('hex');
    const valid = await helpers.validateScryptHash('test1', hash);

    expect(typeof valid).toBe('boolean');
    expect(valid).toEqual(false);
  });
});

describe('OTP Generator Tests', function () {
  it('it should return 8 digit, when no lenght argument is passed.', () => {
    for (let i = 0; i < 50; i++) {
      const { OTP } = helpers.generateOTP();
      expect(typeof OTP).toBe('number');
      expect(OTP.toString()).toHaveLength(8);
      expect(OTP.toString()).toMatch(/^\d+$/); // Verify if the OTP contains only digits
    }
  });

  it('it should return 6 digit, when lenght argument is 6.', () => {
    for (let i = 0; i < 50; i++) {
      const { OTP } = helpers.generateOTP({ length: 6 });
      expect(typeof OTP).toBe('number');
      expect(OTP.toString()).toHaveLength(6);
      expect(OTP.toString()).toMatch(/^\d+$/); // Verify if the OTP contains only digits
    }
  });

  it('it should return 10 digit, when lenght argument is 10.', () => {
    for (let i = 0; i < 50; i++) {
      const { OTP } = helpers.generateOTP({ length: 6 });
      expect(typeof OTP).toBe('number');
      expect(OTP.toString()).toHaveLength(6);
      expect(OTP.toString()).toMatch(/^\d+$/); // Verify if the OTP contains only digits
    }
  });
});
