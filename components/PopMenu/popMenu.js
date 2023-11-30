import { View, Text, TouchableOpacity } from "react-native";
import { width, height } from "../../src/utils/dimensions";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import TopBackgroundPopMenu from "../../assets/svgs/PopMenu-wave-top.svg";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../../src/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PopMenu = () => {
  const { logged, setLogged } = useContext(UserContext);
  const { navigate,goBack } = useNavigation();
  return (
    <View className="flex-1 w-full h-full bg-black/40">
      <View
        style={{ width: width, height: height / 3, backgroundColor: "#dadada" }}
        className="absolute bottom-0 px-3 rounded-t-xl"
      >
        <TopBackgroundPopMenu
          height={90}
          style={{
            position: "absolute",
            top: 10,
          }}
        />
        <TouchableOpacity className='w-9 h-9 absolute top-3 right-3 items-center justify-center'
        onPress={() => goBack() }
        >
        <AntDesign name="closecircle" size={32} color="black" />
        </TouchableOpacity>
        <Text className="font-default my-7 mx-2 text-gray-600 text-3xl">
          Menu
        </Text>

        {logged?.isCoordAutist == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
              Coordenação dos Autistas
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordMulher == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
              Coordenação das Mulheres
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordSaude == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
              Coordenação da Saúde
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordAlimentar== true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
              Coordenação da Alimentação
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordCidadania == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
              Coordenação da Cidadania
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordProtagonista == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
              Coordenação dos Protagonistas
            </Text>
          </TouchableOpacity>
        )}
        {logged?.isCoordPasse == true && (
          <TouchableOpacity
            className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10"
            onPress={() => navigate("PageCoordenador")}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color="black"
            />
            <Text className="font-default text-gray-600 text-xl">
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
            <Text className="font-default text-gray-600 text-xl">
              Painel da Administração
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className="flex-row w-full h-14 gap-2 items-center border-b-2 border-black/10">
          <FontAwesome5 name="user-edit" size={24} color="black" />
          <Text className="font-default text-gray-600 text-xl">
            Alterar dados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row w-full h-14 gap-2 items-center"
        onPress={() => AsyncStorage.clear() && setLogged({}) & navigate("Welcome")}
        >
          <MaterialIcons name="exit-to-app" size={32} color="black" />
          <Text className="font-default text-gray-600 text-xl">
            Sair
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
