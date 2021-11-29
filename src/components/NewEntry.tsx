import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { FontText } from "./FontText";
import { theme } from "./theme";

interface Props {
  onNewEntryPress: () => void;
  entryCount: number;
}

export const NewEntry = (props: Props) => {
  const { onNewEntryPress, entryCount } = props;

  return (
    <Container>
      <EntryInfo>
        <Numerator>
          <FontText weight={500}>{entryCount}</FontText>
        </Numerator>
        <Denomenator>
          <FontText weight={500}>Entries in the Last 30 Days</FontText>
        </Denomenator>
      </EntryInfo>
      <ButtContainer>
        <TouchableOpacity onPress={onNewEntryPress}>
          <AntDesign name="pluscircle" size={77} color={theme.color.main} />
        </TouchableOpacity>
      </ButtContainer>
    </Container>
  );
};

const EntryInfo = styled.View`
  position: absolute;
  bottom: 10%;
  left: 5%;
  width: 100px;
`;
const Numerator = styled.Text`
  font-size: 70px;
  color: ${(p) => p.theme.color.icon};
  position: absolute;
  bottom: 68%;
  left: -5px;
`;
const Denomenator = styled.Text`
  font-size: 15px;
  color: ${(p) => p.theme.color.icon};
`;

const ButtContainer = styled.View`
  position: absolute;
  bottom: 11%;
  right: 7%;
  elevation: 2;
  border-radius: 50px;
  background: ${(p) => p.theme.color.foreground};
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  margin: 12px 15px;
`;
