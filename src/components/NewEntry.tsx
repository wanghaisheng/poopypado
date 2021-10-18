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
        <Intruction>
          <BoldText>Hint:</BoldText> Click on a date with an existing entry for
          more information!
        </Intruction>
      </InstructionContainer>
      <Spacer size="9" />
      <PillButton onPress={onNewEntryPress}>New Entry</PillButton>
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
  color: ${(p) => p.theme.color.icon};
`;

const BoldText = styled.Text`
  font-weight: 700;
`;
