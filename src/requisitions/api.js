import axios from "axios";

export const api = "https://21a9-45-183-25-97.ngrok-free.app/require/users"
export const apiNotice = "https://21a9-45-183-25-97.ngrok-free.app/require/notices"

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