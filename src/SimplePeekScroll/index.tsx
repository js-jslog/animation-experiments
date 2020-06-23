import React, { useState } from "react"
import { Button, StyleSheet } from "react-native"
import Animated, { multiply, Value, event, useCode, cond, eq, set } from "react-native-reanimated"
import {withSpringTransition} from "react-native-redash"
import {PanGestureHandler, State} from "react-native-gesture-handler"

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

export const SimplePeekScroll = () => {
  const rightSide = new Value<0|1>(0)
  const state = new Value(State.UNDETERMINED)
  const handleGestureStateChange = event([{
    nativeEvent: {
      state,
    }
  }])

  useCode(() => [
    cond(eq(state, State.END), 
         cond(eq(rightSide, 0), set(rightSide, 1), set(rightSide, 0))
        )
  ], [state])

  const transitionSlide = multiply(withSpringTransition(rightSide, {}), 400)

  return (
    <PanGestureHandler onHandlerStateChange={handleGestureStateChange}>
      <Animated.View style={styles.page}>
        <Animated.View style={styles.outer}>
          <Animated.View style={[styles.inner, {
            transform: [
              { translateX: transitionSlide },
            ],
          }]}>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
