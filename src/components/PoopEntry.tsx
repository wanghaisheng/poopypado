import { format } from "date-fns";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { amountSizes } from "./AmountSlider";
import { ColorBox } from "./ColorBox";
import { poopColourArr } from "./ColourSelect";
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

  const hasTypeEntry = entry.type?.filter((t) => t).length || 0 !== 0;
  const hasColorEntry = entry.color?.filter((t) => t).length || 0 !== 0;

  return (
    <Container>
      <InfoContainer>
        <InfoRow>
          <Label>Time: </Label>
          <Text>{format(entry.date, "HH:mm dd/MM/yyyy")}</Text>
        </InfoRow>

        {hasTypeEntry && (
          <>
            <Spacer size="8" />
            <InfoRow>
              <Label>Type: </Label>
              <Text>
                {entry.type
                  .map((selected, i) => {
                    return selected ? `${typeInfoArr[i].title}` : "";
                  })
                  .filter((info) => !!info)
                  .join(", ")}
              </Text>
            </InfoRow>
          </>
        )}

        {hasColorEntry && (
          <>
            <Spacer size="8" />
            <InfoRow>
              <Label>Color: </Label>
              <ColorBoxContainer>
                {entry.color.map((selected, i) => {
                  if (!selected) return undefined;

                  const poopColor = poopColourArr[i];
                  return (
                    <ColorBoxStyled
                      key={poopColor}
                      backgroundColour={poopColor}
                    />
                  );
                })}
              </ColorBoxContainer>
            </InfoRow>
          </>
        )}

        {entry.amount && (
          <>
            <Spacer size="8" />
            <InfoRow>
              <Label>Amount: </Label>
              <Text>{amountSizes[entry.amount - 1]}</Text>
            </InfoRow>
          </>
        )}

        {entry.note ? (
          <>
            <Spacer size="8" />
            <Label>Note: </Label>
            <Spacer size="8" />
            <NoteDisplay>{entry.note}</NoteDisplay>
          </>
        ) : undefined}
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

const InfoRow = styled.View`
  flex-direction: row;
`;

const Label = styled.Text`
  font-weight: 700;
  width: 60px;
  margin-right: 8px;
`;

const ColorBoxContainer = styled.View`
  flex-direction: row;
`;

const ColorBoxStyled = styled(ColorBox)`
  margin-right: 8px;
`;

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
