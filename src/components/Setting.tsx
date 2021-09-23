import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, View } from "react-native";

import { RootStackParamList } from "../../App";
import { DatePicker } from "./DatePicker";

type Props = NativeStackScreenProps<RootStackParamList, "Setting">;

export const Setting = (props: Props) => {
  const { navigation } = props;

  const [date, setDate] = useState(new Date());

  const confirm = () => {
    console.log("Log");
    // TODO save locally

    navigation.navigate("Home");
  };

  return (
    <View>
      <DatePicker date={date} onChange={(d) => setDate(d)} />
      <Button onPress={confirm} title="Log" />
    </View>
  );
};
