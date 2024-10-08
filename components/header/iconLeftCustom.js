import { Image, View } from 'react-native'

export const IconLeftCustom = ({ urlImage }) => {
  return (
    <View>
      <Image source={urlImage} resizeMode='contain' />
    </View>
  )
}
