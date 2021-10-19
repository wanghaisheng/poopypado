import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

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
    <Pressable onPress={onPress} disabled={disabled} hitSlop={12}>
      <FontAwesome5
        name={name}
        size={24}
        color={disabled ? theme.color.grey : theme.color.icon}
      />
    </Pressable>
  );
};
