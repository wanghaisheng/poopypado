import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import { RootStackParamList } from "../../App";
import { Calendar } from "./Calendar";
import { Card } from "./Card";
import { Poop, deleteEntry } from "./history";
import { NewEntry } from "./NewEntry";
import { Page } from "./Page";

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

  // set title to current month
  const [visibleDate, setVisibleDate] = useState(new Date());

  useEffect(() => {
    navigation.setOptions({ title: format(visibleDate, "MMMM yyyy") });
  }, [visibleDate]);

  const goToSettingPage = () => {
    navigation.navigate("Setting");
  };

  const editEntry = (entry: Poop) => {
    navigation.navigate("Setting", { entry });
  };

  return (
    <Page>
      <CalendarContainer>
        <Calendar
          history={history}
          onVisibleMonthChange={setVisibleDate}
          onEdit={editEntry}
          onDelete={(id) => {
            deleteEntry(db, id, () => {
              const newHistory = history.filter((h) => h.id.toString() !== id);
              setHistory(newHistory);
            });
          }}
        />
      </CalendarContainer>
      <NewEntry onNewEntryPress={goToSettingPage} />
    </Page>
  );
};

const CalendarContainer = styled(Card)`
  flex: 1;
  padding: 0;
  overflow: hidden;
`;
