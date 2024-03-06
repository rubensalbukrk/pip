import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import WebView from "react-native-webview";

import { Button } from "../../../../../components/ButtonBlue/ButtonBlue";
import { TextLarge, TextMedium } from "../../../../../components/TextLg/Text";
import { LottieView } from "../../../../utils/LottieView";
import { WarningSucess } from "../../../../../components/Warnings/isSucess";
import { useNavigation } from "@react-navigation/native";

export const Formulary = () => {
  const [isEnviado, setEnviado] = useState(false)
  const {goBack} = useNavigation()

  return (
    <ScrollView className="flex-1 w-full">
        {isEnviado && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full bg-white"
        >
          <WarningSucess
            title="Agora você pode acompanhar o andamento na aba 'Solicitações'"
            className=""
            onPress={goBack}
          />
        </View>
      )}
        <LottieView
        loop
        autoPlay={true}
        style={{width: 120, height: 120, alignSelf: 'center', marginTop: 10}}
        source={require('../../../../../assets/animations/Animation - ATENTION.json')}
         />
         
      <TextMedium className="text-black self-center text-center my-5" text="Instruções para solicitar PASSE LIVRE PCD" />
      <TextLarge className="text-black text-base"
        text={`Compareça na sede do PIP
( Rua Boa Vista, 73 - Bairro da Liberdade - Santa Rita ) com ele e os seguintes documentos:

* Xerox do RG do autista;
* Xerox do cartão do SUS;
* Xerox do comprovante de residência;
* Exame do tipo sanguíneo do autista;
* Xerox do RG do responsável legal;
* Xerox do Laudo médico descrevendo que a pessoa é TEA;
* 01 foto 3x4;
* Email;
* Contato.`}
      />
      <TextLarge className="text-red-600 mt-2 text-lg" text="OBSERVAÇÃO:" />
      <TextLarge className="text-red-600 underline mb-2 text-lg" text="Preencha o formulário abaixo, e leve até a sede do PIP!" />
      <WebView
        style={{ width: "100%", minHeight: 400 }}
        source={{
          uri: "https://drive.google.com/file/d/1CVDYsUVxGHcPmfzisaxwdw5JJq09bFCO/view?usp=sharing",
        }}
      />
      <Button title="SOLICITAR AGORA" onPress={() => setEnviado(true)} className="my-2 self-center" />
    </ScrollView>
  );
};
