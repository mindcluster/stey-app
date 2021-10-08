import { Request, Response } from 'express'
import overviewService from '../../app/services/overview.service'
import { IEntryExitResponse } from '../../app/shared/interfaces/overview.interface'

class OverviewController {

    async getOverview(_: Request, res: Response) {
        const response = await overviewService.getOverview()

        res.status(200).json(response)
    }

    async getPromotion(_: Request, res: Response) {
        const response = await overviewService.getPromotion()

        res.status(200).json(response)
    }

    async getEntryExit(_: Request, res: Response) {
        const response = await overviewService.getEntryExit()

        res.status(200).json(response)
    }

    async getTurnover(_: Request, res: Response) {
        const response = await overviewService.getTurnover()

        res.status(200).json(response)
    }
}

export default new OverviewController()