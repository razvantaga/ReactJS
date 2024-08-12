import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'title' })
  title: string;

  @Column({ type: 'text', nullable: true, name: 'description' })
  description: string;

  @Column({ type: 'varchar', length: 255, name: 'url' })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'img' })
  img?: string; // Optional field
}
