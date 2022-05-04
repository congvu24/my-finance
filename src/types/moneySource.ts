export interface CreateMoneySource {
  name: string;
  created_by: string;
  description: string;
}

export interface UpdateMoneySource {
  id: string;
  data: {
    name: string;
    description: string;
  };
}
