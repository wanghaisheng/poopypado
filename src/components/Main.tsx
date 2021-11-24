import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Card } from "./Card";
import { sub, format } from "date-fns";

import { RootStackParamList } from "../../App";
import { Calendar } from "./Calendar";
import { Footer } from "./Footer";
import { Header } from "./Header";
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
  const [typeSelected, setType] = useState(0);
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
      <Header>
        <MonthContainer>
          <MonthHeader date={visibleDate} />
        </MonthContainer>
        <IconContainer>
          <Icon
            onPress={() => {
              setCalendarKey(calendarKey + 1);
              setVisibleDate(new Date());
            }}
            name="calendar"
            size={21}
            disabled={visibleDate.getMonth() === new Date().getMonth()}
          />
        </IconContainer>
      </Header>
      <MainContent>
        <Calendar
          calendarKey={calendarKey}
          history={history}
          typeSelected={typeSelected}
          onVisibleMonthChange={setVisibleDate}
          onEdit={editEntry}
          onDelete={(id) => {
            deleteEntry(db, id, () => {
              const newHistory = history.filter((h) => h.id.toString() !== id);
              setHistory(newHistory);
            });
          }}
        />
        <NewEntry
          onNewEntryPress={goToSettingPage}
          onTypeSelect={setType}
          typeSelected={typeSelected}
          entryCount={entryAmountCount(history)}
        />
      </MainContent>
      <Footer />
    </Page>
  );
};

const DATE_STRING_FORMAT = "yyyyMMdd";

const entryAmountCount = (history: Poop[]) => {
  let entryCount = 0;

  const endDate = sub(new Date(), {
    days: 30,
  });
  const endDateString = format(endDate, DATE_STRING_FORMAT);

  let i = 0;
  while (history[i]) {
    let checkDate = format(history[i].date, DATE_STRING_FORMAT);
    if (checkDate < endDateString) {
      console.log("checkDate", checkDate);
      return entryCount;
    } else {
      entryCount++;
      i++;
    }
  }
  return entryCount;
};

const MainContent = styled(Card)`
  flex: 1;
  display: flex;
  margin-bottom: 12px;
  padding-right: 7px;
`;

const IconContainer = styled.View`
  position: absolute;
  bottom: 8px;
  right: 40px;
`;

const MonthContainer = styled.View`
  padding: 0 0 5px;
`;
