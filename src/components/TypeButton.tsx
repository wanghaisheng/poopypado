import React, { FC } from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import styled from "styled-components/native";

interface Props {
  onPress: () => void;
  selected: boolean;
  title: string;
  description: string;
  imgSource: ImageSourcePropType;
}

export const TypeButton: FC<Props> = (props) => {
  const { onPress, title, description, selected, imgSource } = props;
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
        <TypeImage source={imgSource} />
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View<{ selected: boolean }>`
  background: ${(p) =>
    p.selected ? p.theme.color.background : p.theme.color.foreground};
  height: 73px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 8px 10px 7px;
`;

export const TypeImage = styled.Image`
  width: 65px;
  height: 65px;
  resize-mode: contain;
`;

const TextContainer = styled.View`
  width: 75%;
`;
const TypeName = styled.Text`
  font-weight: 700;
  color: #4e4e55;
  font-size: 15px;
`;

const TypeDescription = styled.Text`
  color: #4e4e55;
  font-size: 14px;
`;
