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
import { TypeImage } from "./TypeButton";
import { typeInfoArr } from "./TypeSelect";

interface Props {
  entry: Poop;
  onEdit: (entry: Poop) => void;
  onDelete: (id: string) => void;
}

export const PoopEntry = (props: Props) => {
  const { entry, onEdit, onDelete } = props;

  const hasColorEntry = entry.color?.filter((t) => t).length || 0 !== 0;

  return (
    <Container>
      <InfoContainer>
        <InfoRow>
          <FixedEntry>
            <Label>{format(entry.date, "dd MMM yyyy")}</Label>
            <TextInfo>{format(entry.date, "h:mm")}</TextInfo>
            <TextInfo>{format(entry.date, "a")}</TextInfo>
          </FixedEntry>
          <Entry>
            <Label>Type</Label>
            <Row>
              {entry.type.map((selected, i) => {
                const typeInfo = typeInfoArr[i];
                return (
                  <TypeImageStyled
                    key={typeInfo.title}
                    source={typeInfo.imgSource}
                    selected={selected}
                  />
                );
              })}
            </Row>
          </Entry>
        </InfoRow>

        <Spacer size="6" />

        <InfoRow>
          <FixedEntry>
            <Label>Amount</Label>
            <TextInfo>{amountSizes[entry.amount - 1]}</TextInfo>
          </FixedEntry>

          {hasColorEntry && (
            <Entry>
              <Label>Colour</Label>
              <Row>
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
              </Row>
            </Entry>
          )}
        </InfoRow>

        <Spacer size="12" />

        <Entry>
          <Label>Notes</Label>
          <NoteContainer>
            {entry.note.split("\n").map((line, i) => (
              <Text key={i}>{line}</Text>
            ))}
          </NoteContainer>
          <Spacer size="12" />
        </Entry>
      </InfoContainer>

      <ActionContainer>
        <TrashIconContainer>
          <Icon
            name="trash-alt"
            size={19}
            onPress={() => onDelete(entry.id.toString())}
          />
        </TrashIconContainer>
        <Icon
          name="edit"
          size={19}
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
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const InfoRow = styled.View`
  flex-direction: row;
`;

const FixedEntry = styled.View`
  width: 84px;
`;

const Entry = styled.View`
  flex-shrink: 1;
  flex-grow: 1;
`;

const Label = styled.Text`
  font-size: 12px;
  margin-bottom: 8px;
`;

const TextInfo = styled.Text`
  font-size: 25px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const TypeImageStyled = styled(TypeImage)<{ selected: boolean }>`
  margin-right: 4px;
  margin-bottom: 4px;
  width: 40px;
  height: 40px;
  opacity: ${(p) => (p.selected ? 1 : 0.2)};
`;

const ColorBoxStyled = styled(ColorBox)`
  margin-right: 4px;
  margin-bottom: 4px;
  height: 40px;
  width: 40px;
`;

const NoteContainer = styled.ScrollView`
  flex: 1 1 60px;
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
