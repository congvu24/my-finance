export interface Coin {
  id: string;
  date: string;
  code: string;
  amount: number;
  symbol: string;
  price: number;
  note: string;
  type: -1 | 0 | 1;
  created_by: string;
  coinId: string;
}
