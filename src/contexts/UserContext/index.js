import React, { createContext, useState, useEffect , useContext} from 'react'
import axios from "axios";
import { Alert } from "react-native";

const api = "https://script.google.com/macros/s/AKfycbwtY5wjl65a6U6eZlUzRRMEdnZanZLUcdoM_pl9bre64933zZiQUgSGQZqAqBLVTvyz/exec"

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [users, setUsers] = useState([])

    function ObterDados(){
        axios.get(api)
            .then(response => {
                const data = response.data.users
                setUsers(data)
                })
                .catch(error => console.log(error))
    }
 
    const getting = {
        users,
        ObterDados
    }

    return (
        <UserContext.Provider value={getting}>
            {children}
        </UserContext.Provider>
    )
}