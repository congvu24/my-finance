export interface CreateTransaction {
  date: string;
  source: string;
  category: string;
  amount: number;
  note: string;
  type: 0 | 1 | -1;
}
