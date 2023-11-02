import React, { useContext } from "react";

import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

export const api = "https://4c9a-45-183-26-22.ngrok-free.app/require";
export const apiUpload = `${api}/upload`;

export const getSolicitation = async () => {
  const {setSolicitations} = useContext(UserContext)
  const navigation = useNavigation()
  try {
    const response = await axios.get(`${api}/solicitations`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const solicitations = response.data.solicitations;
    setSolicitations(solicitations);
  } catch (error) {
    return alert('Houve um problema com o servidor, aguarde um momento!')
    &
    navigation.navigate('HomeApp')
  }
};
export const getAprovados = async () => {
  const { setAprovados } = useContext(UserContext);
  const navigation = useNavigation()
  try {
    const response = await axios.get(`${api}/aprovados`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const aprovados = response.data.aprovados;
    setAprovados(aprovados);
  } catch (error) {
    return (
      alert("Houve um problema com o serviço, aguarde um momento!") &
      navigation.navigate("HomeApp")
    );
  }
};
export const getUsers = async () => {
  const { setUsers } = useContext(UserContext);
  const navigation = useNavigation()
  try {
    const response = await axios.get(`${api}/users`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const users = response.data.users;
    setUsers(users);
  } catch (error) {
    return alert("Não houve resposta do serviço para usuários!")
    &
    navigation.navigate('HomeApp')
  }
};

export const getNotices = async () => {
  const { setNotices, setRefreshing } = useContext(UserContext);
  const navigation = useNavigation()
  try {
    const response = await axios.get(`${api}/notices`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const notices = await response.data.notices;
    setNotices(notices);
    setRefreshing(false);
  } catch (error) {
    return (
      navigation.navigate("HomeApp") &
      setRefreshing(false)
    );
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
