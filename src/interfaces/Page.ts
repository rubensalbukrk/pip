export interface PageProps<T> {
    results?: {
       solicitations?: Array<T>
       aprovados?: Array<T>
       notices?: Array<T>
       
    } 
    users?: Array<T>

}