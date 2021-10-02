import { format } from "date-fns";
import React from "react";
import { Text } from "react-native";

import { Card } from "./Card";
import { Poop } from "./history";

interface Props {
  entry: Poop;
}

export const PoopEntry = (props: Props) => {
  const { entry } = props;
  return (
    <Card>
      <Text>{entry.id}</Text>
      <Text>{format(entry.date, "HH:mm dd/MM/yyyy")}</Text>
    </Card>
  );
};
