import { Dispatch, SetStateAction } from "react";

export default interface UserContextType {
    refreshing: boolean;
    notices: Array<object>[];
    users: Array<object>[];
    avatar: string;
    logged: Object; 
    aprovados: Array<Object>[]
    solicitations: Array<Object>[]
    setRefreshing: Dispatch<SetStateAction<boolean>>;
    setAvatar: Dispatch<SetStateAction<string>>;
    setAprovados: Dispatch<SetStateAction<Array<Object>[]>>; 
    setSolicitations: Dispatch<SetStateAction<Array<Object>[]>>;
    setNotices: Dispatch<SetStateAction<Array<Object>[]>>; 
    setUsers: Dispatch<SetStateAction<Array<Object>[]>>;
    setLogged: Dispatch<SetStateAction<Object>>; 
  }