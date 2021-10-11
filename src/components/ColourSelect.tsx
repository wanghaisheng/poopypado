import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { ColourButton } from "./ColourButton";

export const poopColourArr = [
  "red",
  "purple",
  "blue",
  "green",
  "yellow",
  "orange",
];

interface Props {
  colour: boolean[];
  setColour: (colour: boolean[]) => void;
}

export const ColourSelect = (props: Props) => {
  const { colour, setColour } = props;

  return (
    <Card>
      <Content>
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
      </Content>
    </Card>
  );
};

const Content = styled.View``;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
