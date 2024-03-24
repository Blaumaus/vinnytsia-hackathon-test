import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryColumn('varchar', {
    unique: true,
    length: 10,
  })
  id: string;

  @Column('varchar', { length: 65536 })
  longUrl: string;

  @Column('integer', { default: 0 })
  hits: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;
}
