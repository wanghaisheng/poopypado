import { format, isThisMonth } from "date-fns";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

interface Props {
  date: Date;
}

export const MonthHeader = (props: Props) => {
  const { date } = props;
  return (
    <Text>
      <Month thisMonth={isThisMonth(date)}>{format(date, "MMMM")} </Month>
      <Year>{format(date, "yyyy")}</Year>
    </Text>
  );
};

const Month = styled.Text<{ thisMonth: boolean }>`
  font-size: 26px;
  color: ${(p) => (p.thisMonth ? p.theme.color.main : "#7297CD")};
`;

const Year = styled.Text`
  font-size: 26px;
`;
