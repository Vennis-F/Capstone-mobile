import { UserRole } from "../../auth/types";

export type CreateCourseFeedbackBodyRequest = {
  ratedStar: number;
  description: string;
};

export type CourseFeedbackFilterResponse = {
  id: string;
  ratedStar: number;
  description: string;
  insertedDate: string;
  insertedBy: string;
  updatedDate: string;
  updatedBy: string;
  active: boolean;
  role: UserRole;
};
