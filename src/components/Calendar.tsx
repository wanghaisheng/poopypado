import {
  format,
  isFuture,
  isThisMonth,
  isThisYear,
  isToday,
  setHours,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import styled from "styled-components/native";

import { CalTypeSelection } from "./CalTypeSelection";
import { FontText } from "./FontText";
import { Poop, historyDateHash } from "./history";
import { PoopList } from "./PoopList";
import { Spacer } from "./Spacer";
import { theme } from "./theme";

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

const typeDescription = [
  "Click on a Type Button or a date with an existing entry for more information",
  "Small, hard, separate lumps",
  "Sausage-shaped and lumpy",
  "Sausage-shaped with cracks over the surface",
  "Smooth and soft, Sausage-shaped",
  "Small and soft blobs with defined edges",
  "Fluffy/mushy pieces with ragged edges",
  "Watery consistency with no solid pieces",
];

export const Calendar = (props: Props) => {
  const { history, onVisibleMonthChange, onEdit, onDelete, calendarKey } =
    props;

  const [typeSelected, setTypeSelected] = useState(0);

  const counts = historyToCounts(history, typeSelected);

  const dateHash = historyDateHash(history);
  const [selectedDateHistory, setSelectedDateHistory] = useState<Poop[] | null>(
    null
  );

  /**
   * Closes entry on calendar reset
   */
  useEffect(() => {
    setSelectedDateHistory(null);
  }, [calendarKey]);

  return (
    <View>
      <CalendarContainer>
        <CalendarList
          key={calendarKey}
          futureScrollRange={0}
          onVisibleMonthsChange={(months) => {
            const lastIndex = months.length - 1;
            onVisibleMonthChange(new Date(months[lastIndex].dateString));
          }}
          firstDay={1}
          hideArrows
          hideExtraDays
          renderHeader={() => <Text />}
          dayComponent={({ date }) => {
            const count = counts[date.dateString];

            const dayDate = setHours(new Date(date.dateString), 0);
            return (
              <Pressable
                onPress={() => {
                  setSelectedDateHistory(dateHash[date.dateString] ?? null);
                }}
              >
                <DateContainer>
                  <DayLabel>
                    <FontText weight={500}>{date.day}</FontText>
                  </DayLabel>
                  <CountBubbleContainer>
                    <CountBubble
                      hasEntry={count >= 0 ? true : false}
                      thisMonth={isThisYear(dayDate) && isThisMonth(dayDate)}
                      today={isToday(dayDate)}
                      future={isFuture(dayDate)}
                    >
                      <Count>{count > 0 ? count : ""}</Count>
                    </CountBubble>
                  </CountBubbleContainer>
                </DateContainer>
              </Pressable>
            );
          }}
          theme={{
            calendarBackground: theme.color.foreground,
            textDayHeaderFontSize: 12,
          }}
          showScrollIndicator={false}
        />
      </CalendarContainer>

      <Spacer size="12" />

      <CalTypeSelection
        typeSelected={typeSelected}
        onTypeSelect={setTypeSelected}
      />
      <InstructionContainer>
        <Intruction>
          <FontText weight={500}>{typeDescription[typeSelected]}</FontText>
        </Intruction>
      </InstructionContainer>

      {selectedDateHistory && (
        <AbsoluteContainer>
          <EntryContainer>
            <PoopList
              history={selectedDateHistory}
              onClose={() => {
                setSelectedDateHistory(null);
              }}
              onEdit={(entry) => {
                onEdit(entry);
                setSelectedDateHistory(null);
              }}
              onDelete={(id) => {
                onDelete(id);
                setSelectedDateHistory(null);
              }}
            />
          </EntryContainer>
        </AbsoluteContainer>
      )}
    </View>
  );
};

const CalendarContainer = styled.View`
  margin: 0 3px 0 3px;
  height: 350px;
`;

const DateContainer = styled.View`
  height: 47px;
  width: 45px;
`;

const DayLabel = styled.Text`
  text-align: center;
  font-size: 11px;
  color: ${(p) => p.theme.color.icon};
`;

const getDaySize = (p: { future: boolean; hasEntry: boolean }): string => {
  if (p.hasEntry) return "32px";
  if (p.future) return "10px";
  return "25px";
};

const CountBubbleContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountBubble = styled.View<{
  hasEntry: boolean;
  thisMonth: boolean;
  today: boolean;
  future: boolean;
}>`
  width: ${(p) => getDaySize(p)};
  height: ${(p) => getDaySize(p)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: ${(p) => {
    if (p.today) return p.theme.color.icon;

    if (p.thisMonth) {
      if (p.hasEntry) return p.theme.color.main;
      if (p.future) return "#F9D9D9";
      return p.theme.color.emptyMain;
    } else {
      if (p.hasEntry) return "#7297CD";
      return "#C3D0E3";
    }
  }};
`;

const Count = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
`;

const AbsoluteContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const EntryContainer = styled.View`
  width: 100%;
  height: 100%;
`;

/**
 * Matches `date.dateString` prop of `CalendarList`
 * component's `dayComponent` prop
 */
const DATE_STRING_FORMAT = "yyyy-MM-dd";

const historyToCounts = (
  history: Poop[],
  typeSelected: number
): Record<string, number> => {
  let counts: Record<string, number> = {};
  history.forEach((h) => {
    const date = format(h.date, DATE_STRING_FORMAT);
    if (counts[date] === undefined) counts[date] = 0;
    if (typeSelected === 0) counts[date] += 1;
    if (typeSelected && h.type[typeSelected - 1]) counts[date] += 1;
  });
  return counts;
};

const InstructionContainer = styled.View`
  height: 65px;
  width: 100%;
  padding: 8px 10px;
`;

const Intruction = styled.Text`
  font-size: 13px;
  text-align: left;
  color: #9f9f9f;
`;
