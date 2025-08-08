
import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

type Props = TextInputProps & {
    // aqui você pode adicionar outras props personalizadas, se quiser
};

export default function MeuTextInput(props: Props) {
    return (
        <TextInput
            mode="outlined"
            activeOutlineColor='#2563EB'
            outlineColor='#BDBDBD'
            textColor='#1F2937'
            theme={{ colors: { text: '#1F2937' } }}
            {...props}
            style={[{ backgroundColor: '#fff' }, props.style]}
        />
    );
}