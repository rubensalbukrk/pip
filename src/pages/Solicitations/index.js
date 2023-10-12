
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { 
    Box,
    Text, 
    ScrollView, 
    Container, 
    Center, 
    Icon, 
    Heading, 
    Divider, 
    FlatList, 
    HStack, 
    VStack, 
    NativeBaseProvider
} from 'native-base';
import {
    Pressable,
    TouchableOpacity,
  } from "react-native";
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { api, deleteAprovado } from "../../requisitions/api";
import UserAvatar from "../../../components/UserAvatar";
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../contexts/UserContext';
import BackButton from '../../../components/BackButton';




export default function SolicitationsUser() {
const {logged,
    solicitations,
    setSolicitations,
    setAprovados,
    aprovados } = useContext(UserContext)

    useEffect(() => (getSolicitation(), getAprovados()), []);
    if (solicitations) {
        var userSolicitations = solicitations.filter(
          (item) => String(item.cpf) === String(logged.cpf)
        );
      }
    const getAprovados = () => {
        axios
          .get(`${api}/aprovados`, {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          })
          .then((response) => {
            const aprovados = response.data.aprovados;
            setAprovados(aprovados);
          })
    
          .catch((error) => console.log(error));
      };
    const getSolicitation = () => {
        axios
          .get(`${api}/solicitations`, {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          })
          .then((response) => {
            const solicitations = response.data.solicitations;
            setSolicitations(solicitations);
          })
    
          .catch((error) => console.log(error));
      };

      
    const config = {
          dependencies: {
            'linear-gradient': LinearGradient
          }
        };

 return (
    <NativeBaseProvider config={config}>
   <ScrollView h="100%" horizontal={false} w="100%">
    <Box flex={1} minHeight="900" w="100%" 
    alignItems="center"
    justifyContent="center"
    bg={{
        linearGradient: {
          colors: ['lightBlue.600', 'lightBlue.400'],
          start: [0, 0],
          end: [1, 0]
        }
      }}
    >
       <Box position="absolute" top="5%">
       <UserAvatar size={"2xl"} source={logged.avatar} />
       </Box>
    <Container
              w="95%"
              h="350"
              py="4"
              mb="20"
              space={4}
              shadow={4}
              bg="rgba(200, 255, 254, 0.15)"
              rounded="md"
            >
              <Box
                pl="5"
                h="30"
                flexDir="row"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={<Octicons name="checklist" size={32} color="white" />}
                  size="xl"
                  color="white"
                />
                <Heading ml="3" color="light.100">
                  Meus benefícios
                </Heading>
              </Box>

              <Divider alignSelf="center" w="90%" />

              <FlatList
                data={userSolicitations}
                horizontal={false}
                keyExtractor={(item) => item.id}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "40%",
                  borderRadius: 40,
                }}
                my="3"
                renderItem={({ item }) => {
                  return (
                    <Center my="3" w="100%">
                      <HStack w="100%" justifyContent="center" h="130px">
                        <VStack
                          bg="lightBlue.500"
                          rounded="xl"
                          py="5%"
                          px="2"
                          w="85%"
                        >
                          <Text color={"light.100"}>
                            Serviço: {item.service}
                          </Text>
                          <Text color={"light.100"}>STATUS: {item.status}</Text>
                          <Text color={"light.100"}>Data: {item.date}</Text>
                          <TouchableOpacity
                            style={{
                              position: "absolute",
                              right: 1,
                              top: 5,
                              width: 40,
                              height: 40,
                              opacity: 0.8,
                            }}
                            onPress={() => deleteAprovado(item.id)}
                          >
                            <FontAwesome
                              name="remove"
                              size={36}
                              color="white"
                            />
                          </TouchableOpacity>
                        </VStack>
                      </HStack>
                    </Center>
                  );
                }}
              />
            </Container>
            <Box position="absolute" bottom="15%">
            <BackButton />
            </Box>
    </Box>
   </ScrollView>
   </NativeBaseProvider>
  );
}