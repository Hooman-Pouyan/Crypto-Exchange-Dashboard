export interface ILoginRequest {
  mobile: string;
  type: string;
  hash: string;
  mobile_prefix: string;
}

export interface ILoginResponse {
  type: string;
  token: string;
  user: string;
  id: string;
  firstnME: string;
  lastname: string;
  gender: string;
  mobile_prefix: string;
  mobile: string;
  email: string;
  has_password: string;
  has_two_factor_authentication: string;
  has_g2f: string;
  has_e3f: string;
  avatar: string;
  notification_count: string;
}
