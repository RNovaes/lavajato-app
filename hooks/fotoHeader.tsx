
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { ImageSourcePropType } from 'react-native'

const FOTO_PADRAO: ImageSourcePropType = require('@/assets/images/sem-foto-homem.jpg')

export function fotoPerfilHeader() {
    const [foto, setFoto] = useState<ImageSourcePropType>(FOTO_PADRAO)

    async function tirarFoto() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') return

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        })

        if (!result.canceled) {
            setFoto({ uri: result.assets[0].uri })
        }
    }

    async function escolherGaleria() {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        })

        if (!result.canceled) {
            setFoto({ uri: result.assets[0].uri })
        }
    }

    return {
        foto,
        setFoto,
        tirarFoto,
        escolherGaleria,
    }
}
