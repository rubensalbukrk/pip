import React, {useContext} from 'react'
import axios from "axios";
import { UserContext } from '../contexts/UserContext';

export const api = "https://050a-45-183-25-97.ngrok-free.app/require/users"
export const apiNotice = "https://050a-45-183-25-97.ngrok-free.app/require/notices"


export function getNotices(){
    const {setNotices} = useContext(UserContext)
    axios
      .get(apiNotice, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const notices = response.data.notices;
        setNotices(notices);
      })
      .catch((error) => console.log(error));
  };
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