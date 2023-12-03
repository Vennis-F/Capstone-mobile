export type CreateLearnerBodyRequest = {
    firstName: string;
    lastName: string;
    middleName: string;
    userName: string;
    password: string;
};

export type LearnerFilterResponse = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    userName: string;
    active: boolean;
};

export type CreateLearnerCourseBodyRequest = {
    learnerId: string;
    courseId: string;
};

export type UpdateLearnerCourseBodyRequest = {
    newLearnerId: string;
    currentLearnerId: string;
    courseId: string;
};

export type UpdateLearnerBodyRequest = {
    learnerId: string;
    firstName: string;
    lastName: string;
    middleName: string;
};

export type ChangePasswordLearnerBodyRequest = {
    learnerId: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};
