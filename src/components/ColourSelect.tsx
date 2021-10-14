import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { ColourButton } from "./ColourButton";

export const poopColourArr = [
  "#E4BD81",
  "#C1934D",
  "#886531",
  "#5F442C",
  "#565B48",
  "#423B38",
];

interface Props {
  colour: boolean[];
  setColour: (colour: boolean[]) => void;
}

export const ColourSelect = (props: Props) => {
  const { colour, setColour } = props;

  return (
    <Card>
      <Text>Select Colour(s)</Text>
      <Buttons>
        {poopColourArr.map((poopColour, index) => (
          <ColourButton
            buttonColour={poopColour}
            key={index}
            onPress={() => {
              const newColour = [...colour];
              newColour[index]
                ? (newColour[index] = false)
                : (newColour[index] = true);
              setColour(newColour);
            }}
            selected={colour[index]}
          />
        ))}
      </Buttons>
    </Card>
  );
};

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 0 0;
`;
