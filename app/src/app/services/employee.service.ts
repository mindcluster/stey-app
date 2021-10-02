import { getConnection, Repository } from "typeorm";
import Employee from "../entities/employee.entity";

const connection = getConnection()

class EmployeeService {

    repository: Repository<Employee>

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


}

export default new EmployeeService()