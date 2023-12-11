import axios from "axios";
import { NoticesProps } from "../interfaces/Notices";
import { SolicitationsProps } from "../interfaces/Solicitations";

const BASE_URL = "https://pip-server.vercel.app/api";

interface Page<T> {
  notices: Array<T>
}

const config = {
  method: 'get'
  }

const getNotices = async (): Promise<NoticesProps[]> => {
    const response = await axios.get<Page<NoticesProps>>(`${BASE_URL}/notices`, config)
    return response.data.notices
}

const getSolicitations = async (): Promise<SolicitationsProps[]> => {
  try {
    const response = await axios.get<SolicitationsProps[]>(`${BASE_URL}/solicitations`, config);
    return response?.data
  } catch (error) {
    alert('O servidor não responde, tente novamente mas tarde!')
  }
}

function deleteUser(id) {
  axios
    .delete(`${BASE_URL}/users/${id}`, {
      method: "delete",
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
function deleteNotice(id) {
  axios
    .delete(`${BASE_URL}/notices/${id}`, {
      method: "delete"
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
function deleteSolicitation(id) {
  axios
    .delete(`${BASE_URL}/solicitations/${id}`, {
      method: "delete",
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
function deleteAprovado(id) {
  axios
    .delete(`${BASE_URL}/aprovados/${id}`, {
      method: "delete"
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}

export const api = {
  BASE_URL,
  getNotices,
  deleteNotice,
  getSolicitations,
  deleteSolicitation
 
}
