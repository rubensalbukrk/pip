import React, { useContext} from "react";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import {
  Box,
  Circle,
  ScrollView,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Center,
  Divider,
  Button,
} from "native-base";
import { MaterialIcons, Feather, AntDesign,FontAwesome } from "@expo/vector-icons";
import BackButton from "../../../BackButton";
import { UserContext } from "../../../../src/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
export default function Solicitation() {
const {notices} = useContext(UserContext)
const navigation = useNavigation();
 return (
    <Box flex={1} w="100%" bg="darkBlue.400" py="10" px="5">
         <Box flexDir="row" top="2%">
          <FontAwesome name="exception1" size={40} color="white" />
          <Heading mx="3" color="light.100">Solicitações</Heading>
        </Box>
        
        <Divider my="4" />
      <VStack
        mt="4%"
        py="2"
        w="100%"
        alignSelf="center"
        shadow={2}
        bg="darkBlue.300"
        rounded="lg"
        alignItems="center"
        justifyContent="center"
      >
    
        <Heading color={"light.100"}>Atuais</Heading>
        <Divider ml="12%" my="2" w="70%" />
 
        <FlatList
          data={notices}
          horizontal={false}
          keyExtractor={(item) => item.id}
          style={{
            flex: 1,
            width: "100%",
            height: 300,
            marginBottom: "3%",
            borderRadius: 20,
          }}
          renderItem={({ item, index }) => {
            return (
              <Center my="3%" w="100%" h="100px">
                <HStack>
                  <VStack
                    bg="lightBlue.400"
                    rounded="xl"
                    py="5%"
                    px="3%"
                    w="88%"
                    h="100%"
                  >
                    <Text>Titulo: {item.title} </Text>
                    <Text>Descrição: {item.mensagem} </Text>
                    <Text>Data: {item.date} </Text>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        right: 1,
                        top: 1,
                        width: 40,
                        height: 40,
                        opacity: 0.8,
                      }}
                      onPress={() => deleteNotice(item.id)}
                    >
                      <MaterialIcons
                        name="delete-forever"
                        size={40}
                        color="white"
                      />
                    </TouchableOpacity>
                  </VStack>
                </HStack>
              </Center>
            );
          }}
        />
        <Button colorScheme={"darkBlue"}>Adicionar</Button>
      </VStack>
      <TouchableOpacity 
          style={{width: 70, height: 70, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: '10%'}}
          onPress={() => navigation.goBack() }
          >
          <Feather name="arrow-left-circle" size={40} color="white" />
          </TouchableOpacity>
    </Box>
  );
}