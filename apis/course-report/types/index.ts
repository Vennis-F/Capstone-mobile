import { CourseFullInfor } from "../../courses/types";

export type CreateCourseReportBodyRequest = {
  description: string;
};

export type CourseReportFilterResponse = {
  id: string;
  course: CourseFullInfor;
  description: string;
  active: boolean;
  insertedDate: Date;
  firstName: string;
  middleName: string;
  lastName: string;
  userNameOrEmail: string;
};
