import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Employee from "./employee.entity";


@Entity('SMUS')
export default class Smu {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    smu_name: string;

    @Column()
    budget: number;

    @OneToMany(() => Employee, (employee) => employee.smus)
    employees: Employee[];
}