import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";

import { RootStackParamList } from "../../App";
import { Calendar } from "./Calendar";
import { Poop, deleteEntry, getEntries } from "./history";
import { Icon } from "./Icon";
import { MonthHeader } from "./MonthHeader";
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

  const [calendarKey, setCalendarKey] = useState(1);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <MonthHeader date={visibleDate} />,
      headerRight: () => (
        <Icon
          onPress={() => {
            setCalendarKey(calendarKey + 1);
            setVisibleDate(new Date());
          }}
          name="calendar"
          disabled={visibleDate.getMonth() === new Date().getMonth()}
        />
      ),
    });
  }, [visibleDate, calendarKey]);

  const goToSettingPage = () => {
    setCalendarKey(calendarKey + 1);
    setVisibleDate(new Date());
    navigation.navigate("Setting");
  };

  const editEntry = (entry: Poop) => {
    navigation.navigate("Setting", { entry });
  };

  return (
    <Page>
      <Calendar
        calendarKey={calendarKey}
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
    </Page>
  );
};
