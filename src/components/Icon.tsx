import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

import { theme } from "./theme";

interface Props {
  /**
   * Use `FontAwesome5` icons from the following link
   *
   * @see https://icons.expo.fyi/
   */
  name: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const Icon = (props: Props) => {
  const { name, onPress, disabled } = props;
  return (
    <FontAwesome5
      onPress={onPress}
      disabled={disabled}
      name={name}
      size={24}
      color={disabled ? theme.color.grey : theme.color.icon}
    />
  );
};
