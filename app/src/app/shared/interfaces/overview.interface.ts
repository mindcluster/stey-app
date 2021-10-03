
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

export interface IEntryExitResponse {
    date: Date;
    entry: number;
    exit: number;
}

export interface IBudgetResponse {
    budget: number;
}
