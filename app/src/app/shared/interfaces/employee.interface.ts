import Certificate from "../../entities/certificate.entity";

export interface IEmployeeResponse {
    //Controle nosso
    id?: number;
    name?: string;
    job_role?: string;
    future_job_role?: string;
    email?: string;
    image?: string;
    // Dados da tabela
    gpn?: string;
    country?: string;
    smu?: string;
    gênero?: string;
    rank?: string;
    salary?: number;
    dependents?: number;
    promotion_score?: string;
    last_promotion?: Date;
    last_vacation?: Date;
    company_time?: Date;
    role_satisfaction?: number;
    sl?: string;
    sub_sl?: string;
    certificates?: Certificate[]
}