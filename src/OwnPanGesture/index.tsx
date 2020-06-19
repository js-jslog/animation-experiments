import * as React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { PanGestureHandler, State, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { diffClamp, onGestureEvent } from "react-native-redash";
import { Card, StyleGuide, cards } from "../components";
import { CARD_HEIGHT, CARD_WIDTH } from "../components/Card";

const { Value, cond, set, eq, add } = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight =
  height - Constants.statusBarHeight - (Platform.OS === "ios" ? 44 : 52);
const offsetX = new Value((containerWidth - CARD_WIDTH) / 2);
const offsetY = new Value((containerHeight - CARD_HEIGHT) / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
});
const [card] = cards;

const withOffset = (
  value: Animated.Node<number>,
  state: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0)
) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value)
  );

export const OwnPanGesture = () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const handleStateChange = () => {
    console.log('::::::::::::::::::::::::::: state change')
  }
  // This handler demonstrates that the gesture provider is
  // continuing to send gesture events as expected. You will
  // see the console full of gesture logs as you slide your
  // finger around.
  const gestureHandlerSimple = (props: PanGestureHandlerGestureEvent) => {
    console.log('::::::::::::::::::::::::::::::::::::::::::::::: gesture ' + props.toString())
    return gestureHandler.onGestureEvent
  }
  // This handler demonstrates that the same issue occurs
  // whether you use the redash helper or the base reanimated
  // event object.
  const gestureHandlerNoRedash = Animated.event([{
    nativeEvent: {
      state,
      translationX,
      translationY
    }
  }])
  // This is the original handler which first displayed the
  // problem that the panning no longer occurs after a rerender.
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  });
  const translateX = diffClamp(
    withOffset(translationX, state, offsetX),
    0,
    containerWidth - CARD_WIDTH
  );
  const translateY = diffClamp(
    withOffset(translationY, state, offsetY),
    0,
    containerHeight - CARD_HEIGHT
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler
        onHandlerStateChange={handleStateChange}
        //onGestureEvent={gestureHandlerSimple}
        onGestureEvent={gestureHandlerNoRedash}
      >
        <Animated.View
          style={{
            // just change this color from red to yellow to see the issue occur
            backgroundColor: 'red',
            transform: [{ translateX }, { translateY }],
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
