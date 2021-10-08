
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

export interface ITurnOverResponse {
    month: string;
    turnover: number;
}

export interface IUseEmployeeData {
    key: number
    value: number
}

export interface IUseEmployeeResponse {
    employee_use: number,
    data: IUseEmployeeData[]
}