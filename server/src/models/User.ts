import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export const userTableName = 'users'

@Entity(userTableName)
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
