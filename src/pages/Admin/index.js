import React, { useContext } from "react";
import * as Animatable from "react-native-animatable";
import { FlatList, View, ScrollView } from "react-native";
import { Box, Button, Pressable, Center, Text, Container, Avatar, VStack} from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { newUser, deleteUser, updateUser } from "../../requisitions/api";
import { useNavigation } from "@react-navigation/native";
import { TabViewAdmin } from "../../../components/TabsView";


 const logged = {
  id: 1,
  isAdmin: true,
  status: true,
  date: '3/8/2023 23:30:08',
  genero: "Masculino",
  nome: 'Rubens Developer',
  idade: 27,
  avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/363793891_247920134771958_5616203686962323957_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=IKaaGNRj1mkAX-44Eds&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfDvuRg6DxA_qL-ZwayTw-_uTmLXGufzBStY4dahzcCRGg&oe=64E69A51&_nc_sid=ee9879",
  address: 'rua dos curioso',
  phone: "83 986731696",
  cpf: "111.222.333-44",
  nis: "01020304051",
  email: "rubiinho@live.it",
  password: "654321",
  parentsName: [
    {
      id: 1,
      name: "filho 1",
      idade: 4
    },
    {
      id: 2,
      name: "filho 2",
      idade: 2
    }
  ],
  question1: true,
  question2: "É um projeto prospero e muito escálavel!"
};

export default function Admin() {
  const { users } = useContext(UserContext);
  const navigation = useNavigation()

  return (
    <ScrollView horizontal={false} h="100%" >
    <Box flex={1} flexDir="column" justifyContent="center">
      <Animatable.View
        animation="slideInDown"
        duration={1000}
        delay={200}
      >
        <Box w="100%" h="120" bg="#53a1fb" alignItems="center" justifyContent="center" shadow={3} roundedBottom="20">
          <Text fontSize="2xl"marginTop="10" color="white">PAINEL DE ADMINISTRAÇÃO</Text>
          <Avatar size="lg" mt="3" shadow={6} source={{ uri: logged.avatar }} />
        </Box>
      </Animatable.View>
      
      <Box w="100%" h="600" maxH="800" >
        <TabViewAdmin />
      </Box>
    
    </Box>
    </ScrollView>

    
  );
}
