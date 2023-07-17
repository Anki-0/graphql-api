export interface HashedTokenResult {
  Token: string;
  TokenHash: string;
}

export interface GenerateOtpParams {
  length?: number; // lenght of otp, @default is 8
  otp?: number; // if otp is provided we generate sha256 hash for it and return
}

export interface GenerateOtpResult {
  OTP: number;
  OTP_HASH: string;
}
