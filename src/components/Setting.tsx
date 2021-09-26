import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useState } from "react";
import { Button, View } from "react-native";

import { RootStackParamList } from "../../App";
import { DatePicker } from "./DatePicker";

interface Props extends NativeStackScreenProps<RootStackParamList, "Setting"> {
  db: WebSQLDatabase;
}
export const Setting = (props: Props) => {
  const { navigation, db } = props;

  const [date, setDate] = useState(new Date());

  const confirm = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (date) values (?)", [
          date.toISOString(),
        ]);
      },
      () => {
        console.log("success");
        navigation.navigate("Main");
      }
    );
  };

  return (
    <View>
      <DatePicker date={date} onChange={(d) => setDate(d)} />
      <Button onPress={confirm} title="Log" />
    </View>
  );
};
