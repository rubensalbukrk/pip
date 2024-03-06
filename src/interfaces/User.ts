import {ParentsProps} from "./Parents"

export interface UserProps {
    id: number
    isAdmin?: boolean
    date?: string
    nome: string
    idade: string
    avatar: string
    email?: string
    phone: string
    address: string
    bairro: string
    nis?: string
    cpf: string
    password?: string
    parents: Array<ParentsProps>
    question1?: string
    question2?: string

}