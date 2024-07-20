import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Project")
export class Project  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    users: number;

    @Column({
        type: "date"
    })
    startDate: Date;

    @Column({
        type: "date"
    })
    endDate: Date;

    @Column()
    clientName: string;

    @Column()
    progress: number;
}
