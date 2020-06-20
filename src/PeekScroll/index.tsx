import React, { useState } from "react"
import { Button, StyleSheet, View } from "react-native"
import Animated, { multiply } from "react-native-reanimated"
import {useTimingTransition} from "react-native-redash"

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outer: {
    height: 200,
    width: 200,
    backgroundColor: 'black',
    overflow: 'hidden'
  },
  inner: {
    ...StyleSheet.absoluteFillObject,
    left: -100,
    width: 200,
    height: 200,
    backgroundColor: 'yellow'
  }
})

export const PeekScroll = () => {
  const [ left, setLeft ] = useState<0 | 1>(0)

  const transitionSlide = multiply(useTimingTransition(left, {duration: 100}), 200)

  return (
    <View style={styles.page}>
      <View style={styles.outer}>
        <Animated.View style={[styles.inner, {
            transform: [
              { translateX: transitionSlide },
            ],
          }]}>
        </Animated.View>
      </View>
      <Button title='test' onPress={(): void => { left === 0 ? setLeft(1) : setLeft(0) }} />
    </View>
  );
};
