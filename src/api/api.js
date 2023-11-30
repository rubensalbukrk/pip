import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const api = "https://993e-45-183-25-70.ngrok-free.app/require";


const config = {
  headers: {
    "ngrok-skip-browser-warning": "69421",
  }
  }

export const getNotices = async () => {
  const {setNotices, setRefreshing} = useContext(UserContext)
  try {
    const response = await axios.get(`${api}/notices`, config)
    const notices = await response.data.notices
    notices && setNotices(notices)
    setRefreshing(false)
  } catch (e) {
    console.log(`Houve um problema: ${e}`)
  }
}

export function deleteUser(id) {
  axios
    .delete(`${api}/users/${id}`, {
      method: "delete",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
export function deleteNotice(id) {
  axios
    .delete(`${api}/notices/${id}`, {
      method: "delete",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
export function deleteSolicitation(id) {
  axios
    .delete(`${api}/solicitations/${id}`, {
      method: "delete",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
export function deleteAprovado(id) {
  axios
    .delete(`${api}/aprovados/${id}`, {
      method: "delete",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
