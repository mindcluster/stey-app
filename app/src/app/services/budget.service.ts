import { getConnection, Repository } from "typeorm";
import Budget from "../entities/budget.entity";

const connection = getConnection()

class BudgetService {

    repository: Repository<Budget>

    async getById(id: number) {
        this.repository = connection.getRepository(Budget)

        return await this.repository.findOne({ id })
    }

    async getAll() {
        this.repository = connection.getRepository(Budget)

        return await this.repository.find()
    }

    async getCurrentBudget() {
        this.repository = connection.getRepository(Budget)

        const budgets = await this.repository.find()

        const mostRecentBudget = budgets.sort((a, b) => {
            return new Date(b.initial_date).getTime() - new Date(a.initial_date).getTime()
        })[0]

        return mostRecentBudget
    }

    async update(id: number, budget: Budget) {
        this.repository = connection.getRepository(Budget)

        const budgetToUpdate = await this.repository.findOne({ id })

        if (!budgetToUpdate) {
            throw new Error('Budget not found')
        }

        budgetToUpdate.used = budget.used

        const updateResult = await this.repository.update(id, budgetToUpdate)

        if (updateResult.affected === 0) {
            throw new Error('Budget not updated')
        }

        return budgetToUpdate
    }

    async decreaseBugdet(salary) {
        try {
            const budget = await this.getCurrentBudget()
            budget.used = parseInt(`${budget.used}`) + salary
            await this.update(budget.id, budget)
        } catch (error) {
            console.error(error)
        }
    }

}

export default new BudgetService()