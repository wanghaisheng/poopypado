import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { TypeButton } from "./TypeButton";
import { SettingTextStyle } from "./SettingTextStyle";

interface Props {
  type: boolean[];
  onTypeSelect: (type: boolean[]) => void;
}

/**
 * Poop types information based on Bristol Stool Chart
 *
 * @see https://vignette.wikia.nocookie.net/house/images/2/21/Bristol_stool_chart.svg/revision/latest?cb=20110823023517
 */
export const typeInfoArr = [
  {
    title: "Type 1",
    description: "Small, hard, separate lumps",
    imgSource: require("../../assets/types/type-1.png"),
  },
  {
    title: "Type  2",
    description: "Sausage-shaped and lumpy",
    imgSource: require("../../assets/types/type-2.png"),
  },
  {
    title: "Type  3",
    description: "Sausage-shaped with cracks over the surface",
    imgSource: require("../../assets/types/type-3.png"),
  },
  {
    title: "Type  4",
    description: "Smooth and soft, Sausage-shaped",
    imgSource: require("../../assets/types/type-4.png"),
  },
  {
    title: "Type  5",
    description: "Small and soft blobs with defined edges",
    imgSource: require("../../assets/types/type-5.png"),
  },
  {
    title: "Type  6",
    description: "Fluffy/mushy pieces with ragged edges",
    imgSource: require("../../assets/types/type-6.png"),
  },
  {
    title: "Type  7",
    description: "Watery consistency with no solid pieces",
    imgSource: require("../../assets/types/type-7.png"),
  },
];

export const TypeSelect = (props: Props) => {
  const { onTypeSelect, type } = props;

  return (
    <TypeCard>
      <TextCard>
        <Text>
          <SettingTextStyle type="Instruction">Select Type(s)</SettingTextStyle>
        </Text>
      </TextCard>
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
    </TypeCard>
  );
};

const TypeCard = styled(Card)`
  padding-left: 12px;
  padding-right: 12px;
`;

const TextCard = styled.View`
  padding-left: 8px;
`;

const ButtonContainer = styled.View`
  margin: 10px 0 0 0;
`;
