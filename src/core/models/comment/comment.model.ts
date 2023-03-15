import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Image } from '../image/image.model';

@Table
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER, allowNull: false })
  imageId: number;

  @BelongsTo(() => Image, { onDelete: 'CASCADE' })
  image: Image;
}
