import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Portfolio } from '../portfolio/portfolio.model';

export enum Status {
  OFFLINE = 'offline',
  ONLINE = 'online',
}

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

  @Column({
    type: DataType.ENUM(Status.OFFLINE, Status.ONLINE),
    allowNull: false,
    defaultValue: Status.OFFLINE,
  })
  status: string;

  @HasMany(() => Portfolio, { onDelete: 'CASCADE' })
  portfolios: Portfolio[];
}
