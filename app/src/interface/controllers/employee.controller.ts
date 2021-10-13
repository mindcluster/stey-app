import { Request, Response } from 'express'
import employeeService from '../../app/services/employee.service'

class EmployeeController {

    async create(request: Request, response: Response) {
        let employee = request.body

        try {
            const data = await employeeService.create(employee)
            console.log(data)
            return response.status(200).json({ 'message': 'user created', 'data': data })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }

    }

    async getAll(_: Request, response: Response) {
        try {
            const data = await employeeService.getAll()
            return response.status(200).json({ 'message': 'employee list', 'data': data })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async infoSalary(request: Request, response: Response) {
        let id = request.params.id

        try {
            const data = await employeeService.infoSalary(id)
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async increaseSalary(request: Request, response: Response) {
        let id = request.params.id
        let salary = request.body.salary

        try {
            const data = await employeeService.increaseSalary(id, salary)
            return response.status(200).json({ 'message': 'employee salary', 'data': data })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async getById(request: Request, response: Response) {
        let id = request.params.id

        try {
            const data = await employeeService.getById(parseInt(id))
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async update(request: Request, response: Response) {
        let id = parseInt(request.params.id)
        let employee = request.body

        try {
            const data = await employeeService.update(id, employee)
            return response.status(200).json({ 'message': 'employee updated', 'data': data })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

}

export default new EmployeeController()