import React, { useContext } from "react";
import { View, Text, FlatList, ScrollView, } from "react-native";

import { UserContext } from "../../../src/contexts/UserContext";

import PieChartWithDynamicSlices from "../../Graphics/DinamicGraphic";

export default function TabCadastros() {
  const { users } = useContext(UserContext);
  let tibiri = users?.filter((item) => {
    if (item.bairro === String("Tibiri")) {
      return item;
    }
  });
  let santaRita = users?.filter((item) => {
    if (item.bairro === String("Santa Rita")) {
      return item;
    }
  });
  let marcosMoura = users?.filter((item) => {
    if (item.bairro === "Marcos Moura") {
      return item;
    }
  });
  let varzeaNova = users?.filter((item) => {
    if (item.bairro === "Varzea Nova") {
      return item;
    }
  });
  let cruzEspiritoSanto = users?.filter((item) => {
    if (item.bairro === "Cruz do Espirito Santo") {
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
      <View className="self-center w-full items-center justify-center"
      >
       <PieChartWithDynamicSlices />
      
      </View>

      <Text className="font-default text-2xl ml-4 text-white">
        Familias por bairro
      </Text>
    
      <View className='flex-row w-full mb-4 items-center justify-center flex-wrap'
      >
        <View className="w-140 h-140 mx-4 my-2 rounded-lg justify-center items-center bg-white/20"
        >
          <Text className="font-default text-6xl text-white">
            {" "}
            {tibiriCount ? tibiriCount : "0"}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            Tibiri
          </Text>
        </View>

        <View className="w-140 h-140 mx-4 my-2 rounded-lg justify-center items-center bg-white/20"
        >
          <Text className="font-default text-6xl text-white">
            {" "}
            {varzeaNovaCount ? varzeaNovaCount : "0"}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            Varzea Nova
          </Text>
        </View>

        <View className="w-140 h-140 mx-4 my-2 rounded-lg justify-center items-center bg-white/20"
        >
          <Text className="font-default text-6xl text-white">
            {" "}
            {santaRitaCount ? santaRitaCount : "0"}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            Santa Rita
          </Text>
        </View>

        <View className="w-140 h-140 mx-4 my-2 rounded-lg justify-center items-center bg-white/20"
        >
          <Text className="font-default text-6xl text-white">
            {" "}
            {marcosMouraCount ? marcosMouraCount : "0"}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            marcos Moura
          </Text>
        </View>

        <View className="w-140 h-140 mx-4 my-2 rounded-lg justify-center items-center bg-white/20"
        >
          <Text className="font-default text-6xl text-white">
            {" "}
            {cruzEspiritoSantoCount ? cruzEspiritoSantoCount : "0"}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            Cruz Espirito S.
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}
