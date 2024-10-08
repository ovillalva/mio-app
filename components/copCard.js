import { Image } from 'react-native'
import React from 'react'

export const CopCard = () => {
    return (
        <Image
            style={{
                width: '100%',
                alignSelf: 'center',
                height: '100%',
                resizeMode: 'contain',
            }}
            source = {require('../assets/copCard.png')}
        />
    )
}

export default CopCard