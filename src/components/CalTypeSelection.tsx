import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface Props {
  typeSelected: number;
  onSelect: (type: boolean[]) => void;
}

export const typeOptions = [
  "All",
  "Type 1",
  "Type 2",
  "Type 3",
  "Type 4",
  "Type 5",
  "Type 6",
  "Type 7",
];

export const CalTypeSelection = (props: Props) => {
  const { typeSelected, onSelect } = props;
  console.log(typeSelected);

  return (
    <Container>
      <ScrollContent horizontal>
        {typeOptions.map((typeOption, index) => (
          <TouchableOpacity
            key={typeOption}
            onPress={() => {}}
            activeOpacity={0.5}
          >
            <ButtonContainer typeSelected={typeSelected} index={index}>
              <Content>{typeOption}</Content>
            </ButtonContainer>
          </TouchableOpacity>
        ))}
      </ScrollContent>
    </Container>
  );
};

const ScrollContent = styled.ScrollView``;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px 0 20px;
`;

const ButtonContainer = styled.View<{
  typeSelected: number;
  index: number;
}>`
  background: ${(p) => (p.typeSelected === p.index ? "#CDCDCD" : "#ededed")};
  padding: 5px 10px;
  border-radius: 50px;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const Content = styled.Text`
  font-size: 14px;
  color: #626262;
`;
