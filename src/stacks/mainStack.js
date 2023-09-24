import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { Cadastro } from "./Cadastro";
import { Welcome } from "./Welcome";
import { HomeApp } from "../pages/HomeApp";
import { User } from "../pages/User";

import Admin from "../pages/Admin";
import EditUser from "../pages/Admin/editUser";
import NewNotice from "../../components/TabsView/pages/notices";
import Solicitation from "../../components/TabsView/pages/solicitations";
import Services from "../pages/Services";
import ViewService from "../pages/Services/ViewService";
import SolicitationInfoUser from "../../components/TabsView/pages/solicitations/userSolicitation";
import PageCoordenador from "../pages/Coordenador"

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastrar" component={Cadastro} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="HomeApp" component={HomeApp} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      >
        <Stack.Screen name="PageCoordenador" component={PageCoordenador} />
        <Stack.Screen name="ViewService" component={ViewService} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="NewNotices" component={NewNotice} />
        <Stack.Screen name="Solicitation" component={Solicitation} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="User" component={User} />
      </Stack.Group>

      <Stack.Group
      screenOptions={{
        presentation: 'modal'
      }}
      >
        <Stack.Screen name="SolicitationInfoUser" component={SolicitationInfoUser} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
