import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Broadcast extends BaseEntity {

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  thumbnailImageUrl: string;

  @Column({ nullable: false })
  startDate: Date;

  @ManyToOne(() => User, user => user.broadcasts)
  user: User;

  @Index()
  @Column({ default: [], nullable: false })
  tags: string[];

}
