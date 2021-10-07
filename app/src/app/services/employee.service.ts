import { getConnection, Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import { ISalary } from "../shared/interfaces/action.interface";
import { IEmployeeResponse } from "../shared/interfaces/employee.interface";
import smuService from "./smu.service";

const connection = getConnection()

class EmployeeService {

    repository: Repository<Employee>

    async getAll() {

        this.repository = connection.getRepository(Employee)

        const employees: Employee[] = await this.repository.find({ relations: ["smus"], cache: 100000 })

        const employeesResponse: IEmployeeResponse[] = await this.buildEmployeeResponse(employees);

        return employeesResponse
    }



    async getById(id: number) {
        this.repository = connection.getRepository(Employee)

        const employee: Employee = await this.repository.findOne({ where: { id }, relations: ["smus"], cache: 100000 })

        if (!employee) {
            throw new Error("Employee not found")
        }

        const employeeResponse: IEmployeeResponse = await (await this.buildEmployeeResponse([employee]))[0]
        return employeeResponse
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


    async infoSalary(employeeId): Promise<ISalary> {
        this.repository = connection.getRepository(Employee)

        const employee: Employee = await this.repository.findOne(employeeId, { relations: ["smus"] })

        return {
            gpn: employee.gpn,
            name: employee.nome,
            smu: employee.smus.smu_name,
            rank: employee.rank_atual,
            current: employee.salario_base_fy_atual, // TODO: Implement current salary
            market: 0,// TODO: Implement Market method from Glassdoor
            budget_smu: employee.smus.budget
        }
    }

    async increaseSalary(employeeId, salary) {
        this.repository = connection.getRepository(Employee)

        const employee: Employee = await this.repository.findOne(employeeId)
        employee.salario_base_fy_atual = salary
        const employeeUpdated = await this.repository.save(employee)

        return employeeUpdated
    }

    async getPromotionScore(employeeId: number) {
        return 99; // TODO: implementar
    }

    async getRoleSatisfaction(id: number) {
        return 20; // TODO: implementar
    }


    async buildEmployeeResponse(employees: Employee[]): Promise<IEmployeeResponse[]> {
        const employeesResponse: IEmployeeResponse[] = []
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
                certificates: employee.certificates,
                promotion_score: await this.getPromotionScore(employee.id),
                last_promotion: employee.last_promotion_date,
                last_vacation: new Date(2021, 12, 1),
                company_time: employee.hiring_date,
                role_satisfaction: await this.getRoleSatisfaction(employee.id)
            });
        }
        return employeesResponse
    }

}

export default new EmployeeService()