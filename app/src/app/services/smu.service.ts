import { getConnection, Repository } from "typeorm";
import Smu from "../entities/smu.entity";

const connection = getConnection()

class SmuService {

    repository: Repository<Smu>

    async getById(id: number) {
        this.repository = connection.getRepository(Smu)
        return await this.repository.findOne({ id })
    }

}

export default new SmuService()