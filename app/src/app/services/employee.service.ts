import { getConnection, Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import { ISalary } from "../shared/interfaces/action.interface";
import { IEmployeeResponse } from "../shared/interfaces/employee.interface";
import axios from "axios";
import NodeCache from "node-cache";
import xlsx from "xlsx";

const connection = getConnection()

const URL_RECOMMENDATION = process.env.URL_RECOMMENDATION

class EmployeeService {

    repository: Repository<Employee>
    myCache = new NodeCache();

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
            market: await this.getMarketData(employee.rank_atual,employee.location_city),// TODO: Implement Market method from Glassdoor
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
        try {
            const promotionScoreCached = await this.myCache.get(employeeId)
            if (promotionScoreCached) {
                return promotionScoreCached
            }

            const result = await axios.get(URL_RECOMMENDATION + employeeId)
            this.myCache.set(employeeId, result.data['data']['status'], 10000000)

            return result.data['data']['status']
        } catch (error) {
            return "-"
        }
    }

    async getRoleSatisfaction(id: number) {
        return 42; // TODO: implementar
    }

    async getMarketData(rank:String, city:String) {
        var workbook = xlsx.readFile('../../infrastructure/data/salarios.xlsx');
        var sheet_name_list = workbook.SheetNames;
        var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        const emp = xlData.filter(x=> x.UF===city)
        const emp2 = emp[0]

        for(var i in emp2){
            if (i === rank){
                var average_salary = emp2[i]

            }
        }
        return average_salary
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
                image: employee.image,
                gpn: employee.gpn,
                country: employee.pais,
                smu: employee.smus.smu_name,
                gênero: employee.gender,
                rank: employee.rank_atual,
                salary: employee.salario_base_fy_atual,
                sl: employee.service_line,
                sub_sl: employee.sub_sl,
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

    async update(id, employee) {
        this.repository = connection.getRepository(Employee)

        const employeeUpdated = await this.repository.save({ ...employee, id })

        delete employeeUpdated.password
        return { employee: employeeUpdated }
    }

    async getRecommendations() {
        try {
            const recommendations = await this.myCache.get('recommendations')
            if (recommendations) {
                return recommendations
            }

            const result = await axios.get(URL_RECOMMENDATION)
            this.myCache.set('recommendations', result.data, 10000000)

            return result.data['data']
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default new EmployeeService()
