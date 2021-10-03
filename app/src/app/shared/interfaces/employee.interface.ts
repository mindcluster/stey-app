import Certificate from "../../entities/certificate.entity";

export interface IEmployeeResponse {
    //Controle nosso
    id?: number;
    name?: string;
    job_role?: string;
    email?: string;
    // Dados da tabela
    gpn?: string;
    country?: string;
    smu?: string;
    gênero?: string;
    rank?: string;
    salary?: number;
    dependents?: number;
    promotion_score?: number;
    certificates?: Certificate[]
}