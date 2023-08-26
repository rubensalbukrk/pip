import React, { useContext } from 'react'
import axios from "axios";
import { Alert } from "react-native";
import { UserContext } from '../contexts/UserContext';
const api = "https://script.googleusercontent.com/macros/echo?user_content_key=qbvanCjMX_TK-yGnd150ftu29HGJtUEJJm48NeaPfaP3LCjR-NwK3e5zfqfaSfxr-kBEG6euAQUdQBdu9QRgRrHYqeKd2rf7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLM0I2KPhc0DF7ELxEvXmAd5emsO4bMC30fTI4reEJDgsiPkH5wjdZnFDKd7QLSjlmQhPnDjWZ1Qvu_vFmhBsSvGmztKOAlBAQ&lib=MZ_wAQjsbj4hQOzsbjD4eksicp6k4geWO"
const test = "https://9202-45-183-25-107.ngrok-free.app/requisition/users"

const dataAtual = new Date();

export const getUsers = () => {
    const { setUsers } = useContext(UserContext)
    axios.get(test, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        })})
    .then(response => {
        const getUsers = response.data.users
        setUsers(getUsers)
        })
        .catch(error => console.log(error))
}

const NovoUsuario = {
    status: true,
    date: dataAtual,
    nome: 'NOVO USUARIO',
    idade: 34,
    address: "rua do curioso 123",
    phone: "(83)98887-6543",
    cpf: '222.233.444.32',
    nis: "12345678901",
    email: 'teste@teste',
    password: '123456',
    parentsName: [
        {
            id: 1,
            name: "filho 1",
            idade: 4
        },
        {
            id: 2,
            name: "filho 2",
            idade: 3
        },
    ],
    question1: true,
    question2: "Um projeto que ajuda muita gente!"    
}
const updateUse = {
    nome: "alterado",
    cpf: "cancelado",

}

export function newUser(){
    axios.post(test, NovoUsuario, {
        method: 'post',
        headers: new Headers({
            "ngrok-skip-browser-warning" : "69421"
        })
    })
    .then(response => {
      alert(JSON.stringify(response.data))
    })
    .catch(error => console.error(error));
}

export function updateUser(id){
    axios.put(`${test}/${id}`, updateUse, {
        method: 'put',
        headers: new Headers({
            "ngrok-skip-browser-warning" : "69421"
        })
    } )
}

export function deleteUser(id){
    axios.delete(`${test}/${id}`, {
        method: 'delete',
        headers: new Headers({
            "ngrok-skip-browser-warning" : "69421"
        })
    })
    .then(response => {
        alert(JSON.stringify(response.data))
      })
      .catch(error => console.error(error));
}