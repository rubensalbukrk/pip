import axios from "axios";
import { NoticesProps } from "../interfaces/Notices";
import { SolicitationsProps } from "../interfaces/Solicitations";
import { AprovadosProps } from "../interfaces/Aprovados";
import { PageProps } from "../interfaces/Page";
import { UserProps } from "../interfaces/User";
import { Alert } from "react-native";

const BASE_URL = "https://pip-server.vercel.app/api"
const config = {
  method: 'get'
  }

const getNotices = async (): Promise<NoticesProps[]> => {
  try {
    const response = await axios.get<NoticesProps>(`${BASE_URL}/notices`, config)
    return response.data.results
  } catch (error) {
    Alert.alert('Atenção', 'Tente novamente mais tarde!')
  }
}

const getSolicitations = async (token): Promise<SolicitationsProps[]> => {
  try {
    const response = await axios.get<SolicitationsProps>(`${BASE_URL}/solicitations`,{
      method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
    return response.data.results
  } catch (error) {
    Alert.alert('Atenção', 'Tente novamente mais tarde!')
  }
}

const getAprovados = async (): Promise<AprovadosProps[]> => {
  try {
    const response = await axios.get<PageProps<AprovadosProps>>(`${BASE_URL}/aprovados`, config);
    return response.data.results.aprovados
  } catch (error) {
    Alert.alert('Atenção', 'Tente novamente mais tarde!')
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
    Alert.alert('Atenção', 'Tente novamente mais tarde!')
  }
}


function deleteNotice(id: number, token: any) {

  axios
    .delete(`${BASE_URL}/notices/${id}`, {
      method: "delete",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      alert(JSON.stringify(response.data));
    })
    .catch((error) => console.error(error));
}
export function deleteSolicitation(id: number | string, token: any) {
  axios
    .delete(`${BASE_URL}/solicitations/${id}`, {
      method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    })
    .then((response) => Alert.alert("Aviso",`${response.data}!`))
    .catch((error) => console.error(error));
}
export function deleteAprovado(id: number, token: any) {
  axios
    .delete(`${BASE_URL}/aprovados/${id}`, {
      method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
