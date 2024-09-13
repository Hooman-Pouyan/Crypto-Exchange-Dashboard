import { ICommissionDetail } from './ICommission';

export interface IClub {
  id: number;
  level_name: string;
  icon: string;
  poan: string;
  poan_to_next_level: string;
  invite_code: string;
  commission_detail: ICommissionDetail;
}
