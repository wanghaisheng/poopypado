import React from "react";
import { Text, View } from "react-native";

import { Card } from "./Card";
import { TypeButton } from "./TypeButton";

interface Props {
  type: boolean[];
  onTypeSelect: (type: boolean[]) => void;
}

export const typeInfoArr = [
  { title: "Type 1", description: "Small, hard and difficult to pass" },
  { title: "Type  2", description: "Sausage-shaped but lumpy" },
  { title: "Type  3", description: "Sausage-shaped but cracked" },
  { title: "Type  4", description: "Sausage-shaped, smooth and soft" },
  { title: "Type  5", description: "Small and soft with defined edges" },
  {
    title: "Type  6",
    description: "Very small, fluffy/mushy pieces with ragged edges",
  },
  { title: "Type  7", description: "watery with no solid pieces" },
];

export const TypeSelect = (props: Props) => {
  const { onTypeSelect, type } = props;

  return (
    <Card>
      <View>
        <Text>Select Type(s)</Text>
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
      </View>
    </Card>
  );
};
