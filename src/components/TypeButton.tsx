import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "react-native";

interface Props {
  onPress: () => void;
  selected: boolean;
  title: string;
  description: string;
}

export const TypeButton: FC<Props> = (props) => {
  const { onPress, title, description, selected } = props;
  console.log(selected);
  return (
    <TouchableOpacity onPress={onPress}>
      <Container selected={selected}>
        <TextContainer>
          <TypeName>
            <Text>{title}</Text>
          </TypeName>
          <TypeDescription>
            <Text>{description}</Text>
          </TypeDescription>
        </TextContainer>
        <TypePicture></TypePicture>
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View<{ selected: boolean }>`
  background:${(p) => (p.selected ? "red" : "white")}
  height: 68px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TypePicture = styled.View`
  background: grey;
  width: 65px;
  height: 60px;
  margin-top: 2px;
`;

const TextContainer = styled.View`
  width: 75%;
`;
const TypeName = styled.Text`
  font-weight: bold;
  color: #4e4e55;
  font-size: 17px;
`;

const TypeDescription = styled.Text`
  color: #4e4e55;
  font-size: 16px;
`;
