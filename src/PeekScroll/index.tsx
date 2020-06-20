import React, { useState } from "react"
import { Button, StyleSheet, View } from "react-native"
import Animated, { Value, multiply, useCode, cond, eq, set, add } from "react-native-reanimated"
import {onGestureEvent, useTimingTransition} from "react-native-redash"
import {State, PanGestureHandler} from "react-native-gesture-handler"

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
    left: -300,
    width: 400,
    height: 200,
    backgroundColor: 'yellow'
  }
})

export const PeekScroll = () => {
  const state = new Value(State.UNDETERMINED);
  const offset = new Value(0)
  const translationX = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
  });

  useCode(() => [
    cond(eq(state, State.END), [
      set(offset, add(offset, translationX))
    ])
  ],[state, offset])

  const [ left, setLeft ] = useState<0 | 1>(0)

  const transitionSlide = multiply(useTimingTransition(left, {duration: 100}), 400)

  return (
    <PanGestureHandler { ...gestureHandler}>
      <Animated.View style={styles.page}>
        <Animated.View style={styles.outer}>
          <Animated.View style={[styles.inner, {
            transform: [
              { translateX: add(translationX, offset) },
            ],
          }]}>
          </Animated.View>
        </Animated.View>
        <Button title='test' onPress={(): void => { left === 0 ? setLeft(1) : setLeft(0) }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
