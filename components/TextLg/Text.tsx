import { Text } from "react-native";

export const TextLarge = ({...props}) => {
    return <Text {...props} className="font-default text-lg text-white">{props.text}</Text>
}