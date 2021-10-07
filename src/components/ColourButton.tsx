import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "react-native";

interface Props {
  buttonColour: string;
  onPress: () => void;
  selected: boolean;
}

export const ColourButton: FC<Props> = (props) => {
  const { buttonColour, onPress, selected } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <SelectedContainer selected={selected}>
        <Container backgroundColour={buttonColour} />
      </SelectedContainer>
    </TouchableOpacity>
  );
};

const Container = styled.View<{ backgroundColour: string }>`
  background:${(p) => p.backgroundColour}
  height: 40px;
  width: 40px
  border-style: solid;
  border-radius: 2px; 
`;

const SelectedContainer = styled.View<{ selected: boolean }>`
  height: 52px;
  width: 52px;
  border-radius: 2px;
  background:${(p) =>
    p.selected ? p.theme.color.background : p.theme.color.foreground}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
