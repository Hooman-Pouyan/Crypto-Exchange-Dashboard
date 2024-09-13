export interface IDeposit {
  full_name: string;
  date_time: string;
  base_price: string;
  total_price: string;
  type: string;
  total_amount: string;
  status: string;
  currency: string;
  exchange_fee: string;
  tracking_code: string;
}

export interface IExchange {
  full_name: string;
  date_time: string;
  base_price: string;
  total_price: string;
  type: string;
  total_amount: string;
  status: string;
  currency: string;
  exchange_fee: string;
  tracking_code: string;
}

export interface IPair {
  full_name: string;
  date_time: string;
  total_amount: string;
  type: string;
  status: string;
  currency: string;
  destin_currency: string;
  exchange_fee: string;
}

export interface IWallets {
  symbol: string;
  balance: number;
}
export interface IAddressReport {
  network: string;
  used: number;
  address_count: number;
  support_currency: number;
}
export interface IWithdraw {
  full_name: string;
  date_time: string;
  total_amount: string;
  type: string;
  status: string;
  currency: string;
}
