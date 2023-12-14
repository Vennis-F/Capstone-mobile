import { PageOptions } from "../../../libs/types";

export type Contest = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  insertedDate: string;
  prize: string;
  startedDate: string;
  expiredDate: string;
  active: boolean;
  status: ContestStatus;
  staffName: string;
  totalCustomerDrawing: number;
};

export type CreateContestBodyRequest = {
  title: string;
  description: string;
  prize: string;
  startedDate: string;
  expiredDate: string;
};

export enum ContestStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export type FindContestsFilterBodyRequest = {
  status?: ContestStatus;
  pageOptions: PageOptions;
};

export function mapStatusToVietnamese(status: ContestStatus): string {
  switch (status) {
    case ContestStatus.PENDING:
      return 'chưa diễn ra';
    case ContestStatus.ACTIVE:
      return 'đang diễn ra';
    case ContestStatus.EXPIRED:
      return 'đã kết thúc';
    default:
      return 'Trạng thái không xác định';
  }
}

export type DefinePromotionForWinnerBodyRequest = {
  discountPercentFirst: number;
  effectiveDateFirst: string;
  expiredDateFirst: string;

  discountPercentSecond: number;
  effectiveDateSecond: string;
  expiredDateSecond: string;

  discountPercentThird: number;
  effectiveDateThird: string;
  expiredDateThird: string;
};

export type ViewWinner = {
  id: string;
  position: number;
  active: boolean;
  winnerName: string;
  insertedDate: Date;
  imageUrl: string;
  title: string;
  description: string;
};
