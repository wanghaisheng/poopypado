import format from "date-fns/format";
import React from "react";
import { CalendarList } from "react-native-calendars";
import styled from "styled-components/native";

import { Poop } from "./history";

interface Props {
  history: Poop[];
  onVisibleMonthChange: (date: Date) => void;
}

export const Calendar = (props: Props) => {
  const { history, onVisibleMonthChange } = props;

  const counts = historyToCounts(history);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return (
    <CalendarList
      onVisibleMonthsChange={(months) => {
        onVisibleMonthChange(new Date(months[0].dateString));
      }}
      dayComponent={({ date }) => {
        const count = counts[date.dateString];
        return (
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
        );
      }}
      futureScrollRange={3}
      scrollEnabled
      showScrollIndicator
      firstDay={1}
    />
  );
};

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
