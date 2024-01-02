import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../api/api";
import BackgroundTop from "../../../../assets/svgs/User-top-waves.svg";
import BackgroundBottom from ".../../../assets/svgs/User-bottom-wave.svg";
import { width } from "../../../utils/dimensions";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  TextLarge,
  TextMedium,
  TextSmall,
} from "../../../../components/TextLg/Text";
import { WarningSucess } from "../../../../components/Warnings/isSucess";
import { WarningError } from "../../../../components/Warnings/isError";
import data from "../../../utils/dateNow";
import { Formulary } from "./Form";

interface ServicesProps {
  title: string;
  picture: any;
  descrition: any;
  requisite: any;
  pasta: string;
}

export default function ViewService({ route }) {
  const [isOk, setIsOk] = useState(false);
  const [isError, setIsError] = useState(false);
  const { token } = useContext(AuthContext);
  const { logged } = useContext<any>(UserContext);
  const [viewPdf, setViewPdf] = useState(false);
  const { title, picture, descrition, requisite, pasta }: ServicesProps =
    route?.params;

  function handleSolicitation(service: string) {
    if (service === "Solicitar o PASSE LIVRE PCD") {
      setViewPdf(true);
    }
    const myInfo = {
      nome: logged.nome,
      idade: logged.idade,
      phone: logged.phone,
      address: logged.address,
      bairro: logged.bairro,
      cpf: logged.cpf,
      password: "undefined",
    };
    let newSolicitation = {
      nome: logged.nome,
      cpf: logged.cpf,
      service: service,
      status: "Aguardando analise...",
      pasta: `${pasta}`,
      date: `${data}`,
      userInfo: myInfo,
    };
    axios
      .post(`${api.BASE_URL}/solicitations`, newSolicitation, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => setIsOk(true))
      .catch(() => setIsError(true));
  }
  const renderButtons = () => {
    return requisite.map((label, index) => {
      return (
        <TouchableOpacity
          key={index}
          className="w-80 h-10 shadow-lg shadow-black my-2 rounded-lg justify-center px-3 bg-blue-400"
          onPress={() => handleSolicitation(label)}
        >
          <TextSmall text={label} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="flex-1 w-full h-full items-center bg-white">
      {isOk && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full absolute self-center bg-white"
        >
          <WarningSucess
            title="Agora você pode acompanhar o andamento na aba 'Solicitações'"
            onPress={setIsOk(false)}
          />
        </View>
      )}
      {isError && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full absolute self-center bg-white"
        >
          <WarningError />
        </View>
      )}
      {viewPdf && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full absolute self-center bg-white"
        >
          <Formulary />
        </View>
      )}
      

      <BackgroundTop
        style={{ zIndex: 0, position: "absolute", top: -10 }}
        width={width}
      />
      <View className="flex-row absolute w-full pl-3 top-0 justify-between">
        <TextMedium className="text-3xl" text={title} />
        <BackButton />
      </View>
      <Image
        style={{ zIndex: 1, alignSelf: "center", marginVertical: "10%" }}
        className=" w-40 h-40 mt-12 rounded-full"
        resizeMode="cover"
        alt="pip-service"
        source={picture}
      />
      <View style={{ zIndex: 2 }} className="w-full h-full px-3 bg-transparent">
        <ScrollView
          style={{
            flex: 3,
            maxHeight: 450,
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <TextLarge text={descrition} className="text-black text-base" />

          <TextLarge
            text="Serviços disponíveis"
            className="self-start text-2xl mt-6 text-black"
          />

          <View className="w-full h-80 items-center">{renderButtons()}</View>
        </ScrollView>
      </View>
      <BackgroundBottom
        style={{ zIndex: 0, position: "absolute", bottom: 0 }}
        width={width}
      />
    </View>
  );
}
