import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { TypeButton } from "./TypeButton";

interface Props {
  type: number[];
  onTypeSelect: (type: number[]) => void;
}

export const TypeSelect = (props: Props) => {
  const { onTypeSelect, type } = props;

  const typeInfo = [
    { heading: "Type 1", description: "Small, hard and difficult to pass" },
    { heading: "Type  2", description: "Sausage-shaped but lumpy" },
    { heading: "Type  3", description: "Sausage-shaped but cracked" },
    { heading: "Type  4", description: "Sausage-shaped, smooth and soft" },
    { heading: "Type  5", description: "Small and soft with defined edges" },
    {
      heading: "Type  6",
      description: "Very small, fluffy/mushy pieces with ragged edges",
    },
    { heading: "Type  7", description: "watery with no solid pieces" },
  ];

  return (
    <Card>
      <Content>
        <Text>Select Type(s)</Text>
        {typeInfo.map((value, index) => (
          <TypeButton
            selected={type.includes(index)}
            onPress={() => {
              const newType = [...type, index];
              onTypeSelect(newType);
            }}
            {...value}
          />
        ))}
      </Content>
    </Card>
  );
};

const Content = styled.View``;

const TypeContent = styled.View`
  height: 68px;
`;
