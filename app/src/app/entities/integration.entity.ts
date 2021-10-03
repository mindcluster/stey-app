import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('INTEGRATIONS')
export default class Integration {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
}