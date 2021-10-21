import React, { FC } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontText } from "./FontText";

import styled from "styled-components/native";

interface Props {
  onPress: () => void;
}

export const PillButton: FC<Props> = (props) => {
  const { children, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Container>
        <Content>
          <FontText weight={400}>{children}</FontText>
        </Content>
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View`
  background: ${(p) => p.theme.color.main};
  padding: 12px 27px;
  border-radius: 50px;
  align-self: center;
`;

const Content = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${(p) => p.theme.color.foreground};
`;
