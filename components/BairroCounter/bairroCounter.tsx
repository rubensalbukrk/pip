import { View } from "react-native";
import { TextExtra, TextSmall } from "../TextLg/Text";

export const BairroCounter = (props: {value: number, city: string}) => {
    return (
        <View className="w-26 h-26 mx-1 my-1 rounded-lg justify-center items-center bg-blue-300/20"
        >
          <TextExtra className="text-blue-500" text={props.value} />
          <TextSmall className="text-blue-500" text={props.city} />
        </View>
    )
}