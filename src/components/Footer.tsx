import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Icon } from "./Icon";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "./theme";

interface Props {}

export const Footer = (props: Props) => {
  return (
    <Container>
      <HelpContainer>
        <Pressable>
          <AntDesign name="questioncircle" size={39} color={theme.color.icon} />
        </Pressable>
      </HelpContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 60px;
  background: ${(p) => p.theme.color.foreground};
`;

const HelpContainer = styled.View`
  position: absolute;
  right: 26px;
  top: 8px;
`;
