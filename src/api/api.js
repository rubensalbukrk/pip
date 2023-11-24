import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const api = "https://628f-45-183-25-57.ngrok-free.app/require";
export const apiUpload = `${api}/upload`;

export const getUsers = async () => {
  const { setUsers } = useContext(UserContext);
  try {
    const response = await axios.get(`${api}/users`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const userData = await response.data.users;
    setUsers(userData);
  } catch (error) {
    alert("Não houve resposta do serviço para usuários!")
  }
};

export const getNotices = async () => {
  const { setNotices, setRefreshing } = useContext(UserContext);
  try {
    const response3 = await axios.get(`${api}/notices`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const notices = await response3.data.notices;
    setNotices(notices);
    setRefreshing(false);
  } catch (error) {
      alert("Houve um problema com o servidor, tente novamente!") &
      setRefreshing(false)

  }
};

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
