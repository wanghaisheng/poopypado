import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import { RootStackParamList } from "../../App";
import { Calendar } from "./Calendar";
import { Footer } from "./Footer";
import { Poop, deleteEntry, getEntries } from "./history";
import { NewEntry } from "./NewEntry";
import { Page } from "./Page";

interface Props extends NativeStackScreenProps<RootStackParamList, "Main"> {
  db: WebSQLDatabase;
}

export const Main = (props: Props) => {
  const { navigation, route, db } = props;

  const [history, setHistory] = useState<Poop[]>([]);

  // Get history
  useEffect(() => {
    getEntries(db, (entries) => {
      setHistory(entries);
    });
  }, [route]);

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
      <NewEntry onNewEntryPress={goToSettingPage} />
      <Footer />
    </Page>
  );
};
