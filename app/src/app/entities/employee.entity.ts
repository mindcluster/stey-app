import bcryptjs from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Certificate from './certificate.entity';
import Integration from './integration.entity';
import Smu from './smu.entity';

@Entity('EMPLOYEES')
export default class Employee {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password?: string;

    @Column()
    gpn: string;

    @Column()
    nome: string;

    @Column()
    image: string;

    @Column()
    salario_base_fy_atual: number;

    @Column()
    employee_status: string;

    @Column()
    pais: string;

    @Column()
    gender: string;

    @Column()
    location_city: string;

    @Column()
    service_line: string;

    @Column()
    sub_sl: string;

    @Column()
    rank_atual: string;

    @Column()
    exp_lev_atual: number;

    @Column()
    job_title: string;

    @Column()
    hiring_date: Date;

    @Column()
    proporcional_hiring_date: Date;

    @Column()
    last_promotion_date: Date;

    @Column()
    entry_date: Date;

    @Column()
    exit_date: Date;

    @Column()
    utilizaçao: number;

    @Column()
    promoçao: string;

    @Column()
    lead_atual: string;

    @Column()
    rank_futuro: string;

    @Column()
    exp_level_futuro: number;

    @Column()
    actual: number;

    @Column()
    smus_id: number;

    @Column()
    jobs_id: number;

    @OneToMany(() => Certificate, (certificate) => certificate.employee, { eager: true })
    certificates: Certificate[]

    @ManyToOne(() => Smu, (smu) => smu.employees, { eager: false })
    @JoinColumn({ name: 'smus_id' })
    smus: Smu;

    @ManyToMany(() => Integration)
    @JoinTable()
    integrations: Integration[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcryptjs.hashSync(this.password ? this.password : '', 8);
    }
}