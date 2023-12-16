import { FilhosProps } from "./Filhos"

export interface UserProps {
    id: number
    date: string
    nome: string
    idade: string
    email: string
    nis: string
    cpf: string
    filhos: Array<FilhosProps>
    question1: string
    question2: string

}