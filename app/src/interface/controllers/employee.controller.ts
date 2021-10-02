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

}

export default new EmployeeController()