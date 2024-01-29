import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Contact } from "./contacts.entity";


@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    telefone: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(()=>Contact, contact => contact.client)
    contacts: Contact[]
}