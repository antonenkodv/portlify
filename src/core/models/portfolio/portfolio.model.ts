import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Image } from '../image/image.model';

@Table
export class Portfolio extends Model<Portfolio> {
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @HasMany(() => Image, { onDelete: 'CASCADE' })
  images: Image[];
}
