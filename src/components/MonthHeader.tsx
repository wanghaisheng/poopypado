import { format } from "date-fns";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { FontText } from "./FontText";

interface Props {
  date: Date;
}

export const MonthHeader = (props: Props) => {
  const { date } = props;
  return (
    <Container>
      <FontText weight={500}>
        <Month>{format(date, "MMMM")} </Month>
        <Year>{format(date, "yyyy")}</Year>
      </FontText>
      <FontText weight={400}></FontText>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: baseline;
  padding-left: 27px;
  position: absolute;
  bottom: 5px;
`;

const Month = styled.Text`
  font-size: 20px;
  color: ${(p) => p.theme.color.icon};
`;

const Year = styled.Text`
  font-size: 19px;
  color: ${(p) => p.theme.color.icon};
`;
