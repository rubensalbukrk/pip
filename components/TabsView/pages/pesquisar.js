import React, {useState, useEffect, useContext} from 'react';
import {
  Icon,
  HStack,
  VStack,
  Box,
  Avatar,
  Text,
  Center,
  Input,
  Heading,
  Divider,
  Container,
  useNativeBase,
} from "native-base";
import { View, FlatList,  TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../src/contexts/UserContext';



export default function TabSearch() {
  const { users } = useContext(UserContext)
  const [search, setSearch] = useState(''); 
  const [filteredData, setFilteredData] = useState([]); 
  const [masterData, setMasterData] = useState([]);
  const navigation = useNavigation()


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredData(users);
        setMasterData(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter(
        function (item) {
          if (item.nome) {
            const itemData = item.nome.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
      });
      setFilteredData(newData);
    } else {
      setFilteredData(masterData);
    }
    setSearch(text);
  };
  
  return (

    <Center flex={1} w="100%" px="5">
     <VStack w="100%" space={5} alignSelf="center">
        <Heading color="lightBlue.500" fontSize="lg">Procurar por nome</Heading>
        <Input
        onChangeText={(text) => searchFilter(text)}
        value={search}
          placeholder="Search"
          variant="filled"
          width="100%"
          h="50px"
          borderRadius="10"
          py="1"
          mt="2%"
          mb="4%"
          px="2"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
        />

      </VStack>
          <Divider my="2%" />
      <FlatList
        data={filteredData}
        horizontal={false}
        keyExtractor={item => item.id}
        style={{
          flex: 1,
          width: "100%",
          height: 300,
          borderRadius: 20,
          backgroundColor: '#',
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                height: 80,
                borderRadius: 20,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "#1cacff",
              }}
            >
              <HStack space={4} alignItems="center">
                <Avatar ml="4%" source={{ uri: item.avatar }} />
                <VStack flex="1">
                  <Text color="white">{item.nome}</Text>
                  <Box
                    rounded="lg"
                    flex="1"
                    mr="18%"
                    bg="#38b6ff"
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ flex: 1 }}
                      color="light.200"
                    >
                      {item.question2}
                    </Text>
                  </Box>
                </VStack>

                <TouchableOpacity
                  style={{ position: "absolute", opacity: 0.8, bottom: "50%", right: 10 }}
                  onPress={() => navigation.navigate('EditUser', { avatar: item.avatar, status: item.status, isVolt: item?.isVolt, nome: item.nome, cpf: item.cpf, email: item.email})}
                >
                  <FontAwesome5 name="user-edit" size={24} color="white" />
                </TouchableOpacity>
              </HStack>
            </View>
          );
        }}
      />
    </Center>
  );
}
