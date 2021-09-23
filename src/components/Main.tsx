import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";

import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const Main = (props: Props) => {
  const { navigation } = props;

  const add = () => {
    navigation.navigate("Setting");
  };

  return (
    <View>
      <Text>Yo</Text>
      <Button onPress={add} title="Track" />
    </View>
  );
};
