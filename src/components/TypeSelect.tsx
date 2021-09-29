import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { theme } from "./theme";

export const TypeSelect = () => {
  return (
    <Card>
      <Text>Select an Amount</Text>
    </Card>
  );
};

const Labels = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
