export type Level = {
  id: string;
  name: string;
  insertedDate: string;
  updatedDate: string;
  active: boolean;
};

export type CreateLevelBodyRequest = {
  name: string;
};

export type UpdateLevelBodyRequest = CreateLevelBodyRequest;
