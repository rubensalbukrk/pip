import axios from "axios";
import { NoticesProps } from "../interfaces/Notices";
import { SolicitationsProps } from "../interfaces/Solicitations";
import { AprovadosProps } from "../interfaces/Aprovados";
import { PageProps } from "../interfaces/Page";
import { UserProps } from "../interfaces/User";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL = "https://pip-server.vercel.app/api"
const config = {
  method: 'get'
  }

const getNotices = async (): Promise<NoticesProps[]> => {
  try {
    const response = await axios.get<PageProps<NoticesProps>>(`${BASE_URL}/notices`, config)
    return response.data.results.notices
  } catch (error) {
    alert('O servidor não responde, tente novamente mas tarde!')
  }
}

const getSolicitations = async (): Promise<SolicitationsProps[]> => {
  try {
    const response = await axios.get<PageProps<SolicitationsProps>>(`${BASE_URL}/solicitations`, config);
    return response.data.results.solicitations
  } catch (error) {
    alert('O servidor não responde, tente novamente mas tarde!')
  }
}

const getAprovados = async (): Promise<AprovadosProps[]> => {
  try {
    const response = await axios.get<PageProps<AprovadosProps>>(`${BASE_URL}/aprovados`, config);
    return response.data.results.aprovados
  } catch (error) {
    alert('O servidor não responde, tente novamente mas tarde!')
  }
}

const getUsers = async (token: any): Promise<UserProps[]> => {
  try {
      const response = await axios.get(`${BASE_URL}/users`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      return response.data.results
  } catch (error) {
    alert('Houve um problema na conexão, tente novamente!')
  }
}


function deleteNotice(id: number) {
  axios
    .delete(`${BASE_URL}/notices/${id}`, {
      method: "delete"
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
export function deleteSolicitation(id: number | string) {
  axios
    .delete(`${BASE_URL}/solicitations/${id}`, {
      method: "delete",
    })
    .catch((error) => console.error(error));
}
export function deleteAprovado(id: number) {
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
  getUsers,
  getNotices,
  deleteNotice,
  getSolicitations,
  deleteSolicitation,
  getAprovados
}
