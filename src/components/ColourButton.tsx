import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { ColorBox } from "./ColorBox";

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
        <ColorBox backgroundColour={buttonColour} />
      </SelectedContainer>
    </TouchableOpacity>
  );
};

const SelectedContainer = styled.View<{ selected: boolean }>`
  height: 52px;
  width: 52px;
  border-radius: 2px;
  background: ${(p) =>
    p.selected ? p.theme.color.background : p.theme.color.foreground};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
