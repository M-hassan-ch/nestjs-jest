import { Column, Entity, NumericType, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    email: string
}

export default User;