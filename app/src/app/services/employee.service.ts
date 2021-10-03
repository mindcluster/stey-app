import { getConnection, Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import { IEmployeeResponse } from "../shared/interfaces/employee.interface";
import smuService from "./smu.service";

const connection = getConnection()

class EmployeeService {

    repository: Repository<Employee>

    async getAll() {
        const employeesResponse: IEmployeeResponse[] = []
        this.repository = connection.getRepository(Employee)

        const employees: Employee[] = await this.repository.find({relations: ["smus"]})

        for (let index = 0; index < employees.length; index++) {
            const employee = employees[index];
            employeesResponse.push({
                id: employee.id,
                name: employee.nome,
                job_role: employee.job_title,
                email: employee.email,
                gpn: employee.gpn,
                country: employee.pais,
                smu: employee.smus.smu_name,
                gênero: employee.gender,
                rank: employee.rank_atual,
                salary: employee.salario_base_fy_atual,
                dependents: 1,
                //promotion_score: getPromotionScore(employee.id),// TODO: implementar
                certificates: employee.certificates,
            })
        }

        return employeesResponse
    }

    async getById(id: number) {
        this.repository = connection.getRepository(Employee)

        const employee: Employee = await this.repository.findOne(id)
        return employee
    }

    async getByEmail(email: string) {
        this.repository = connection.getRepository(Employee)

        const employee: Employee = await this.repository.findOne({ email })
        return employee
    }

    async create(employee) {
        this.repository = connection.getRepository(Employee)

        const userExists = await this.repository.findOne({
            where: { email: employee.email }
        })

        if (userExists) {
            throw new Error("email needs to be unique");
        }

        const employeeCreated = await this.repository.save(employee)

        delete employeeCreated.password
        return { employee: employeeCreated }
    }

    async getPromotionScore(employeeId) { // TODO: implementar
        return 99;
    }

}

export default new EmployeeService()