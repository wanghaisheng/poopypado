import Slider from "@react-native-community/slider";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { SettingTextStyle } from "./SettingTextStyle";

import { Card } from "./Card";
import { theme } from "./theme";

export const amountSizes = ["XS", "S", "M", "L", "XL"];

interface Props {
  amount: number;
  setAmount: (amount: number) => void;
}

export const AmountSlider = (props: Props) => {
  const { amount, setAmount } = props;
  return (
    <Card>
      <Text>
        <SettingTextStyle type="Instruction">Select an Amount</SettingTextStyle>
      </Text>
      <Content>
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
          <Text>
            <SettingTextStyle type="AmountSliderText">XS</SettingTextStyle>
          </Text>
          <Text>
            <SettingTextStyle type="AmountSliderText">S</SettingTextStyle>
          </Text>
          <Text>
            <SettingTextStyle type="AmountSliderText">M</SettingTextStyle>
          </Text>
          <Text>
            <SettingTextStyle type="AmountSliderText">L</SettingTextStyle>
          </Text>
          <Text>
            <SettingTextStyle type="AmountSliderText">XL</SettingTextStyle>
          </Text>
        </Labels>
      </Content>
    </Card>
  );
};

const Labels = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.View`
  margin: 10px 0 0 0;
`;
