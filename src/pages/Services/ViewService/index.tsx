import React, { useContext, useState, useEffect } from "react";
import { View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";

import BackgroundTop from "../../../../assets/svgs/User-top-waves.svg";
import BackgroundBottom from ".../../../assets/svgs/User-bottom-wave.svg";
import { width } from "../../../utils/dimensions";
import {
  TextLarge,
  TextMedium,
  TextSmall,
} from "../../../../components/TextLg/Text";
import { Feather, Entypo } from "@expo/vector-icons";
import { WarningSucess } from "../../../../components/Warnings/isSucess";
import { WarningError } from "../../../../components/Warnings/isError";
import data from "../../../utils/dateNow";
import { Formulary } from "./Form";
import { Button } from "../../../../components/ButtonBlue/ButtonBlue";
import firestore from "@react-native-firebase/firestore";
import * as Progress from "react-native-progress";
import * as DocumentPicker from 'expo-document-picker';
import storage from "@react-native-firebase/storage";
import colors from "tailwindcss/colors";
import { TextInputMask } from "react-native-masked-text";

interface ServicesProps {
  title: string;
  picture: any;
  descrition: any;
  requisite: any;
  pasta: string;
}
const docs = [];

export default function ViewService({ route }) {
  const [isOk, setIsOk] = useState(false);
  const [isError, setIsError] = useState(false);
  const { logged } = useContext<any>(UserContext);
  const [viewPdf, setViewPdf] = useState(false);
  const [asAnexo, setAsAnexo] = useState(false);
  const [showWhats, setShowWhats] = useState<boolean>(false);
  const [NumeroWhats, setNumeroWhats] = useState(String);
  const myInfo = {
    nome: logged.nome,
    idade: logged.idade,
    phone: logged.phone,
    address: logged.address,
    bairro: logged.bairro,
    cpf: logged.cpf,
  };

  const { title, picture, descrition, requisite, pasta }: ServicesProps = route?.params;
  const [solicitation, setSolicitation] = useState({
    nome: logged.nome,
    cpf: logged.cpf,
    service: undefined,
    status: "Aguardando analise...",
    pasta: `${pasta}`,
    docs: docs,
    phone: NumeroWhats || logged.phone,
    date: `${data}`,
    userInfo: myInfo,
  });
  const Anexo = ({ ...props }) => {
    const [isUpload, setUpload] = useState(false);
    const [progress, setProgress] = useState(0.4);
    const [pickedDocument, setPickedDocument] = useState(null);
    
    const uploadFile = (filename: string, uri: string) => {
      try {
        const task = storage().ref(filename).putFile(uri);
        task.on("state_changed", (event) => {
          let progressFile = Math.round(
            (event.bytesTransferred / event.totalBytes) * 100
          );
          setProgress(progressFile);
        });
        task.then((e) => {
          docs.push(
            `https://firebasestorage.googleapis.com/v0/b/mychat-900b3.appspot.com/o/${e.metadata.fullPath}?alt=media`
          );
          setUpload(false);
        });
      } catch (error) {
        alert("Houve um problema com o servidor, tente novamente mas tarde!");
      }
    };

    const pickDocument = async () => {
      
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf'
        });

        let filename = result.assets[0].name;
        let uri = result.assets[0].uri.replace("file://", "");
        alert(`Filename: ${filename} URI: ${uri}`);

        uploadFile(filename, uri);
      } catch (err) {
       
          console.log(err);
      };
    }

    return (
      <View className="flex-row w-full h-14 my-2 px-2 items-center justify-between bg-blue-200 rounded-md">
        <Button
          title="+"
          onPress={() => pickDocument()}
          className="w-12 h-12"
        ></Button>
        <TextSmall text={props.url} className="text-slate-500 text-base" />
        {isUpload ? (
          <Progress.Pie
            progress={progress}
            unfilledColor="#e5f3ff"
            color={"#62a0f2"}
            size={40}
            style={{
              zIndex: 2,
              alignSelf: "center",
            }}
          />
        ) : (
          progress == 100 && (
            <Feather name="check-circle" color={colors.blue[700]} size={28} />
          )
        )}
      </View>
    );
  };

  
  function handleSolicitation(service: string) {
    
    setShowWhats(true);
    setSolicitation({ ...solicitation, service: service });

  }

  function VerificarServiço() {

    if (solicitation.service === "Solicitar o PASSE LIVRE PCD") {
      setViewPdf(true);
    } else if (solicitation.service === "Solicitar Citológico") {
      setAsAnexo(true);
    } else if (solicitation.service === "Solicitar Mamografia") {
      setAsAnexo(true);
    }else{
      console.log({solicitation})
      sendSolicitation();
    }
    

  }

  const FormAnexo = () => {
    return (
      <View
        style={{ zIndex: 10, height: "100%" }}
        className="absolute w-full items-center justify-center bg-black/60"
      >
        <View
          style={{ height: "80%" }}
          className="w-80 px-2 items-center justify-center rounded-md bg-blue-50"
        >
          <TextLarge
            className="text-black"
            text="Selecione corretamente o seu documento em formato PDF."
          />
          <TextLarge
            className="text-red-500 text-sm"
            text="Atenção: apenas arquivos no formato PDF são válidos!"
          />
          <Anexo url="RG" />
          <Anexo url="CPF" />
          <Anexo url="CARTÃO SUS" />
          <Anexo url="Comprovante Residência" />

          <Button
            className="mt-2"
            title="ENVIAR SOLICITAÇÃO"
            onPress={() => 
              {setSolicitation({ ...solicitation, docs: docs }),
              setShowWhats(true);}
            }
          />
        </View>
      </View>
    );
  };

  const FormWhats = () => {
    return (
      <View
        style={{ zIndex: 20, height: "100%" }}
        className="absolute w-full items-center justify-center bg-black/60"
      >
        <View className="w-92 h-200 self-center p-4 bg-white rounded-md">
          <TextLarge className="text-2xl align-left text-red-500" text="Informe seu WhatsApp," />
          <TextLarge className="text-slate-950" text="Vamos entrar em contato com você!" />
         <TextInputMask
         type="cel-phone"
         value={NumeroWhats}
         onChangeText={(text)=> setNumeroWhats(text)}
         className="w-80 h-12 m-3 bg-slate-300 rounded-lg" 

         />
          <Button
          className="self-center"
            title="CONCLUIR SOLICITAÇÃO"
            onPress={() => {
              setSolicitation({ ...solicitation, phone: NumeroWhats })
              VerificarServiço()
              setShowWhats(false);
            }}
          />

        </View>
      </View>
    );
  };


  const sendSolicitation = () => {
    const task = firestore()
      .collection("Solicitations")
      .add(solicitation)
      .then(() => {
        setIsOk(true);
      })
      .catch(() => {
        setIsError(true);
      });
  };
  const renderButtons = () => {
    return requisite.map((label, index) => {
      return (
        <TouchableOpacity
          key={index}
          className="w-80 h-10 shadow-lg shadow-black my-2 rounded-lg justify-center px-3 bg-blue-400"
          onPress={() => {
            setSolicitation({ ...solicitation, service: label });
            handleSolicitation(label);
          }}
        >
          <TextSmall text={label} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="w-full h-full items-center bg-white">
      {isOk && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full absolute self-center bg-white"
        >
          <WarningSucess
            title="Agora você pode acompanhar o andamento na aba 'Solicitações'"
            onPress={() => setIsOk(false)}
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
      {asAnexo && <FormAnexo />}

      {showWhats && <FormWhats />}



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
      <View style={{ zIndex: 5 }} className="w-full h-full px-3 bg-transparent">
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
