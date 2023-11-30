import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../api/api";
import BackgroundAbout from '../../../../assets/svgs/nos-wave.svg'
import { height, width } from "../../../utils/dimensions";

export default function ViewService({ route }) {
  const {logged} = useContext(UserContext)

  function handleSolicitation(service){
    let newSolicitation = {
        userInfo: logged,
        nome: logged?.nome,
        cpf: logged?.cpf,
        service: service,
        pasta: `${route?.params?.pasta}`,
        status: "Aguardando analise..."
      }
    axios
      .post(`${api}/solicitations`, newSolicitation, {
        method: "post",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69421",
        }),
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className='w-full h-full'>
      <View
      className='w-full h-full items-center'
      >
        <BackgroundAbout style={{position: 'absolute'}} width={width} height={height + 10} />
        <View 
        className='absolute top-9 left-4'>
          <BackButton />
        </View>
        <Image
          className=' w-40 h-40 my-14 rounded-full'
          resizeMode='cover'
          alt="pip-service"
          source={route?.params?.picture}
        />
        <View
        className='w-full px-3'>
          <Text 
          className='font-default self-start text-4xl mt-2 font-bold text-white'>
            {route?.params?.titulo}
          </Text>

          <View
          className='px-2 py-2 rounded-lg bg-white/20'>
            <Text
            className='font-default text-lg font-bold text-white'>
              {route?.params?.descricao}
            </Text>
          </View>
          <Text 
          className='font-default self-end text-2xl mt-2 font-bold text-white'>
            Serviços disponíveis
          </Text>
          <View
          className='px-2 py-2 w-full gap-1 rounded-lg bg-white/20'
          >
            
            {route?.params?.requisite[0] ? <TouchableOpacity onPress={() => handleSolicitation(route?.params?.requisite[0])} colorScheme={'darkBlue'}><Text className='font-defaul text-lg text-white'>{route?.params?.requisite[0]}</Text></TouchableOpacity> : null }
            {route?.params?.requisite[1] ? <TouchableOpacity onPress={() => handleSolicitation(route?.params?.requisite[1])} colorScheme={'darkBlue'}><Text className='font-defaul text-lg text-white'>{route?.params?.requisite[1]}</Text></TouchableOpacity> : null }
            {route?.params?.requisite[2] ? <TouchableOpacity onPress={() => handleSolicitation(route?.params?.requisite[2])} colorScheme={'darkBlue'}><Text className='font-defaul text-lg text-white'>{route?.params?.requisite[2]}</Text></TouchableOpacity> : null }
            {route?.params?.requisite[3] ? <TouchableOpacity onPress={() => handleSolicitation(route?.params?.requisite[3])} colorScheme={'darkBlue'}><Text className='font-defaul text-lg text-white'>{route?.params?.requisite[0]}</Text></TouchableOpacity> : null }
         
          </View>

        </View>
      </View>
    </ScrollView>
  );
}
