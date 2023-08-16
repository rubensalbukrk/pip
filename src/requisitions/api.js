import React, { useContext } from 'react'
import axios from "axios";
import { Alert } from "react-native";


const api = "https://script.googleusercontent.com/macros/echo?user_content_key=qbvanCjMX_TK-yGnd150ftu29HGJtUEJJm48NeaPfaP3LCjR-NwK3e5zfqfaSfxr-kBEG6euAQUdQBdu9QRgRrHYqeKd2rf7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLM0I2KPhc0DF7ELxEvXmAd5emsO4bMC30fTI4reEJDgsiPkH5wjdZnFDKd7QLSjlmQhPnDjWZ1Qvu_vFmhBsSvGmztKOAlBAQ&lib=MZ_wAQjsbj4hQOzsbjD4eksicp6k4geWO"

export const getUsers = () => {

    return new Promise(() => {
        setTimeout(() => {
            axios.get(api)
            .then(response => {
                const data = response.data
                Alert.alert('API', 'CONSUMIDA COM SUCESSO')
            })
            .catch(error => console.log(error))
        }, 1000)
    })
}