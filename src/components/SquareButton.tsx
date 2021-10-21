import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

type ThemeColor = keyof DefaultTheme["color"];

interface Props {
  onPress: () => void;
  color?: ThemeColor;
}

export const SquareButton: FC<Props> = (props) => {
  const { color, children, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Container color={color}>
        <Content>{children}</Content>
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View<{ color?: ThemeColor }>`
  background: ${(p) => p.theme.color[p.color ?? "main"]};
  padding: 8px 25px;
  border-radius: 5px;
  align-self: center;
`;

const Content = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
`;
