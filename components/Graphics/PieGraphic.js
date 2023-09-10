import React, {useContext} from 'react'
import { View } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg';
import { UserContext } from '../../src/contexts/UserContext';

function PieGraphic() {
    const {users} = useContext(UserContext)

    let voluntarios  = users.filter((item) => {
        if (item.isVolt == true){
            return item
        }
    })
    let autistas = users.filter((item) =>{
      if (item.isAutist == true){
        return item
      }
    })
    let coordenadores = users.filter((item) => {
        if (item.isCoord == true){
            return item
        }
    })

    let voluntariosCount = voluntarios.length
    let pessoasCount = users.length
    let autistasCount = autistas.length
    let coordenadoresCount = coordenadores.length

    const colors = ['#0005ff','#9555ff','#41bb', '#FF3100']
    const data = [pessoasCount, autistasCount, voluntariosCount, coordenadoresCount]

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value: value,
        
            svg: {
                fill: colors[index]
            },
            key: `pie-${index}`,
        }))

    const Label = ({slices}) => {
       return slices.map((slice,index) => {
        const {pieCentroid, data} = slice;
        return (
            <Text
            key={`label-${index}`}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor={'middle'}
            alignmentBaseline='middle'
            fontSize={22}
            >
                {data.value}
            </Text>
        )
       })
    }
        
        return(
            <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                <PieChart style={{ height: 250 }} 
                data={pieData}
               animate={true}
               animationDuration={300}
                outerRadius={'85%'}
                pa
                innerRadius={'45%'}
                 >
                    <Label />
                 </PieChart>
            </View>
        )
}
export default PieGraphic