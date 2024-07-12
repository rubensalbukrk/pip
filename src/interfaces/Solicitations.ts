import { AprovadosProps } from "./Aprovados"

export interface SolicitationsProps extends AprovadosProps {
    id: number
    pasta: string
    userInfo?: object
    results?
    token?
}