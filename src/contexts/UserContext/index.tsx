import React, { createContext, useState} from 'react'
import UserContextType from '../../interfaces/UserContextType'

export const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({children}) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>('')
    const [notices, setNotices] = useState<Array<Object[]>>([])
    const [users, setUsers] = useState<Array<Object[]>>([])
    const [logged, setLogged ] = useState<Object>({});
    const [solicitations, setSolicitations] = useState<Array<Object[]>>([])
    const [aprovados, setAprovados] = useState<Array<Object[]>>([])

    const getting: UserContextType = {
        refreshing,
        notices,
        users,
        avatar,
        logged,
        aprovados,
        solicitations,
        setRefreshing,
        setAvatar,
        setAprovados,
        setSolicitations,
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