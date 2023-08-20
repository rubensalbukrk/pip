import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import { Box, Button, Text } from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { newUser, deleteUser, updateUser } from "../../requisitions/api";

export default function Admin() {
  const { users } = useContext(UserContext);

  return (
    <Box
      style={{
        flex: 1,
        width: "100%",
        height: "30%",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
      }}
    >
      <Text>PAINEL DE ADMINISTRAÇÃO</Text>

      <Text>Familias Cadastradas: {users.length}</Text>

      <FlatList
        data={users}
        horizontal={false}
        style={{
          flex: 1,
          width: "100%",
          height: "80%",
          borderRadius: 30,
          backgroundColor: "#d9d9d9",
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                height: 90,
                borderRadius: 20,
                marginTop: 10,
              }}
            >
              <Text>Name: {item.nome}</Text>
              <Text>CPF: {item.cpf}</Text>
              <Text>Idade: {item.idade}</Text>
              <Text>Email: {item.email}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Button onPress={() => newUser()}>ADICIONAR</Button>
      <Button onPress={() => deleteUser(2)}>REMOVER</Button>
      <Button onPress={() => updateUser(1)}>ALTERAR</Button>
    </Box>
  );
}
