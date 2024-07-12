import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProps } from '../../interfaces/User'

describe('Async test', () => {
    test('Não tem usuário salvo!', async () => {
        await AsyncStorage.getItem('token')
        expect(AsyncStorage.getItem).toBeFalsy
    } )

    test('Tem usuário salvo!', async () => {
        const user: UserProps = {
            id: 1,
            nome: 'Rubens',
            cpf: "111.222.333-12",
            email: "rubiinho@live.it",
            idade: 23,
            filhos: []
        }
       await AsyncStorage.setItem('token', JSON.stringify(user))
       expect(AsyncStorage.getItem).toBeTruthy
    })
})