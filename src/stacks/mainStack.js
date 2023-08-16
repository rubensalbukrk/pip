import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { Cadastro } from "./Cadastro";
import { Welcome } from "./Welcome";
import { HomeApp } from "../pages/HomeApp";

const Stack = createNativeStackNavigator();

export default function MainStack(){
    return (
        <Stack.Navigator initialRouteName="Welcome"
		screenOptions={{
		headerShown: false
		}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastrar" component={Cadastro} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="HomeApp" component={HomeApp} />
        </Stack.Navigator>
    )
};