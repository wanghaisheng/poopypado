import { format } from "date-fns";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { Poop } from "./history";
import { Icon } from "./Icon";
import { Spacer } from "./Spacer";
import { typeInfoArr } from "./TypeSelect";

interface Props {
  entry: Poop;
  onEdit: (entry: Poop) => void;
  onDelete: (id: string) => void;
}

export const PoopEntry = (props: Props) => {
  const { entry, onEdit, onDelete } = props;

  const hasTypeEntry = entry.type.filter((t) => t).length !== 0;

  return (
    <Container>
      <InfoContainer>
        <Text>time: {format(entry.date, "HH:mm dd/MM/yyyy")}</Text>

        {hasTypeEntry && (
          <>
            <Spacer size="8" />
            <Text>
              type:{" "}
              {entry.type
                .map((selected, i) => {
                  console.log("selected: ", selected);
                  return selected ? `${typeInfoArr[i].title}` : "";
                })
                .filter((info) => !!info)
                .join(", ")}
            </Text>
          </>
        )}

        {entry.amount && (
          <>
            <Spacer size="8" />
            <Text>amount: {entry.amount}</Text>
          </>
        )}

        {entry.note && (
          <>
            <Spacer size="8" />
            <Text>note:</Text>
            <NoteDisplay>{entry.note}</NoteDisplay>
          </>
        )}
        <Spacer size="12" />
      </InfoContainer>

      <ActionContainer>
        <TrashIconContainer>
          <Icon
            name="trash-alt"
            onPress={() => onDelete(entry.id.toString())}
          />
        </TrashIconContainer>
        <Icon
          name="edit"
          onPress={() => {
            onEdit(entry);
          }}
        />
      </ActionContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const InfoContainer = styled.View``;

const NoteDisplay = styled.Text`
  min-height: 120px;
  padding: 12px;
  border-radius: 3px;
  background: white;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TrashIconContainer = styled.View`
  margin-right: 36px;
`;
