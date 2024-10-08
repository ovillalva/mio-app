import PagerView from 'react-native-pager-view'
import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet } from 'react-native'

const banners = [
  'https://metrocali.gov.co/app/res/banner/1.png',
  'https://metrocali.gov.co/app/res/banner/2.png',
  'https://metrocali.gov.co/app/res/banner/3.png',
  'https://metrocali.gov.co/app/res/banner/4.png',
  'https://metrocali.gov.co/app/res/banner/5.png',
  'https://metrocali.gov.co/app/res/banner/6.png',
]

export const Carousel = () => {
  const pageRef = useRef(null)

  useEffect(() => {
    let page = 0
    const interval = setInterval(() => {
      page = (page == banners.length) ? 0 : (page + 1)
      pageRef.current.setPage(page)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <PagerView ref={pageRef} initialPage={0} style={styles.viewPager}>
      {banners.map((uri) =>
        <Image
          //source={{ uri: uri }}
          source={{uri:uri}}
          style={styles.imagePager}
          key={uri}
        />)}
    </PagerView>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    marginTop: 5,
  },
  imagePager: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
})