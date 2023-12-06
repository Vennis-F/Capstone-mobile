import { Course } from "../../courses/types";

export type PromotionCourse = {
  id: string;
  effectiveDate: string;
  expiredDate: string;
  active: boolean;
  code: string;
  promotion: Promotion;
};

export type Promotion = {
  id: string;
  discountPercent: number;
  insertedDate: string;
  updatedDate: string;
  note: string;
  active: boolean;
};


export type Cart = {
  id: string;
  insertedDate: Date;
  updatedDate: Date;
  cartItems: CartItem[];
};

export type CartItem = {
  id: string;
  course: Course;
  promotionCourse: PromotionCourse | null;
};

export type AddCartItemBody = { courseId: string; promotionCourseId: string | null; };

export type CartTotalPrice = {
  totalPrice: number;
  totalPriceDiscount: number;
  totalPriceAfterPromotion: number;
};
