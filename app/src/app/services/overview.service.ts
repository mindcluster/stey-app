import { getConnection, Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import { IEntryExitResponse, IFutureExpLevelEmployeeResponse, IOverviewResponse, IPromotionsResponse, IUseEmployeeData, IUseEmployeeResponse } from "../shared/interfaces/overview.interface";
import { toJSONLocal } from "../shared/utils/cleanData";
import getMonthName from "../shared/utils/getMonthName";


const connection = getConnection()

class OverviewService {

    repositoryEmployee: Repository<Employee>

    async getOverview(): Promise<IOverviewResponse> {
        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find({ relations: ["smus"] });

        const overview: IOverviewResponse = {
            employees: employees.length,
            entry: employees.filter(employee => (employee.entry_date !== null && employee.entry_date.getMonth() == new Date().getMonth())).length,
            exit: employees.filter(employee => (employee.exit_date !== null && employee.exit_date.getMonth() == new Date().getMonth())).length,
            promotion: employees.filter(employee => employee.last_promotion_date !== null).length / employees.length * 100,
            turnover: employees.filter(employee => employee.exit_date !== null).length / employees.length * 100
        }

        return overview;
    }

    async getPromotion() {
        const promotions: IPromotionsResponse[] = []
        let items = {};

        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find();

        for (const employee of employees) {
            if (employee.last_promotion_date !== null) {
                const month = new Date(employee.last_promotion_date).getMonth();

                if (items[month]) {
                    items[month].employees += 1;
                } else {
                    items[month] = {
                        month: getMonthName(month),
                        employees: 1
                    };
                }
            }
        }

        for (const key in items) {
            promotions.push(items[key]);
        }

        return promotions;
    }

    async getEntryExit(): Promise<IEntryExitResponse[]> {
        const entryExit: IEntryExitResponse[] = []
        let items = {};

        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find();

        for (const employee of employees) {
            if (employee.entry_date !== null) {
                const date = toJSONLocal(employee.entry_date)

                if (items[date]) {
                    items[date].entry += 1;
                } else {
                    items[date] = {
                        date: date,
                        entry: 1,
                        exit: 0
                    };
                }
            }

            if (employee.exit_date !== null) {
                const date = toJSONLocal(employee.entry_date)

                if (items[date]) {
                    items[date].exit += 1;
                } else {
                    items[date] = {
                        date: date,
                        entry: 0,
                        exit: 1
                    };
                }
            }
        }

        for (const key in items) {
            entryExit.push(items[key]);
        }

        return entryExit;
    }

    async getTurnover(): Promise<IEntryExitResponse[]> {
        const turnover: IEntryExitResponse[] = []
        let items = {};

        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find();

        for (const employee of employees) {
            if (employee.exit_date !== null) {
                const month = new Date(employee.exit_date).getMonth();

                if (items[month]) {
                    items[month].turnover += 1;
                } else {
                    items[month] = {
                        date: getMonthName(month),
                        turnover: 1
                    };
                }
            }
        }

        for (const key in items) {
            turnover.push(items[key]);
        }

        return turnover;
    }

    async getUseEmployee(id: number): Promise<IUseEmployeeResponse> {
        let items = {};

        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find({ cache: 1000000 });
        let useEmployee: IUseEmployeeResponse = {
            employee_use: null,
            data: []
        };
        const useData: IUseEmployeeData[] = []

        for (const employee of employees) {
            const value = Math.round(employee.utilizaçao * 10) / 10;

            if (employee.id !== id) {
                if (items[value]) {
                    items[value].value += 1;
                } else {
                    items[value] = {
                        key: value,
                        value: 1
                    };
                }
            } else {
                useEmployee.employee_use = employee.utilizaçao;
            }
        }
        for (const key in items) {
            useData.push(items[key]);
        }

        useEmployee.data = useData;
        return useEmployee;
    }

    async getFutureLevelExperience(id: number): Promise<IFutureExpLevelEmployeeResponse> {
        const futureExpLevel: IFutureExpLevelEmployeeResponse = {
            future_exp_level: null,
            data: []
        }
        let items = {};

        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find({ cache: 1000000 });

        for (const employee of employees) {
            const value = Math.round(employee.exp_level_futuro * 10) / 10;

            if (employee.id !== id) {
                if (items[value]) {
                    items[value].value += 1;
                } else {
                    items[value] = {
                        key: value,
                        value: 1
                    };
                }
            } else {
                futureExpLevel.future_exp_level = employee.exp_level_futuro;
            }
        }

        for (const key in items) {
            futureExpLevel.data.push(items[key]);
        }

        return futureExpLevel;
    }

}



export default new OverviewService()