
export interface IOverviewResponse {
    employees?: number;
    entry?: number;
    exit?: number;
    promotion?: number;
    turnover?: number;
}

export interface IPromotionsResponse {
    month: string;
    promotions: number;
}