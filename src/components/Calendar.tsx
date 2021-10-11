import format from "date-fns/format";
import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import styled from "styled-components/native";

import { Card } from "./Card";
import { Poop, historyDateHash } from "./history";
import { PoopList } from "./PoopList";

interface Props {
  history: Poop[];
  onVisibleMonthChange: (date: Date) => void;
  onEdit: (entry: Poop) => void;
  onDelete: (id: string) => void;
  /**
   * A workaround to set the calendar view back to current month.
   * Update this number to set month to current month
   */
  calendarKey: number;
}

export const Calendar = (props: Props) => {
  const { history, onVisibleMonthChange, onEdit, onDelete, calendarKey } =
    props;

  const counts = historyToCounts(history);
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedDateHistory, setSelectedDateHistory] = useState<Poop[] | null>(
    null
  );
  const dateHash = historyDateHash(history);

  /**
   * Closes entry on calendar reset
   */
  useEffect(() => {
    setSelectedDateHistory(null);
  }, [calendarKey]);

  return (
    <Container>
      <RNCalendar
        key={calendarKey}
        enableSwipeMonths
        onMonthChange={(month) => {
          onVisibleMonthChange(new Date(month.dateString));
        }}
        firstDay={1}
        hideArrows
        renderHeader={() => <Text />}
        dayComponent={({ date }) => {
          const count = counts[date.dateString];
          return (
            <Pressable
              onPress={() => {
                setSelectedDateHistory(dateHash[date.dateString] ?? null);
              }}
            >
              <DayContainer>
                <DayLabel>{date.day}</DayLabel>
                <CountBubbleContainer>
                  <CountBubble
                    hasEntry={!!count}
                    thisMonth={
                      date.month === currentMonth && date.year === currentYear
                    }
                    today={
                      date.day === currentDate &&
                      date.month === currentMonth &&
                      date.year === currentYear
                    }
                  >
                    <Count>{count > 0 ? count : ""}</Count>
                  </CountBubble>
                </CountBubbleContainer>
              </DayContainer>
            </Pressable>
          );
        }}
      />
      {selectedDateHistory && (
        <EntryContainer>
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
        </EntryContainer>
      )}
    </Container>
  );
};

const Container = styled(Card)`
  padding-top: 0;
  overflow: hidden;
  background: white;
`;

const DayContainer = styled.View`
  height: 45px;
  width: 45px;
`;

const DayLabel = styled.Text`
  text-align: center;
  font-size: 10px;
`;

const getDaySize = (p: { thisMonth: boolean; hasEntry: boolean }): string => {
  if (!p.thisMonth) return "16px";
  if (!p.hasEntry) return "16px";
  return "30px";
};

const CountBubbleContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountBubble = styled.View<{
  thisMonth: boolean;
  hasEntry: boolean;
  today: boolean;
}>`
  width: ${(p) => getDaySize(p)};
  height: ${(p) => getDaySize(p)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: ${(p) => {
    if (!p.thisMonth) return p.theme.color.grey;
    if (p.today) return p.theme.color.icon;
    if (!p.hasEntry) return p.theme.color.emptyMain;
    return p.theme.color.main;
  }};
`;

const Count = styled.Text`
  color: white;
`;

const EntryContainer = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
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
