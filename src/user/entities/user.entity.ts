import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { ForbiddenException } from '@nestjs/common';

export enum ROLE {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.CLIENT })
  role: ROLE;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password);
  }

  verifyPassword(password: string): boolean {
    if (!compareSync(password, this.password)) {
      throw new ForbiddenException('Bad password');
    }
    return true;
  }
}
