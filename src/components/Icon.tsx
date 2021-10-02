import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  /**
   * Use `FontAwesome5` icons from the following link
   *
   * @see https://icons.expo.fyi/
   */
  name: string;
  onPress?: () => void;
}

export const Icon = (props: Props) => {
  const { name, onPress } = props;
  return (
    <Pressable onPress={onPress}>
      <Text>
        <FontAwesome5 name={name} size={24} color="black" />
      </Text>
    </Pressable>
  );
};
