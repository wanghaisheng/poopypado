import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "./theme";

import styled from "styled-components/native";

import { Card } from "./Card";
import { PillButton } from "./PillButton";
import { Spacer } from "./Spacer";
import { CalTypeSelection } from "./CalTypeSelection";
import { FontText } from "./FontText";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  onNewEntryPress: () => void;
}

export const typeDescription = [
  "Click on a date with an existing entry for more information",
  "Small, hard, separate lumps",
  "Sausage-shaped and lumpy",
  "Sausage-shaped with cracks over the surface",
  "Smooth and soft, Sausage-shaped",
  "Small and soft blobs with defined edges",
  "Fluffy/mushy pieces with ragged edges",
  "Watery consistency with no solid pieces",
];

export const NewEntry = (props: Props) => {
  const { onNewEntryPress } = props;
  const [typeSelected, setType] = useState(0);

  return (
    <Container>
      <CalTypeSelection typeSelected={typeSelected} onSelect={setType} />
      <InstructionContainer>
        <Intruction>
          <FontText weight={500}>{typeDescription[typeSelected]}</FontText>
        </Intruction>
      </InstructionContainer>
      <Spacer size="9" />

      <ButtContainer>
        <TouchableOpacity onPress={onNewEntryPress}>
          <AntDesign name="pluscircle" size={80} color={theme.color.main} />
        </TouchableOpacity>
      </ButtContainer>
    </Container>
  );
};

const Blah = styled.Text``;

const InstructionContainer = styled.View`
  height: 65px;
  width: 100%;
  padding: 5px 15px;
`;

const ButtContainer = styled.View`
  position: absolute;
  bottom: 32px;
  right: 35px;
`;

const Container = styled(Card)`
  flex: 1;
  display: flex;
  margin: 12px 15px;
`;

const Intruction = styled.Text`
  font-size: 14px;
  text-align: left;
  color: #9f9f9f;
`;
