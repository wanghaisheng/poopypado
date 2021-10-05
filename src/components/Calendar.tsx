import format from "date-fns/format";
import React, { useState } from "react";
import { Modal, Pressable, Text } from "react-native";
import { CalendarList } from "react-native-calendars";
import styled from "styled-components/native";

import { Card } from "./Card";
import { Poop, historyDateHash } from "./history";
import { PoopList } from "./PoopList";

interface Props {
  history: Poop[];
  onVisibleMonthChange: (date: Date) => void;
  onEdit: (entry: Poop) => void;
  onDelete: (id: string) => void;
}

export const Calendar = (props: Props) => {
  const { history, onVisibleMonthChange, onEdit, onDelete } = props;

  const counts = historyToCounts(history);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedDateHistory, setSelectedDateHistory] = useState<Poop[] | null>(
    null
  );
  const dateHash = historyDateHash(history);

  return (
    <Container>
      <CalendarList
        horizontal
        pagingEnabled
        onVisibleMonthsChange={(months) => {
          onVisibleMonthChange(new Date(months[0].dateString));
        }}
        renderHeader={() => <Text />}
        futureScrollRange={3}
        firstDay={1}
        dayComponent={({ date }) => {
          const count = counts[date.dateString];
          return (
            <Pressable
              onPress={() => {
                setSelectedDateHistory(dateHash[date.dateString] ?? null);
              }}
            >
              <DayContainer>
                <DayLabelContainer>
                  <DayLabel>{date.day}</DayLabel>
                </DayLabelContainer>
                <CountContainer
                  thisMonth={
                    date.month === currentMonth && date.year === currentYear
                  }
                >
                  <Count>{count > 0 ? count : ""}</Count>
                </CountContainer>
              </DayContainer>
            </Pressable>
          );
        }}
      />
      {selectedDateHistory && (
        <Modal transparent>
          <EntryModalContainer>
            <PoopList
              history={selectedDateHistory}
              onClose={() => {
                setSelectedDateHistory(null);
              }}
              onEdit={(entry) => {
                setSelectedDateHistory(null);
                onEdit(entry);
              }}
              onDelete={(id) => {
                onDelete(id);
                setSelectedDateHistory(null);
              }}
            />
          </EntryModalContainer>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled(Card)`
  padding: 0;
  overflow: hidden;
  background: white;
`;

const DayContainer = styled.View`
  height: 40px;
`;

const DayLabelContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
`;

const DayLabel = styled.Text`
  font-size: 10px;
`;

const CountContainer = styled.View<{ thisMonth: boolean }>`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: ${(p) => (p.thisMonth ? p.theme.color.main : "grey")};
  margin-top: 14px;
`;

const Count = styled.Text`
  color: white;
`;

const EntryModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 12px;
`;

/**
 * Matches `date.dateString` prop of `CalendarList`
 * component's `dayComponent` prop
 */
const DATE_STRING_FORMAT = "yyyy-MM-dd";

const historyToCounts = (history: Poop[]): Record<string, number> => {
  let counts: Record<string, number> = {};
  history.forEach((h) => {
    const date = format(h.date, DATE_STRING_FORMAT);
    if (counts[date] === undefined) counts[date] = 0;
    counts[date] += 1;
  });
  return counts;
};
