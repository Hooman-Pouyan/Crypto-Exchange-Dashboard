export interface ExchangeParams {
  user?: string;
  status?: string;
  currency?: string;
  page?: number;
  to_date?: string;
  from_date?: string;
  type?: string;
}

export interface PairParams {
  user: string;
  status?: string;
  currency?: string;
  page?: number;
  to_date?: string;
  from_date?: string;
}

export interface Pair {
  full_name: string;
  date_time: string;
  total_amount: string;
  type: string;
  status: string;
  currency: string;
  destin_currency: string;
  exchange_fee: string;
}

export interface ICurrenccy {
  id: number,
  slug: string,
  symbol: string,
  unit: string,
  priority: number,
  status: number,
  name: string,
  position: string,
  provider: Object
  exchange_fee: string,
  exchange_sell_rate_change: string,
  exchange_buy_rate_change: string,
  bank_connection: string,
  max_exchange: string,
  min_exchange: string,
  unit_coefficient: number,
  exchange_sell_price: string,
  exchange_buy_price: string,
}

export interface IExchangeFilter {
  page: number
  fullName?: string
  fromDate?: string
  toDate?: string
  currency?: string
  status?: number
  acceptTimeZone?: string
  acceptLanguage?: string
}
