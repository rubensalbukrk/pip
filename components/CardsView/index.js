import React from 'react';
import { View, Text, Image } from 'react-native';
import { data } from '../../src/utils/dateNow.';

export default function CardView(props) {
 return (
    <View shadow={3} rounded="lg">
         
              <Image source={{
              uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
            }} alt="image" />
           
           <Text className="font-default text-3xl text-white">
                {props.title}
              </Text>
          
      
              <Text className="font-default text-xl text-white">
                {props.heading}
              </Text>
              <Text className="font-default text-lg text-white">
                {props.little}
              </Text>
           
            <Text className="font-default text-lg text-white">
              {props.descrition}
            </Text>
   
                <Text className="font-default text-xs text-white">
                  {data}
                </Text>
        </View>
  );
}