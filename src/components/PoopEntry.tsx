import { format } from "date-fns";
import React from "react";
import { Text } from "react-native";

import { Card } from "./Card";
import { Poop } from "./history";
import { Icon } from "./Icon";

interface Props {
  entry: Poop;
  onDelete: (id: string) => void;
}

export const PoopEntry = (props: Props) => {
  const { entry, onDelete } = props;
  return (
    <Card>
      <Text>{entry.id}</Text>
      <Text>{format(entry.date, "HH:mm dd/MM/yyyy")}</Text>
      <Icon name="trash-alt" onPress={() => onDelete(entry.id.toString())} />
    </Card>
  );
};
