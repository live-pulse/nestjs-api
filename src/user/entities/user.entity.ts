import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserResponse } from '../dto/response/response';
import { UserRole } from './user.role';
import { Broadcast } from 'src/broadcast/entities/broadcast.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ unique: true, nullable: false })
  account: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: 'https://cdn.hannah-log.site/profile.png' })
  userImageUrl: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Broadcast, broadcast => broadcast.user)
  broadcasts: Broadcast[];

  toResponse() {
    return new UserResponse(
      this.id,
      this.account,
      this.name,
      this.email,
      this.userImageUrl,
      this.phone,
      this.role,
      this.createdAt,
      this.updatedAt,
    );
  }
}
