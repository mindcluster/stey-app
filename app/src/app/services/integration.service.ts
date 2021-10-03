import { getConnection, Repository } from "typeorm";
import Integration from "../entities/integration.entity";
import IntegrationEmployees from "../entities/integration_employee.entity";

const connection = getConnection()

class IntegrationService {

    repository: Repository<Integration>
    repositoryIntegrationEmployees: Repository<IntegrationEmployees>

    async getAll() {
        this.repository = connection.getRepository(Integration)
        return await this.repository.find()
    }

    async getByEmployee(employeeId: number) {
        this.repository = connection.getRepository(Integration)
        this.repositoryIntegrationEmployees = connection.getRepository(IntegrationEmployees)

        const integrationEmployees = await this.repositoryIntegrationEmployees.find({ where: { employees_id: employeeId } })

        if (integrationEmployees.length == 0) {
            return []
        }

        const integrationIds = integrationEmployees.map(integrationEmployee => integrationEmployee.integrations_id)

        return await this.repository.find({ where: { id: integrationIds } })
    }

}

export default new IntegrationService()