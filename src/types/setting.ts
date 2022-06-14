export interface SettingSpending {
  category: string;
  categoryName: string;
  limit: number;
  created_by: string;
}

export interface UpdateSetting {
  id?: string;
  categoryName: string;
  category: string;
  limit: number;
}
