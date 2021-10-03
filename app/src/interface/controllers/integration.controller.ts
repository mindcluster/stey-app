import { Request, Response } from 'express'
import integrationService from '../../app/services/integration.service'

class IntegrationController {

    async getAll(_: Request, response: Response) {
        const integrations = await integrationService.getAll()

        return response.json(integrations)
    }

    async getByEmployee(request: Request, response: Response) {
        try {
            const id = parseInt(request.userId)

            const integrations = await integrationService.getByEmployee(id)
            return response.json(integrations)
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

}

export default new IntegrationController()