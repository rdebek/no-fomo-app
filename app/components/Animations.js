import { Animated } from "react-native";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { width, height } from "./Utility";

export const slideIn = (animation, opacityAnimation) => {
  Animated.parallel([
    Animated.sequence([
      Animated.timing(animation, {
        useNativeDriver: false,
        toValue: 0.05,
        duration: 1000,
      }),
      Animated.timing(animation, {
        useNativeDriver: false,
        toValue: 0.15 * width,
        duration: 750,
      }),
      Animated.timing(animation, {
        useNativeDriver: false,
        toValue: 0.1 * width,
        duration: 500,
      }),
    ]),
    Animated.timing(opacityAnimation, {
      useNativeDriver: false,
      toValue: 1,
      duration: 2225,
    }),
  ]).start();
};
