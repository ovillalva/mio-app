import { Text, StyleSheet } from 'react-native'

export const TitleHeader = ({ title, subTtitle, titleStyle, subTitleStyle }) => {
  return (
    <Text style={[styles.title, titleStyle]}>
      {title} <Text style={[styles.subTitle, subTitleStyle]}>{subTtitle}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#f4a947',
    fontSize: 16,
    fontFamily: 'Black-Montserrat',
    width: '100%'
  },
  subTitle: {
    color: '#ffffff',
    fontFamily: 'Black-Montserrat',
  }
})