import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { theme } from "./theme";

export const TypeSelect = () => {
  return (
    <Card>
      <Content>
        <Text>Select Type(s)</Text>
      </Content>
    </Card>
  );
};

const Content = styled.View`
  display: flex;
  flex-direction: Colomn;
  justify-content: space-between;
`;
