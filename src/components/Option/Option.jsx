import PropTypes from "prop-types";
import React from "react";

import { style } from "./Option.style";
import { Pressable, Switch, Text } from "../../__primitives__";

const Option = ({
  checked,
  children,
  disabled,
  value,
  onPress = () => {},
  ...others
}) => (
  <Pressable
    {...others}
    disabled={disabled}
    feedback
    onPress={!checked ? () => onPress(value) : undefined}
    style={[
      style.option,
      checked && style.checked,
      checked && disabled && style.disabled,
      others.style,
    ]}
  >
    <Text bold color={disabled ? "contentLight" : undefined} caption>
      {children}
    </Text>
    <Switch checked={checked} disabled={disabled} />
  </Pressable>
);

Option.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onPress: PropTypes.func,
};

export { Option };
