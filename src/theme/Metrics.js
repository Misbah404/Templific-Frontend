/*
 * @flow
 * TODO: value * ratio difference between Android and iOS is of 2 value;
 * 16 in iOS is equals to 14 in android but this need to be verify.
 */

export default {
  smallMargin: 8,
  baseMargin: 16,
  doubleBaseMargin: 32,
  horizontalLineHeight: StyleSheet.hairlineWidth,
  tabBarHeight: 49, // Default tab bar height in iOS 10 (source react-navigation)
  borderRadius: 5

  /* icon: {
    tiny: ratio(8),
    small: ratio(16),
    normal: ratio(24), // Default tab icon size (source react-navigation)
    medium: ratio(32),
    large: ratio(40),
    xLarge: ratio(50),
    xxLarge: ratio(60),
    xxxLarge: ratio(100)
  }, */
  /* image: {
    small: ratio(20),
    medium: ratio(40),
    large: ratio(60),
    logImage: ratio(60),
    coverWidth: screenWidth,
    coverHeight: screenWidth / 2
  } */
};
