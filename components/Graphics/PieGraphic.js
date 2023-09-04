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
      if (item.isAutist ==true){
        return item
      }
    })

    let voluntariosCount = voluntarios.length
    let pessoasCount = users.length
    let autistasCount = autistas.length

    const colors = ['#0005ff','#c6ceff','#65cdfc', '#9555ff',]
    const data = [pessoasCount, autistasCount, voluntariosCount, 1]

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: colors[index]
            },
            arc: { outerRadius: '100%' },
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
                {data.value}<Text fontSize={18}>%</Text>
            </Text>
        )
       })
    }
        
        return(
            <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                <PieChart style={{ height: 250 }} 
                data={pieData}
               
                outerRadius={'85%'}
                
                innerRadius={'45%'}
                 >
                    <Label />
                 </PieChart>
            </View>
        )
}
export default PieGraphic