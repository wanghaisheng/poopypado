import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import { RootStackParamList } from "../../App";

interface Props extends NativeStackScreenProps<RootStackParamList, "Main"> {
  db: WebSQLDatabase;
}

interface History {
  id: number;
  date: Date;
}

export const Main = (props: Props) => {
  const { navigation, db } = props;

  const [history, setHistory] = useState<History[]>([]);

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
      {history.map((h) => (
        <Text key={h.id}>{h.date.toISOString()}</Text>
      ))}
      <Button onPress={add} title="Track" />
    </View>
  );
};
