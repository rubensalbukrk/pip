import { FilhosProps } from "./Filhos"

export interface UserProps {
    id: number
    nome: string
    idade: number
    email: string
    cpf: string
    filhos: Array<FilhosProps>
}