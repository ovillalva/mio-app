import React from "react";
import { Image } from "react-native-expo-image-cache";
import { StyleSheet, View } from "react-native";

// Componente reutilizable para manejar imágenes con cache y preview
const CachedImage = ({ uri, preview, style }) => {
  return (
    <View>
      <Image
        source={{ uri }} 
        defaultSource={preview} 
        style={[styles.image, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
     resizeMode: 'cover'
  },
});

export default CachedImage;
