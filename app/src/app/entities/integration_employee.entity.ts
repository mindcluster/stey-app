import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('INTEGRATIONS_EMPLOYEES')
export default class IntegrationEmployees {
    @Column()
    @PrimaryColumn()
    integrations_id: number;

    @Column()
    @PrimaryColumn()
    employees_id: string;
}