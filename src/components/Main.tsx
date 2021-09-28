import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import styled from "styled-components/native";

import { RootStackParamList } from "../../App";
import { Calendar } from "./Calendar";
import { Poop } from "./history";
import { NewEntry } from "./NewEntry";

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

  const goToSettingPage = () => {
    navigation.navigate("Setting");
  };

  return (
    <Container>
      <CalendarContainer>
        <Calendar history={history} />
      </CalendarContainer>
      <NewEntry onNewEntryPress={goToSettingPage} />
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  display: flex;
`;

const CalendarContainer = styled.View`
  flex: 1;
`;
