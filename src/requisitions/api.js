import React, { useContext, useEffect } from 'react'
import axios from "axios";
import { Alert } from "react-native";
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

export const api = "https://c34e-45-183-26-73.ngrok-free.app/require/users"
export const apiNotice = "https://c34e-45-183-26-73.ngrok-free.app/require/notices"

const dataAtual = new Date();

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
export function newUser(){
    axios.post(api, NovoUsuario, {
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

export function addNotice(){
    axios.post(apiNotice, newNotice, {
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
export function deleteUser(id){
    axios.delete(`${api}/${id}`, {
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
export function deleteNotice(id){
    axios.delete(`${apiNotice}/${id}`, {
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