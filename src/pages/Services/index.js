import React from "react";
import {
  Box,
  Text,
  Image,
  Button,
  Center,
  FlatList,
  HStack,
  VStack,
  Heading,
} from "native-base";
import BackButton from "../../../components/BackButton";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function Services() {
  const navigation = useNavigation();
  const items = [
    {
      id: 1,
      title: "Autistas",
      picture: require("../../../assets/imgs/pip-autistas.jpg"),
      labelTitulo: "PIP PARA AUTISTAS",
      labelDesc:
        "Além dos encontros com os pais de pessoas com espectro autista para fortalecimento coletivo, essa pasta de atuação tem a missão de potencializar o acesso das pessoas TEA aos serviços básicos como por exemplo: Emissão de RG, Solicitação da Carteira de Identificação da Pessoa com Autismo - CIPTEA que tem funcionalidade de passe livre, orientações psicológicas para os pais e responsáveis, assessoria jurídica e atendimentos com nutricionista.",
      labelRequisite: [
        "CARTEIRA DE IDENTIFICAÇÃO DA PESSOA COM AUTISMO - CIPTEA",
        "Assessoria jurídica",
        "Emissão de RG do autista",
        "Atendimento nutricional",
      ],
      pasta: "Autistas",
    },
    {
      id: 2,
      title: "Mulher",
      picture: require("../../../assets/imgs/pip-mulher.jpeg"),
      labelTitulo: "PIP MULHER",
      labelDesc:
        "Visando potencializar os cuidados com as mulheres cadastradas e em parceria com o Sesc Saúde Mulher, ofertamos mensalmente citológicos e mamografias, como também grupos de orientações em saúde coletiva e gestacional.",
      labelRequisite: [
        "Solicitar Citológico ",
        "Solicitar Mamogragia",
        "Participar do grupo de gestantes",
      ],
      pasta: "Mulher"
    },
    {
      id: 3,
      title: "CIDADANIA",
      picture: require("../../../assets/imgs/pip-cidadania.jpg"),
      labelTitulo: "PIP CIDADANIA",
      labelDesc:
        "O acesso à documentação básica é de extrema importância para que a população consiga acessar outros serviços públicos. Dessa forma, essa pasta viabiliza o agendamento de RG, CPF e Carteira De Trabalho Digital.",
      labelRequisite: ["Agendar emissão de RG"],
      pasta: "Mulher"
    },
    {
      id: 4,
      title: "Segurança Alimentar",
      picture: require("../../../assets/imgs/pip-sgralimentar.jpg"),
      labelTitulo: "PIP SEGURANÇA ALIMENTAR",
      labelDesc:
        "O acesso à alimentação é direito de todos e todas. Diante do cenário de vulnerabilidade social que foi potencializado com a pandemia, nós estamos comprometidos em cooperar com a missão mundial de erradicar a pobreza e fome extrema.",
      labelRequisite: [
        "Solicitar Cesta básica",
        "Solicitar Cartão Alimentação",
      ],
      pasta: "Segurança Alimentar"
    },
    {
      id: 5,
      title: "Saúde Mental",
      picture: require("../../../assets/imgs/pip-saudemental.jpg"),
      labelTitulo: "PIP SAÚDE MENTAL",
      labelDesc:
        "Uma das maiores problemáticas na sociedade são as doenças psicossomáticas e por isso queremos contribuir para que as famílias cadastradas tenham acesso à atendimentos de psicologia para garantir sua saúde mental.",
      labelRequisite: ["Solicitar atendimento de psicologia"],
      pasta: "Saúde Mental"
    },
    {
      id: 6,
      title: "Protagonismo",
      picture: require("../../../assets/imgs/pip-protagonista.jpg"),
      labelTitulo: "PIP PROTAGONISMO JUVENIL",
      labelDesc:
        "Em parceria com o Centro de Integração Empresa Escola - CIEE, encaminhamos jovens de 14 á 23 anos para o cadastro de prioridade por estarem em situação de vulnerabilidade social.",
      labelRequisite: ["Solicitar encaminhamento ao CIEE"],
      pasta: "Protagonismo Juvenil"
    },
    {
      id: 7,
      title: "PASSE LIVRE",
      picture: require("../../../assets/imgs/cord-administrativa.jpg"),
      labelTitulo: "PIP PASSE LIVRE ESTADUAL",
      labelDesc:
        "O passe livre estadual é direito garantido pela Lei 18.419/2015 para pessoas com deficiência que assegura a isenção das taxas nos transportes coletivos intermunicipais. O Projeto Inclusão Popular é credenciado na FUNAD para solicitar o PASSE LIVRE PCD.",
      labelRequisite: ["Solicitar o PASSE LIVRE PCD"],
      pasta: "Passe Livre"
    },
  ];
  return (
    <Center flex={1} bg="lightBlue.400">
      <Box position="absolute" left="3%" top="4%">
        <BackButton />
      </Box>
      <Heading color="#fff" my="3" mt="20%" fontSize="2xl">
        Aqui você tem benefícios
      </Heading>
      <FlatList
        w="100%"
        flex={1}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Center
              alignSelf="center"
              my="3"
              bg="lightBlue.300"
              w="80%"
              h="260"
              rounded="full"
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("ViewService", {
                    titulo: item.labelTitulo,
                    picture: item.picture,
                    descricao: item.labelDesc,
                    requisite: item.labelRequisite,
                    pasta: item.pasta
                  })
                }
              >
                <Image
                  resizeMode="auto"
                  w="100%"
                  alt="picture-service"
                  h="100%"
                  rounded="full"
                  source={item.picture}
                />
              </TouchableOpacity>
            </Center>
          );
        }}
      />
    </Center>
  );
}
