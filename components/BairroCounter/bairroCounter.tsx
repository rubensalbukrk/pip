import { View } from "react-native";
import { TextExtra, TextSmall } from "../TextLg/Text";

export const BairroCounter = (props: {value: number, city: string}) => {
    return (
        <View className="w-28 h-28 mx-2 my-2 rounded-lg justify-center items-center bg-white/20"
        >
          <TextExtra text={props.value} />
          <TextSmall text={props.city} />
        </View>
    )
}