import { Request, Response } from "express";
import budgetService from "../../app/services/budget.service";

class BudgetController {

    async getAll(_: Request, response: Response) {
        try {
            const budgets = await budgetService.getAll();
            return response.status(200).json(budgets);
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async getByID(request: Request, response: Response) {
        const { id } = request.params;
        const budget = await budgetService.getById(parseInt(id));

        return response.status(200).json(budget);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const budget = await budgetService.update(parseInt(id), request.body);

        return response.status(200).json(budget);
    }

    async getCurrentBudget(request: Request, response: Response) {
        const budget = await budgetService.getCurrentBudget();

        return response.status(200).json(budget);
    }
}

export default new BudgetController()