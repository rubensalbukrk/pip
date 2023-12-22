import { View, Text, TouchableOpacity } from "react-native";
import { width, height } from "../../src/utils/dimensions";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import TopBackgroundPopMenu from "../../assets/svgs/PopMenu-wave-top.svg";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../../src/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../src/contexts/AuthContext";

export const PopMenu = () => {
  const {setAuth} = useContext(AuthContext)
  const { logged, setLogged } = useContext(UserContext);
  const { navigate,goBack } = useNavigation();
  return (
    <View className="flex-1 w-full h-full bg-black/40">
      <View
        style={{ width: width, height: height / 3}}
        className="absolute bg-slate-100 bottom-0 px-3 rounded-t-xl"
      >

        <TouchableOpacity className='w-9 h-9 absolute top-3 right-3 items-center justify-center'
        onPress={() => goBack() }
        >
        <AntDesign name="closecircle" size={32} color="black" />
        </TouchableOpacity>
        <Text className="font-default my-7 mx-2 text-gray-800 text-3xl">
          Menu
        </Text>

        {logged?.isCoordAutist == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação dos Autistas' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação dos Autistas
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordMulher == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação das Mulheres' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação das Mulheres
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordSaude == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação da Saúde' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação da Saúde
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordAlimentar== true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação da Alimentação' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação da Alimentação
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordCidadania == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação da Cidadania' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação da Cidadania
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordProtagonista == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação dos Protagonistas' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação dos Protagonistas
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordPasse == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador", {title: 'Coordenação do Passe Livre' })}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Coordenação do Passe livre
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isAdmin == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("Admin")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-800 text-xl">
              Painel da Administração
            </Text>
          </TouchableOpacity>
        )}


        <TouchableOpacity className="flex-row w-full h-14 gap-2 items-center"
        onPress={() => AsyncStorage.clear() & setLogged({}) & setAuth(false) & navigate("Welcome")}
        >
          <MaterialIcons name="exit-to-app" size={32} color="black" />
          <Text className="font-default text-gray-800 text-xl">
            Sair
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
