import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Card } from "./Card";

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
            disabled={visibleDate.getMonth() === new Date().getMonth()}
          />
        </IconContainer>
      </Header>
      <MainContent>
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
      </MainContent>
      <Footer />
    </Page>
  );
};

const MainContent = styled(Card)`
  flex: 1;
  display: flex;
  margin-bottom: 12px;
`;

const IconContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 40px 6px;
  padding-bottom: 5px;
`;

const MonthContainer = styled.View`
  padding: 0 0 5px;
`;
