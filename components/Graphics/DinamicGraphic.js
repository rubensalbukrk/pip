import React,{ useContext } from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { UserContext } from '../../src/contexts/UserContext';



 class PieChartWithDynamicSlices extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0
    }
  }
  render() {

    const {users} = this.context
    let voluntarios = users.filter((item) => {
      if (item.isVolt == true) {
        return item;
      }
    });
    let autistas = users.filter((item) => {
      if (item.isAutist == true) {
        return item;
      }
    });
    let coordenadores = users.filter((item) => {
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
    });
    
    let voluntariosCount = voluntarios.length;
    let pessoasCount = users.length;
    let autistasCount = autistas.length;
    let coordenadoresCount = coordenadores.length;

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ['Pessoas', 'Autistas', 'Voluntários', 'Coordenador'];
    const values = [123, 80, 50, 30];
    const colors = ['#0017FF','#0068FF','#008DFF', '#00CCD9']
    const data = keys.map((key, index) => {
        return {
          key,
          value: values[index],
          svg: { fill: colors[index] },
          arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={{ justifyContent: 'center', flex: 1, width: '100%', height: 350 }}>
        <PieChart
          contentInset='overflow'
          style={{ height: 350 }}
          outerRadius={90}
          innerRadius={85}
          data={data}
        />
        <Text
          onLayout={({ nativeEvent: { layout: { x,y } } }) => {
            this.setState({ labelWidth: x });
          }}
          style={{
            position: 'absolute',
            left: deviceWidth / 2 - labelWidth / 2,
            color: '#f2f2f2',
            fontFamily: 'Doppio One',
            fontSize: 18,
            textAlign: 'center'
          }}>
          {`${label} \n ${value === 0 ? '' : value}`}
        </Text>
      </View>
    )
  }
}
PieChartWithDynamicSlices.contextType = UserContext
export default PieChartWithDynamicSlices;