import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import { RootStackParamList } from "../../App";
import { Calendar } from "./Calendar";
import { Poop } from "./history";

interface Props extends NativeStackScreenProps<RootStackParamList, "Main"> {
  db: WebSQLDatabase;
}

export const Main = (props: Props) => {
  const { navigation, db } = props;

  const [history, setHistory] = useState<Poop[]>([]);

  // Get history
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM items ORDER BY date(date) DESC;`,
        [],
        (_, { rows }) => {
          setHistory(
            (rows as any)._array.map((a: any) => ({
              id: a.id,
              date: new Date(a.date),
            }))
          );
        }
      );
    });
  }, []);

  const add = () => {
    navigation.navigate("Setting");
  };

  return (
    <View>
      <Calendar history={history} />
      <Button onPress={add} title="Track" />
    </View>
  );
};
