import { UserRole } from "../../../libs/types";

export type UserFilterResponse = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  userName?: string;
  avatar?: string;
  email?: string;
};

export type UpdateProfileBodyRequest = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  userName?: string;
};

export type ChangePasswordUserBodyRequest = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type Role = {
  id: string;
  name: UserRole;
};

export type UserWithRole = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email?: string;
  userName?: string;
  avatar?: string;
  role: Role;
  status: string;
  active: boolean;
};