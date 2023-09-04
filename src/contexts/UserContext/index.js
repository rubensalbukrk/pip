import React, { createContext, useState} from 'react'

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [notices, setNotices] = useState([])
    const [users, setUsers] = useState([])
    const [logged, setLogged ] = useState({});

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