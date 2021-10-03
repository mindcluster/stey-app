import { getConnection, Not, Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import { IEntryExitResponse, IOverviewResponse, IPromotionsResponse } from "../shared/interfaces/overview.interface";
import getMonthName from "../shared/utils/getMonthName";


const connection = getConnection()

class OverviewService {

    repositoryEmployee: Repository<Employee>

    async getOverview(): Promise<IOverviewResponse> {
        this.repositoryEmployee = connection.getRepository(Employee);
        const employees = await this.repositoryEmployee.find({ relations: ["smus"] });

        const overview: IOverviewResponse = {
            employees: employees.length,
            //departments: employees.map(employee => employee.department).filter((value, index, self) => self.indexOf(value) === index).length,
            //positions: employees.map(employee => employee.position).filter((value, index, self) => self.indexOf(value) === index).length
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
                const date = employee.entry_date.toString()

                if (items[date]) {
                    items[date].entry += 1;
                } else {
                    items[date] = {
                        date: employee.entry_date,
                        entry: 1,
                        exit: 0
                    };
                }
            }

            if (employee.exit_date !== null) {
                const date = employee.exit_date.toString()

                if (items[date]) {
                    items[date].exit += 1;
                } else {
                    items[date] = {
                        date: employee.exit_date,
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
}

export default new OverviewService()