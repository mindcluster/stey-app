import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import Employee from '../../app/entities/employee.entity'

class AuthController {
    async authenticate(request: Request, response: Response) {
        const repository = await getRepository(Employee)
        const { email, password } = request.body

        const employee = await repository.findOne({
            email: email
        })

        if (!employee) {
            return response.status(401).json({
                message: 'invalid employee'
            })
        }

        const isValidPassword = await bcryptjs.compare(password, employee.password ? employee.password : '')

        if (!isValidPassword) {
            return response.status(401).json({
                message: 'invalid password'
            })
        }

        const token = await jwt.sign({ id: employee.id, nome: employee.nome }, 'secret', { expiresIn: '100d' }) // TODO: change expiresIn to config

        delete employee.password
        return response.status(200).json({ 'message': 'token created', 'employee': { id: employee.id, nome: employee.nome }, 'token': token })
    }
}

export default new AuthController()