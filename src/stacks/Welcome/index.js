import React, { useContext, useEffect } from "react";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { Box, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { api, apiNotice } from "../../requisitions/api";

export const Welcome = () => {
  const navigation = useNavigation();
  const {setUsers, setNotices} = useContext(UserContext)

  useEffect(() => {
      getData()
      getNotices()
  },[api, apiNotice]);

  const getData = () => {
    axios
    .get(api, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
    .then((response) => {
      const users = response.data.users;
      setUsers(users);
    })
    .catch((error) => console.log(error));
  }
  const getNotices = () => {
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
  }

  return (
    <Box flex="1" bg={"white"} alignItems="center">
    
        <Animatable.View style={{width: '100%', height: '50%'}} bgC="black" delay={800} animation="bounceInDown">
          
          <Image alt="pip-logo" w="100%" h="100%" resizeMode="contain" source={require('../../../assets/imgs/pip-logo.jpg')} />
       
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={1000}> 
          <Text my="1" mx="2" fontFamily="Doppio One" fontSize="2xl">
          Aqui você tem acesso a todos os nossos serviços sociais!
        </Text>
        </Animatable.View>  
      
      <Box w="100%" shadow={6} borderTopRadius="full" h="50%" bg="lightBlue.500" mt="10" t="0" alignItems="center" >
      <Animatable.View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}} animation="rubberBand" iterationDelay={2} iterationCount="infinite" >
            <TouchableOpacity
                style={{
                width: 100,
                height: 100,
                paddingTop: 15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                background: '#537bfb',
                shadowColor: "#3766fa",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity:  0.21,
                shadowRadius: 6.65,
                elevation: 9
                              }}
                onPress={() => navigation.navigate("Login")}
            >
                <AntDesign name="arrowright" size={32} color="white" />
            </TouchableOpacity>
        </Animatable.View>
      </Box>
  
    </Box>
  );
};
