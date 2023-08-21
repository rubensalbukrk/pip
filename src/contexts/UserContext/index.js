import React, { createContext, useState, useEffect , useContext} from 'react'
import axios from "axios";
import { Alert } from "react-native";

const datePip = "https://script.google.com/macros/s/AKfycbwz6tPFvBeHIh9wD8dZQSQWouvxXCfxe-VyZT9wQdaVl9vIzMKnPsmiIp1tsqX628rQ/exec"
const api = "https://f555-45-183-25-107.ngrok-free.app/requisition/users"

export const UserContext = createContext({});

let tempUser =  [
    {
      id: 1,
      isAdmin: true,
      status: true,
      date: '3/8/2023 23:30:08',
      genero: "Masculino",
      nome: 'Rubens Developer',
      idade: 27,
      avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/363793891_247920134771958_5616203686962323957_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=IKaaGNRj1mkAX-44Eds&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfDvuRg6DxA_qL-ZwayTw-_uTmLXGufzBStY4dahzcCRGg&oe=64E69A51&_nc_sid=ee9879",
      address: 'rua dos curioso',
      phone: "83 986731696",
      cpf: "111.222.333-44",
      nis: "01020304051",
      email: "rubiinho@live.it",
      password: "654321",
      parentsName: [
        {
          id: 1,
          name: "filho 1",
          idade: 4
        },
        {
          id: 2,
          name: "filho 2",
          idade: 2
        }
      ],
      question1: true,
      question2: "É um projeto prospero e muito escálavel!"
    },
    {
      id: 2,
      isAdmin: false,
      status: true,
      date: '3/8/2023 23:30:08',
      genero: "Masculino",
      nome: 'Carlos',
      idade: 44,
      avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/140036378_864745747650875_7829212402257468423_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=ULMcFBo813AAX-eH8_J&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfCxDB6A5_Xph66yktRC8T_20LnSdvP_3sdHodPcuMydow&oe=64E5150C&_nc_sid=ee9879",
      address: 'rua do colegio 123',
      phone: "83 986731696",
      cpf: "111.111.111-11",
      nis: "01020304051",
      email: "carlos@teste.com",
      password: "123456",
      parentsName: [
        {
      id: 1,
          name: "filho 1",
          idade: 2
        },
        {
      id: 2,
          name: "filho 2",
          idade: 4
        },     
        {
      id: 3,
          name: "filho 3",
          idade: 5
        },
        {
      id: 4,
          name: "filho 4",
          idade: 6
        },
      ],
      question1: false,
      question2: "É um trabalho maravilhoso!"
    },
    {
      id: 3,
      isAdmin: false,
      status: true,
      date: '3/8/2023 23:30:08',
      genero: "Masculino",
      nome: 'Valdir',
      idade: 44,
      avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/222049443_343658050716508_2230379693903539097_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=rbpJHidjRP0AX952IoQ&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfAB7HqNELNcDx0nmvDNQxGiyCMennPjsDT2WlT4vjWJ3w&oe=64E511BC&_nc_sid=ee9879",
      address: 'rua dos curioso',
      phone: "83 986731696",
      cpf: "222.222.222-22",
      nis: "01020304051",
      email: "valdir@teste.com",
      password: "112233",
      parentsName: [
        {
      id: 1,
          name: "Rubens",
          idade: 27
        },
        {
      id: 2,
          name: "Vanessa",
          idade: 30
        }
      ],
      question1: true,
      question2: "Adorei conhecer o projeto!"
    },
    {
        id: 4,
        isAdmin: true,
        status: true,
        date: '20/8/2023 22:01:08',
        genero: "Masculino",
        nome: 'David Santana',
        idade: 30,
        avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/336218919_554045106561603_6296707162473895037_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=hdSKXTdurnYAX8-CQr3&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfCDbTlwbNPSLFMhbEymexNcYCPARpsnP5Zfo4HQ8g_27Q&oe=64E7E58B&_nc_sid=ee9879",
        address: 'rua do pirulito',
        phone: "83 98665-0642",
        cpf: "333.333.333-33",
        nis: "01020304051",
        email: "david@david.com",
        password: "pip2023",
        parentsName: [
          {
            id: Number,
            name: String,
            idade: Number
          },
        ],
        question1: true,
        question2: "Projeto para todos"
      },
  ];
export default function UserProvider({children}) {
    const [users, setUsers] = useState(tempUser)
    const [user, setUser] = useState({})

    function ObterDados(){
        axios.get(api, {
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

    const getting = {
        users,
        user,
        ObterDados,
        setUsers
    }

    return (
        <UserContext.Provider value={getting}>
            {children}
        </UserContext.Provider>
    )
}