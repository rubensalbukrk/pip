import React from "react";
import BackButton from "../../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import BackgroundServices from "../../../assets/svgs/Solicitation-waves.svg";
import { height, width } from "../../utils/dimensions";
import { TextExtra, TextLarge } from "../../../components/TextLg/Text";

export default function Services() {
  const navigation = useNavigation();
  const items = [
    {
      id: 1,
      title: "Autistas",
      picture: require("../../../assets/imgs/pip-autistas.png"),
      labelTitulo: "PIP PARA AUTISTAS",
      labelDesc:
        "Além dos encontros com os pais de pessoas com espectro autista para fortalecimento coletivo, essa pasta de atuação tem a missão de potencializar o acesso das pessoas TEA aos serviços básicos como por exemplo: Emissão de RG, Solicitação da Carteira de Identificação da Pessoa com Autismo - CIPTEA que tem funcionalidade de passe livre, orientações psicológicas para os pais e responsáveis, assessoria jurídica e atendimentos com nutricionista.",
      labelRequisite: [
        "Carteira de identificação do Autista - CIPTEA",
        "Assessoria jurídica",
        "Emissão de RG do autista",
        "Atendimento nutricional",
        "Solicitar inscrição arteterapia"
      ],
      pasta: "Autistas",
    },
    {
      id: 2,
      title: "Mulher",
      picture: require("../../../assets/imgs/pip-mulher.png"),
      labelTitulo: "PIP MULHER",
      labelDesc:
        "Visando potencializar os cuidados com as mulheres cadastradas e em parceria com o Sesc Saúde Mulher, ofertamos mensalmente citológicos e mamografias, como também grupos de orientações em saúde coletiva e gestacional.",
      labelRequisite: [
        "Solicitar Citológico",
        "Solicitar Mamografia",
        "Solicitar atendimento de Enfermagem",
      ],
      pasta: "Mulher",
    },
    {
      id: 3,
      title: "CIDADANIA",
      picture: require("../../../assets/imgs/pip-cidadania.png"),
      labelTitulo: "PIP CIDADANIA",
      labelDesc:
        "O acesso à documentação básica é de extrema importância para que a população consiga acessar outros serviços públicos. Dessa forma, essa pasta viabiliza o agendamento de RG, CPF e Carteira De Trabalho Digital.",
      labelRequisite: [
        "Agendar emissão de RG",
        "Agendar emissão CPF",
        "Agendar emissão CTPS"
      ],
      pasta: "Cidadania",
    },
    {
      id: 4,
      title: "Segurança Alimentar",
      picture: require("../../../assets/imgs/pip-sgralimentar.png"),
      labelTitulo: "PIP SEGURANÇA ALIMENTAR",
      labelDesc:
        "O acesso à alimentação é direito de todos e todas. Diante do cenário de vulnerabilidade social que foi potencializado com a pandemia, nós estamos comprometidos em cooperar com a missão mundial de erradicar a pobreza e fome extrema.",
      labelRequisite: [
        "Cadastro Cesta básica",
        "Cadastro do PAA - Leite",
        "Cadastro do PAA - Alimentos"
      ],
      pasta: "Segurança Alimentar",
    },
    {
      id: 5,
      title: "Saúde Mental",
      picture: require("../../../assets/imgs/pip-saudemental.png"),
      labelTitulo: "PIP SAÚDE MENTAL",
      labelDesc:
        "Uma das maiores problemáticas na sociedade são as doenças psicossomáticas e por isso queremos contribuir para que as famílias cadastradas tenham acesso à atendimentos de psicologia para garantir sua saúde mental.",
      labelRequisite: [
        "Solicitar atendimento de psicologia",
        "Solicitar terápia em grupo / pais de TEA",
        "Solicitar Auriculoterapia",
        "Solicitar Ventosaterapia"
      ],
      pasta: "Saúde Mental",
    },
    {
      id: 6,
      title: "Protagonismo",
      picture: require("../../../assets/imgs/pip-protagonista.png"),
      labelTitulo: "PIP PROTAGONISMO JUVENIL",
      labelDesc:
        "Em parceria com o Centro de Integração Empresa Escola - CIEE, encaminhamos jovens de 14 à 23 anos para o cadastro de prioridade por estarem em situação de vulnerabilidade social.",
      labelRequisite: [
        "Solicitar encaminhamento ao CIEE",
        "Solicitar construção de currículo",
        "Solicitar treinamento para entrevista de emprego"
    ],
      pasta: "Protagonistas",
    },
    {
      id: 7,
      title: "PASSE LIVRE",
      picture: require("../../../assets/imgs/pip-passelivre.png"),
      labelTitulo: "PIP PASSE LIVRE ESTADUAL",
      labelDesc:
        "O passe livre estadual é direito garantido pela Lei 18.419/2015 para pessoas com deficiência que assegura a isenção das taxas nos transportes coletivos intermunicipais. O Projeto Inclusão Popular é credenciado na FUNAD para solicitar o PASSE LIVRE PCD.",
      labelRequisite: ["Solicitar o PASSE LIVRE PCD"],
      pasta: "Passe Livre",
    },
    {
      id: 8,
      title: "CURSOS",
      picture: require("../../../assets/imgs/pip-cursos.png"),
      labelTitulo: "PIP CURSOS",
      labelDesc:
        "Promover a oferta de cursos gratuitos em parceria com empresas e setores públicos, a fim de potencializar os núcleos familiares e aumentar a inserção no mercado de trabalho é o nosso alvo com essa pasta de atuação. E aqui abaixo você encontra os cursos disponíveis, sejam eles profissionalizantes, artísticos ou esportivos.",
      labelRequisite: [
        "Inscrição para Jiu-jítsu / crianças de 10 à 15 anos",
        "Inscrição para Jiu-jítsu / crianças autistas 8 à 15 anos",
        "Solicitar inscrição para Marketing Digital"
      ],
      pasta: "Cursos",
    },
    {
      id: 9,
      title: "OPTOMETRIA",
      picture: require("../../../assets/imgs/pip-optometria.png"),
      labelTitulo: "PIP OPTOMETRIA",
      labelDesc:
        "Garantir a saúde ocular  para as famílias em situação de vulnerabilidade social é o que fazemos com oferta de exames de vista completos ( avaliação de reflexo, fundo de olho, exames computadorizados e diagnóstico ).",
      labelRequisite: [
        "Solicitar primeiro exame de vista",
        "Solicitar exame de vista de rotina"
      ],
      pasta: "Optometria",
    },
  ];
  return (
    <View className="flex-1 w-full justify-center items-center bg-white">
      <BackgroundServices
        style={{ position: "absolute" }}
        width={width}
        height={height + 50}
      />
      <View className="flex-row absolute w-full pl-3 top-0 justify-between">
        <TextExtra text="Serviços" />
        <BackButton />
      </View>
      <View className="flex-row mt-20 w-full">
        <Image
          className="absolute w-24 h-24 ml-3"
          alt="pip-logo"
          resizeMode="cover"
          source={require("../../../assets/pip-icon.png")}
        />
        <Text className="font-default ml-20 bottom-3 text-md mt-20 text-gray-800">
          PROJETO INCLUSÃO POPULAR
        </Text>
      </View>

      <FlatList
        className="flex-1 w-full mb-3"
        data={items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="flex-row justify-around shadow-md shadow-black w-80 self-center h-32 my-3 rounded-lg bg-slate-200"
              onPress={() =>
                navigation.navigate("ViewService", {
                  title: item.labelTitulo,
                  picture: item.picture,
                  descrition: item.labelDesc,
                  requisite: item.labelRequisite,
                  pasta: item.pasta,
                })
              }
            >
              <View className="justify-evenly py-3">
                <Text
                  numberOfLines={4}
                  className="w-44 font-default text-md text-gray-800"
                >
                  {item.labelDesc}
                </Text>
              </View>

              <Image
                className="w-24 h-24 self-center bg-white/10 rounded-full"
                resizeMode="cover"
                alt="picture-service"
                source={item.picture}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
