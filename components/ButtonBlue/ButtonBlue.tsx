import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextLarge } from '../TextLg/Text';

export const Button = ({...props}) => {
    return (
        <TouchableOpacity
        onPress={props.onPress}
        {...props}
        className='w-60 h-12 rounded-lg items-center justify-center bg-blue-700'
        >
            <TextLarge text={props.title} />
        </TouchableOpacity>
    )
}