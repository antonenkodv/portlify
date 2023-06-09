import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Portfolio } from '../portfolio/portfolio.model';
import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';

export interface InputFile {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

@Table
export class Image extends Model<Image> {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @ForeignKey(() => Portfolio)
  @Column({ type: DataType.INTEGER, allowNull: false })
  portfolioId: number;

  @BelongsTo(() => Portfolio, { onDelete: 'CASCADE' })
  portfolio: Portfolio;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @HasMany(() => Comment, { onDelete: 'CASCADE' })
  comments: Comment[];
}
