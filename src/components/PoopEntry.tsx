import { format } from "date-fns";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { Poop } from "./history";
import { Icon } from "./Icon";
import { Spacer } from "./Spacer";

interface Props {
  entry: Poop;
  onEdit: (entry: Poop) => void;
  onDelete: (id: string) => void;
}

export const PoopEntry = (props: Props) => {
  const { entry, onEdit, onDelete } = props;
  return (
    <Card>
      <Text>id: {entry.id}</Text>
      <Spacer size="8" />
      <Text>time: {format(entry.date, "HH:mm dd/MM/yyyy")}</Text>

      {entry.type && (
        <>
          <Spacer size="8" />
          <Text>
            type: {entry.type.map((selected, i) => (selected ? `${i} ` : ""))}
          </Text>
        </>
      )}

      {entry.type && (
        <>
          <Spacer size="8" />
          <Text>amount: {entry.amount}</Text>
        </>
      )}

      {entry.type && (
        <>
          <Spacer size="8" />
          <Text>note:</Text>
          <NoteDisplay>{entry.note}</NoteDisplay>
        </>
      )}

      <Spacer size="8" />
      <Icon
        name="edit"
        onPress={() => {
          onEdit(entry);
        }}
      />
      <Icon name="trash-alt" onPress={() => onDelete(entry.id.toString())} />
    </Card>
  );
};

const NoteDisplay = styled.Text`
  min-height: 120px;
  padding: 12px;
  border-radius: 3px;
  background: white;
`;
