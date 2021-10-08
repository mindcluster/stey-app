import { Request, Response } from 'express'
import overviewService from '../../app/services/overview.service'
import { IUseEmployeeResponse } from '../../app/shared/interfaces/overview.interface'

class OverviewController {

    async getOverview(_: Request, response: Response) {
        const result = await overviewService.getOverview()

        response.status(200).json(result)
    }

    async getPromotion(_: Request, response: Response) {
        const result = await overviewService.getPromotion()

        response.status(200).json(result)
    }

    async getEntryExit(_: Request, response: Response) {
        const result = await overviewService.getEntryExit()

        response.status(200).json(result)
    }

    async getTurnover(_: Request, response: Response) {
        const result = await overviewService.getTurnover()

        response.status(200).json(result)
    }

    async getUseEmployee(request: Request, response: Response) {
        const id = request.params.id
        const result: IUseEmployeeResponse = await overviewService.getUseEmployee(parseInt(id))

        response.status(200).json(result)
    }


    async getFutureLevelExperience(request: Request, response: Response) {
        const id = request.params.id
        const result = await overviewService.getFutureLevelExperience(parseInt(id))

        response.status(200).json(result)

    }
}

export default new OverviewController()