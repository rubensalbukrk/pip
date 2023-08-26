import React, { createContext, useState, useEffect , useContext} from 'react'
import axios from "axios";
import { Alert } from "react-native";

const datePip = "https://script.google.com/macros/s/AKfycbxI_WLYf40jwhIVFZntXZ1R4SL2xRZ-F5bIqGlj1UPiFTui-r4uuTeww11nTC6bNjmq/exec"
const api = "https://6407-45-183-25-107.ngrok-free.app/requisition/users"

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [users, setUsers] = useState([])
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