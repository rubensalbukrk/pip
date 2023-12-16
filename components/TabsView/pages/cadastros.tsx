import React, { useContext } from "react";
import { View, ScrollView, } from "react-native";
import { UserContext } from "../../../src/contexts/UserContext";
import PieChartWithDynamicSlices from "../../Graphics/DinamicGraphic";
import { TextMedium } from "../../TextLg/Text";
import { BairroCounter } from "../../BairroCounter/bairroCounter";


export default function TabCadastros() {
  const { users } = useContext<any>(UserContext);

  let tibiri = users?.filter((item) => {
    if (item?.bairro === String("Tibiri")) {
      return item;
    }
  });
  let santaRita = users?.filter((item) => {
    if (item?.bairro === String("Santa Rita")) {
      return item;
    }
  });
  let marcosMoura = users?.filter((item) => {
    if (item?.bairro === "Marcos Moura") {
      return item;
    }
  });
  let varzeaNova = users?.filter((item) => {
    if (item?.bairro === "Varzea Nova") {
      return item;
    }
  });
  let cruzEspiritoSanto = users?.filter((item) => {
    if (item?.bairro === "Cruz do Espirito Santo") {
      return item;
    }
  });

  let tibiriCount = tibiri?.length;
  let santaRitaCount = santaRita?.length;
  let marcosMouraCount = marcosMoura?.length;
  let varzeaNovaCount = varzeaNova?.length;
  let cruzEspiritoSantoCount = cruzEspiritoSanto?.length;

  return (
    <ScrollView
    className='flex-1 w-full mb-5'
    horizontal={false}>
       <PieChartWithDynamicSlices />
      <TextMedium text="Famílias por bairro" />
    
      <View className='flex-row w-full mb-4 items-center justify-center flex-wrap'
      >
        <BairroCounter city="Tibiri" value={tibiriCount ? tibiriCount : "0"} />
        <BairroCounter city="Varzea Nova" value={varzeaNovaCount ? varzeaNovaCount : "0"} />
        <BairroCounter city="Santa Rita" value={santaRitaCount ? santaRitaCount : "0"} />
        <BairroCounter city="Marcos Moura" value={marcosMouraCount ? marcosMouraCount : "0"} />
        <BairroCounter city="Cruz ES." value={cruzEspiritoSantoCount ? cruzEspiritoSantoCount : "0"} />
    
      </View>
    </ScrollView>
  );
}
