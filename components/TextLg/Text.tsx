import { Text } from "react-native";

export const TextLarge = ({...props}) => {
    return <Text {...props} className="font-default px-2 text-lg text-white">{props.text}</Text>
}

export const TextMedium = ({...props}) => {
    return <Text {...props} className="font-default px-2 my-1 text-2xl text-white">{props.text}</Text>
}

export const TextExtra = ({...props}) => {
    return <Text {...props} className="font-default px-3 my-2 text-4xl text-white">{props.text}</Text>
}

export const TextSmall = ({...props}) => {
    return <Text {...props} className="font-default text-sm text-white">{props.text}</Text>
}
export const TextXl = ({...props}) => {
    return <Text {...props} className="font-default text-xl text-white">{props.text}</Text>
}