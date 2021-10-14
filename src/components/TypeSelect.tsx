import React from "react";
import { Text, View } from "react-native";

import { Card } from "./Card";
import { TypeButton } from "./TypeButton";
import styled from "styled-components/native";

interface Props {
  type: boolean[];
  onTypeSelect: (type: boolean[]) => void;
}

export const typeInfoArr = [
  { title: "Type 1", description: "Small, hard, separate lumps" },
  { title: "Type  2", description: "Sausage-shaped and lumpy" },
  {
    title: "Type  3",
    description: "Sausage-shaped with cracks over the surface",
  },
  { title: "Type  4", description: "Smooth and soft, Sausage-shaped, " },
  { title: "Type  5", description: "Small and soft blobs with defined edges" },
  {
    title: "Type  6",
    description: "Fluffy/mushy pieces with ragged edges",
  },
  { title: "Type  7", description: "Watery consistency with no solid pieces" },
];

export const TypeSelect = (props: Props) => {
  const { onTypeSelect, type } = props;

  return (
    <Card>
      <Text>Select Type(s)</Text>
      <ButtonContainer>
        {typeInfoArr.map((typeInfo, index) => (
          <TypeButton
            selected={type[index]}
            onPress={() => {
              const newType = [...type];
              newType[index]
                ? (newType[index] = false)
                : (newType[index] = true);
              onTypeSelect(newType);
            }}
            {...typeInfo}
            key={index}
          />
        ))}
      </ButtonContainer>
    </Card>
  );
};

const ButtonContainer = styled.View`
  margin: 10px 0 0 0;
`;
