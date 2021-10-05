import React from "react";
import styled from "styled-components/native";

import { Card } from "./Card";
import { PillButton } from "./PillButton";

interface Props {
  onNewEntryPress: () => void;
}

export const NewEntry = (props: Props) => {
  const { onNewEntryPress } = props;

  return (
    <Container>
      <Intruction>Hint: Click on a date for more information</Intruction>
      <PillButton onPress={onNewEntryPress}>New Poop</PillButton>
    </Container>
  );
};

const Container = styled(Card)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Intruction = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;
