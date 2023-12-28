import {ParentsProps} from "./Parents"

export interface UserProps {
    id: number
    date: string
    nome: string
    idade: string
    email: string
    nis: string
    cpf: string
    parents: Array<ParentsProps>
    question1: string
    question2: string

}