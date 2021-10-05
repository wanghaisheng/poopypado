import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

interface Props {}

export const Footer = (props: Props) => {
  return (
    <Container>
      <Text>FOOTER</Text>
    </Container>
  );
};

const Container = styled.View`
  height: 60px;
  background: white;
`;
