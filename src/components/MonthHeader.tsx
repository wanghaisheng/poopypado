import { format, isThisMonth } from "date-fns";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface Props {
  date: Date;
}

export const MonthHeader = (props: Props) => {
  const { date } = props;
  return (
    <Container>
      <Month thisMonth={isThisMonth(date)}>{format(date, "MMMM")} </Month>
      <Year>{format(date, "yyyy")}</Year>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: baseline;
  padding-left: 17px;
`;

const Month = styled.Text<{ thisMonth: boolean }>`
  font-size: 25px;
  color: ${(p) => (p.thisMonth ? p.theme.color.main : "#7297CD")};
`;

const Year = styled.Text`
  font-size: 24px;
`;
