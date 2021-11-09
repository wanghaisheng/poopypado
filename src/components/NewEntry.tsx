import React, { useState } from "react";
import styled from "styled-components/native";

import { Card } from "./Card";
import { PillButton } from "./PillButton";
import { Spacer } from "./Spacer";
import { CalTypeSelection } from "./CalTypeSelection";
import { FontText } from "./FontText";

interface Props {
  onNewEntryPress: () => void;
}

export const NewEntry = (props: Props) => {
  const { onNewEntryPress } = props;
  const [typeSelected, setType] = useState(0);

  return (
    <Container>
      <CalTypeSelection typeSelected={typeSelected} onSelect={setType} />
      <InstructionContainer>
        <Intruction>
          <FontText weight={500}>
            Click on a date with an existing entry for more information
          </FontText>
        </Intruction>
      </InstructionContainer>
      <Spacer size="9" />

      <PillButton onPress={onNewEntryPress}>New Entry</PillButton>
    </Container>
  );
};

const InstructionContainer = styled.View`
  height: 65px;
  width: 90%;
  padding-top: 10px;
`;

const Container = styled(Card)`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 12px 15px;
`;

const Intruction = styled.Text`
  font-size: 14px;
  text-align: left;
  color: #7a7a7a;
`;
