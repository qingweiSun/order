import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JsessionidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jsessionid: string;

  @Column()
  type: string;

  constructor(jsessionid: string, type: string) {
    this.jsessionid = jsessionid;
    this.type = type;
  }
}
