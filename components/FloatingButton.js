import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, PanResponder, Animated, TouchableOpacity, Dimensions, View, Text } from 'react-native';
import { Image } from "react-native-expo-image-cache";

export const FloatingButton = ({ navigation }) => {
  const [isMovable, setIsMovable] = useState(true);
  const [isDragging, setIsDragging] = useState(false); // Estado para saber si el botón está siendo arrastrado

  const pan = useRef(new Animated.ValueXY()).current;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const buttonWidth = 87;
  const buttonHeight = 87;

  // Posición inicial del botón
  const initialX = (screenWidth / 2) - (buttonWidth + 100);
  const initialY = (screenHeight / 2) - (buttonHeight + 110);

  // Establecer la posición inicial cuando el componente se monta
  useEffect(() => {
    pan.setValue({ x: initialX, y: initialY });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => isMovable && (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10),
      onPanResponderGrant: () => {
        setIsDragging(true); 
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        const newX = gestureState.dx + pan.x._offset;
        const newY = gestureState.dy + pan.y._offset;

        const limitedX = Math.max(0, Math.min(newX, screenWidth - buttonWidth));
        const limitedY = Math.max(0, Math.min(newY, screenHeight - buttonHeight));

        pan.x.setValue(limitedX - pan.x._offset);
        pan.y.setValue(limitedY - pan.y._offset);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        setIsDragging(false);
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.floatingButtonContainer,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.floatingButton}>
        <TouchableOpacity onPress={() => navigation.navigate('RoutesScreenCop')}>
          <Image
            defaultSource={require('../assets/cop16.png')}
            source={{ uri: 'https://metrocali.gov.co/app/assets/COP16.png' }}
            style={styles.buttons} />
        </TouchableOpacity>
      </View>
      {/* {!isDragging && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Rutas COP16</Text>
        </View>
      )} */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    flexDirection: 'row', // Hace que los elementos estén en fila
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 120, 255, 0.57)',
    // borderRadius:40
  },
  floatingButton: {
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 50,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    width: 90,
    height: 90,
  },
  buttons: {
    width: 87,
    height: 87,
  },
  textContainer: {
    marginRight: 10, 
  },
  text: {
    fontFamily: 'Black-Montserrat',
    fontSize: 18,
    color: 'yellow',
    
  },
});

export default FloatingButton;
