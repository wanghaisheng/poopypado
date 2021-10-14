import React from "react";
import styled from "styled-components/native";

import { Card } from "./Card";
import { PillButton } from "./PillButton";
import { Spacer } from "./Spacer";

interface Props {
  onNewEntryPress: () => void;
}

export const NewEntry = (props: Props) => {
  const { onNewEntryPress } = props;

  return (
    <Container>
      <InstructionContainer>
        <Intruction>Hint: Click on a date for more information</Intruction>
      </InstructionContainer>
      <Spacer size="8" />
      <PillButton onPress={onNewEntryPress}>New Poop</PillButton>
    </Container>
  );
};

const InstructionContainer = styled.View`
  height: 65px;
  width: 80%;
`;

const Container = styled(Card)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 15px;
`;

const Intruction = styled.Text`
  font-size: 15px;
  margin-bottom: 8px;
  text-align: center;
`;
