export interface Transaction {
  id: string;
  date: string;
  source: string;
  category: string;
  amount: number;
  note: string;
  type: -1 | 0 | 1;
  created_by: string;
}
