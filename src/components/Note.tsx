import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { SettingTextStyle } from "./SettingTextStyle";

import { Card } from "./Card";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export const Note = (props: Props) => {
  const { value, setValue } = props;
  return (
    <Card>
      <Text>
        {" "}
        <SettingTextStyle type="Instruction"> Notes</SettingTextStyle>
      </Text>
      <TextArea
        value={value}
        onChangeText={setValue}
        multiline
        textAlignVertical="top"
        placeholder="Add Description"
      />
    </Card>
  );
};

const TextArea = styled.TextInput`
  min-height: 120px;
  padding: 12px;
  border: 1px solid grey;
  border-radius: 3px;
  margin: 10px 0 0 0;
`;
