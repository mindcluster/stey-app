import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Employee from "./employee.entity";


@Entity('CERTIFICATES')
export default class Certificate {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    date: Date;

    @ManyToOne(() => Employee, (employee) => employee.certificates)
    @JoinColumn({ name: 'employees_id' })
    employee: Employee;
}