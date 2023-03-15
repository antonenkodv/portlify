import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import {Portfolio} from "../portfolio/portfolio.model";

@Table
export class User extends Model<User> {

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @HasMany(() => Portfolio,{ onDelete: 'CASCADE' })
    portfolios: Portfolio[];
}
