import React from "react";
import { Text } from "react-native";

import { Card } from "./Card";
import { PillButton } from "./PillButton";

interface Props {
  onNewEntryPress: () => void;
}

export const NewEntry = (props: Props) => {
  const { onNewEntryPress } = props;

  return (
    <Card>
      <Text>Hint: Click on a date for more information</Text>
      <PillButton onPress={onNewEntryPress}>New Poop</PillButton>
    </Card>
  );
};
