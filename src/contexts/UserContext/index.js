<<<<<<< HEAD
import React, { createContext, useState} from 'react'
=======
import React, { createContext, useState, useEffect , useContext} from 'react'
import axios from "axios";
import { Alert } from "react-native";

const datePip = "https://script.google.com/macros/s/AKfycbxI_WLYf40jwhIVFZntXZ1R4SL2xRZ-F5bIqGlj1UPiFTui-r4uuTeww11nTC6bNjmq/exec"
const api = "https://6407-45-183-25-107.ngrok-free.app/requisition/users"
>>>>>>> 869decbc3ff84259de59ca5c9b7c8f4dc337303d

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [notices, setNotices] = useState([])
    const [users, setUsers] = useState([])
<<<<<<< HEAD
    const [logged, setLogged ] = useState({});
=======
    const [user, setUser] = useState({})

    function ObterDados(){
        axios.get(datePip, {
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
>>>>>>> 869decbc3ff84259de59ca5c9b7c8f4dc337303d

    const getting = {
        notices,
        users,
        logged,
        setNotices,
        setUsers,
        setLogged
    }

    return (
        <UserContext.Provider value={getting}>
            {children}
        </UserContext.Provider>
    )
}