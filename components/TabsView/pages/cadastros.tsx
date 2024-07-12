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
  let popular = users?.filter((item) => {
    if (item?.bairro === String("POPULAR")) {
      return item;
    }
  });
  let marcosMoura = users?.filter((item) => {
    if (item?.bairro === "MARCOS MOURA") {
      return item;
    }
  });
  let varzeaNova = users?.filter((item) => {
    if (item?.bairro === "VÁRZEA NOVA") {
      return item;
    }
  });
  let santaCruz = users?.filter((item) => {
    if (item?.bairro === "SANTA CRUZ") {
      return item;
    }
  });
  let centro = users?.filter((item) => {
    if (item?.bairro === "CENTRO") {
      return item;
    }
  });
  let acude = users?.filter((item) => {
    if (item?.bairro === "AÇUDE") {
      return item;
    }
  });
  let heitel = users?.filter((item) => {
    if (item?.bairro === "HEITEL") {
      return item;
    }
  });
  let odilandia = users?.filter((item) => {
    if (item?.bairro === "ODILÂNDIA") {
      return item;
    }
  });
  let cicerolandia = users?.filter((item) => {
    if (item?.bairro === "CICEROLÂNDIA") {
      return item;
    }
  });
  let lerolandia = users?.filter((item) => {
    if (item?.bairro === "LEROLÂNDIA") {
      return item;
    }
  });
  let bebelandia = users?.filter((item) => {
    if (item?.bairro === "BEBELÂNDIA") {
      return item;
    }
  });
  let forteVelho = users?.filter((item) => {
    if (item?.bairro === "FORTE VELHO") {
      return item;
    }
  });
  let vidalDeNegreiros = users?.filter((item) => {
    if (item?.bairro === "VIDAL DE NEGREIROS") {
      return item;
    }
  });
  let ribeira = users?.filter((item) => {
    if (item?.bairro === "RIBEIRA") {
      return item;
    }
  });
  let miriri = users?.filter((item) => {
    if (item?.bairro === "MIRIRI") {
      return item;
    }
  });
  let livramento = users?.filter((item) => {
    if (item?.bairro === "LIVRAMENTO") {
      return item;
    }
  });
  let usinaSaoJoao = users?.filter((item) => {
    if (item?.bairro === "USINA SÃO JOÃO") {
      return item;
    }
  });

  let tibiriCount = tibiri?.length;
  let popularCount = popular?.length;
  let marcosMouraCount = marcosMoura?.length;
  let varzeaNovaCount = varzeaNova?.length;
  let santaCruzCount = santaCruz?.length;
  let centroCount = centro?.length;
  let acudeCount = acude?.length;
  let heitelCount = heitel?.length;
  let odilandiaCount = odilandia?.length;
  let cicerolandiaCount = cicerolandia?.length;
  let lerolandiaCount = lerolandia?.length;
  let bebelandiaCount = bebelandia?.length;
  let forteVelhoCount = forteVelho?.length;
  let vidalDeNegreiroCount = vidalDeNegreiros?.length;
  let ribeiraCount = ribeira?.length;
  let miririCount = miriri?.length;
  let livramentoCount = livramento?.length;
  let usinaSaoJoaoCount = usinaSaoJoao?.length;


  return (
    <ScrollView
    className='flex-1 w-full mb-5'
    horizontal={false}>
       <PieChartWithDynamicSlices />
      <TextMedium className="text-blue-500" text="Famílias por bairro" />
    
      <View className='flex-row w-full mb-4 items-center justify-center flex-wrap'
      >
        <BairroCounter city="Tibiri" value={tibiriCount ? tibiriCount : "0"} />
        <BairroCounter city="Varzea Nova" value={varzeaNovaCount ? varzeaNovaCount : "0"} />
        <BairroCounter city="Popular" value={popularCount ? popularCount : "0"} />
        <BairroCounter city="Marcos Moura" value={marcosMouraCount ? marcosMouraCount : "0"} />
        <BairroCounter city="Heitel" value={heitelCount ? heitelCount : "0"} />
        <BairroCounter city="Açude" value={acudeCount ? acudeCount : "0"} />
        <BairroCounter city="Centro" value={centroCount ? centroCount : "0"} />
        <BairroCounter city="Odilândia" value={odilandiaCount ? odilandiaCount : "0"} />
        <BairroCounter city="Cicerolândia" value={cicerolandiaCount ? cicerolandiaCount : "0"} />
        <BairroCounter city="Lerolândia" value={lerolandiaCount ? lerolandiaCount : "0"} />
        <BairroCounter city="Bebelândia" value={bebelandiaCount ? bebelandiaCount : "0"} />
        <BairroCounter city="Forte Velho" value={forteVelhoCount ? forteVelhoCount : "0"} />
        <BairroCounter city="Ribeira" value={ribeiraCount ? ribeiraCount : "0"} />
        <BairroCounter city="Miriri" value={miririCount ? miririCount : "0"} />
        <BairroCounter city="Livramento" value={livramentoCount ? livramentoCount : "0"} />
        <BairroCounter city="Santa Cruz" value={santaCruzCount ? santaCruzCount : "0"} />
        <BairroCounter city="Vidal de Negreiros" value={vidalDeNegreiroCount ? vidalDeNegreiroCount : "0"} />
        <BairroCounter city="Usina S.J" value={usinaSaoJoaoCount ? usinaSaoJoaoCount : "0"} />
      </View>
    </ScrollView>
  );
}
