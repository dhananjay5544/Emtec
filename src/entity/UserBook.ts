import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserBook extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  book_id: number;
}
