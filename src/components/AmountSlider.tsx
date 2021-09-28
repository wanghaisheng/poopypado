import Slider from "@react-native-community/slider";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { theme } from "./theme";

interface Props {
  amount: number;
  setAmount: (amount: number) => void;
}

export const AmountSlider = (props: Props) => {
  const { amount, setAmount } = props;
  return (
    <Card>
      <Text>Select an Amount</Text>
      <Slider
        value={amount}
        onValueChange={setAmount}
        minimumValue={1}
        maximumValue={5}
        step={1}
        minimumTrackTintColor={theme.color.main}
        thumbTintColor={theme.color.main}
      />
      <Labels>
        <Text>XS</Text>
        <Text>S</Text>
        <Text>M</Text>
        <Text>L</Text>
        <Text>XL</Text>
      </Labels>
    </Card>
  );
};

const Labels = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
