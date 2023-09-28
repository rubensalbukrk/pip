import React, {useContext} from 'react'
import axios from "axios";
import { UserContext } from '../contexts/UserContext';

export const api = "https://4850-45-183-25-32.ngrok-free.app/require"

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
    axios.delete(`${api}/users/${id}`, {
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
    axios.delete(`${api}/notices/${id}`, {
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
export function deleteSolicitation(id){
  axios.delete(`${api}/solicitations/${id}`, {
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
export function deleteAprovado(id){
  axios.delete(`${api}/aprovados/${id}`, {
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