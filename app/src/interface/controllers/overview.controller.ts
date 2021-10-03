import { Request, Response } from 'express'
import overviewService from '../../app/services/overview.service'

class OverviewController {

    async getPromotion(_: Request, res: Response) {
        const response = await overviewService.getPromotion()

        res.status(200).json(response)
    }
}

export default new OverviewController()