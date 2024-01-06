import StyleSheet from "react-native-extended-stylesheet";

const style = StyleSheet.create({
  accent: {
    color: "$colorAccent",
  },

  alert: {
    color: "$colorAlert",
  },

  base: {
    color: "$colorBase",
  },

  content: {
    color: "$colorContent",
  },

  contentLight: {
    color: "$colorContentLight",
  },
});

const COLORS = ["accent", "alert", "base", "content", "contentLight"];

const getColor = (value) => style[value] || style.content;

export { COLORS, getColor };
