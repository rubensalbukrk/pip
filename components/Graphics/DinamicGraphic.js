import React from "react";
import { Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { UserContext } from "../../src/contexts/UserContext";

class PieChartWithDynamicSlices extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: "",
        value: 0,
      },
      labelWidth: 0,
    };
  }
  render() {
    const { users } = this.context;

    let familias = users?.filter((item) => item.parents?.length > 0)
    let voluntarios = users?.filter((item) => {
      if (item.isVolt == true) {
        return item;
      }
    });
    let allParents = users?.map((item) => {
      return item.parents
    }).flat()

    let autistas = allParents.filter((item) => item.isAutist === true);

    let pcds = allParents.filter((item) => item.isPcd === true);
    
    let coordenadores = users?.filter((item) => {
      if (item.isCoordAutist == true) {
        return item;
      }
      if (item.isCoordMulher == true) {
        return item;
      }
      if (item.isCoordCidadania == true) {
        return item;
      }
      if (item.isCoordSaude == true) {
        return item;
      }
      if (item.isCoordAlimentar == true) {
        return item;
      }
      if (item.isCoordProtagonista == true) {
        return item;
      }
      if (item.isCoordPasse == true) {
        return item;
      }
      if (item.isCoordCursos == true) {
        return item;
      }
      if (item.isCoordOptometria == true) {
        return item;
      }
    });

    let empresas = users?.filter((user) => user.isBusiness == true)
    
    
    let voluntariosCount = voluntarios?.length;
    let familiasCount = familias?.length;
    let autistasCount = autistas?.length;
    let pcdsCount = pcds?.length;
    let coordenadoresCount = coordenadores?.length;
    let empresasCount = empresas?.length;

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ["Famílias", "Autistas", "PCDS", "Voluntários", "Coordenador"];
    const values = [
      familiasCount,
      autistasCount,
      pcdsCount,
      voluntariosCount,
      coordenadoresCount,
      empresasCount
    ];
    const colors = ["#4f494a", "#6a6162", "#907a7b", "#847a7b", "#9d9495","#9d8080"];
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: { fill: colors[index], opacity: 0.6 },
        arc: {
          outerRadius: 120 + (values[index] >= 120 ? 30 : values[index]),
          padAngle: label === key ? 0.1 : 0,
        },
        onPress: () =>
          this.setState({
            selectedSlice: { label: key, value: values[index] },
          }),
      };
    });
    const deviceWidth = Dimensions.get("window").width;

    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          width: "100%",
          height: 400,
        }}
      >
        <PieChart
          style={{ width: "100%", height: 350, justifyContent: "center" }}
          xMax="90"
          yMax="100"
          xMin="30"
          outerRadius={90}
          innerRadius={85}
          data={data}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: { x, y },
            },
          }) => {
            this.setState({ labelWidth: x });
          }}
          style={{
            position: "absolute",
            left: deviceWidth / 2 - labelWidth / 2,
            color: "#f2f2f2",
            fontFamily: "Doppio One",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {`${label} \n ${value === 0 ? "" : value}`}
        </Text>
      </View>
    );
  }
}
PieChartWithDynamicSlices.contextType = UserContext;
export default PieChartWithDynamicSlices;
