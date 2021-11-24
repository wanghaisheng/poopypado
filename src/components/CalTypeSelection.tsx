import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontText } from "./FontText";

interface Props {
  typeSelected: number;
  onTypeSelect: (typeSelected: number) => void;
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
  const { typeSelected, onTypeSelect } = props;

  return (
    <Container>
      <ScrollContent horizontal showsHorizontalScrollIndicator={false}>
        {typeOptions.map((typeOption, index) => (
          <TouchableOpacity
            key={typeOption}
            onPress={() => {
              onTypeSelect(index);
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

const Container = styled.View`
  margin: 5px 3px 0 3px;
`;
const ScrollContent = styled.ScrollView`
  height: 37px;
  padding-top: 3px;
  padding-left: 1px;
`;

const ButtonContainer = styled.View<{
  typeSelected: number;
  index: number;
}>`
  background: ${(p) =>
    p.typeSelected === p.index ? p.theme.color.icon : "#ededed"};
  padding: 6px 12px;
  border-radius: 60px;
  margin-right: 3px;
  elevation: 2;
`;

const Content = styled.Text<{
  typeSelected: number;
  index: number;
}>`
  font-size: 13px;
  color: ${(p) =>
    p.typeSelected === p.index ? p.theme.color.foreground : "#9F9F9F"};
`;
