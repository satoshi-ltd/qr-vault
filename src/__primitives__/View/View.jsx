import PropTypes from "prop-types";
import React from "react";
import { View as NativeView } from "react-native";

import { style } from "./View.style";

const View = React.forwardRef(
  (
    { align, children, gap = false, row = false, wide = false, ...others },
    ref
  ) => (
    <NativeView
      {...others}
      pointerEvents={others.pointerEvents || others.pointer}
      ref={ref}
      style={[
        style.view,
        style[align],
        gap && style.gap,
        row && style.row,
        wide && style.wide,
        others.style,
      ]}
    >
      {children}
    </NativeView>
  )
);

View.displayName = "View";

View.propTypes = {
  align: PropTypes.oneOf(["left", "center", "right"]),
  children: PropTypes.node,
  gap: PropTypes.bool,
  displayName: PropTypes.string,
  row: PropTypes.bool,
  wide: PropTypes.bool,
};

export { View };
