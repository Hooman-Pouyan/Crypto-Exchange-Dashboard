import { IClub } from './IClub';

export interface IToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface IUserToken {
  currency: number;
  currency_text: string;
  currency_symbol: string;
  vertified: boolean;
  club: IClub;
}
