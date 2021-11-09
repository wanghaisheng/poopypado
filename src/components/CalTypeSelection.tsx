import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontText } from "./FontText";

interface Props {
  typeSelected: number;
  onSelect: (typeSelected: number) => void;
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

  return (
    <Container>
      <ScrollContent horizontal showsHorizontalScrollIndicator={false}>
        {typeOptions.map((typeOption, index) => (
          <TouchableOpacity
            key={typeOption}
            onPress={() => {
              onSelect(index);
            }}
            activeOpacity={0.5}
          >
            <ButtonContainer typeSelected={typeSelected} index={index}>
              <Content typeSelected={typeSelected} index={index}>
                <FontText weight={500}>{typeOption}</FontText>
              </Content>
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
  margin: 0 8px;
`;

const ButtonContainer = styled.View<{
  typeSelected: number;
  index: number;
}>`
  background: ${(p) =>
    p.typeSelected === p.index ? p.theme.color.icon : "#ededed"};
  padding: 7px 12px;
  border-radius: 50px;
  margin-right: 3px;
`;

const Content = styled.Text<{
  typeSelected: number;
  index: number;
}>`
  font-size: 13px;
  color: ${(p) =>
    p.typeSelected === p.index ? p.theme.color.foreground : "#9F9F9F"};
`;
