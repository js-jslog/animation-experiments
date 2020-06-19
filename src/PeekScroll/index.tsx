import * as React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outer: {
    width: 200,
    height: 200,
    backgroundColor: 'black'
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
  return (
    <View style={styles.page}>
      <View style={styles.outer}>
        <View style={styles.inner}>
        </View>
      </View>
    </View>
  );
};
