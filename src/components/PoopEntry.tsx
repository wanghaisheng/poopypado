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

  const hasTypeEntry = entry.type?.filter((t) => t).length || 0 !== 0;
  const hasColorEntry = entry.color?.filter((t) => t).length || 0 !== 0;

  return (
    <Container>
      <InfoContainer>
        <InfoRow>
          <Label>Time: </Label>
          <Text>{format(entry.date, "dd MMM yyyy, h:mm a")}</Text>
        </InfoRow>

        {hasTypeEntry && (
          <>
            <Spacer size="8" />
            <InfoRow>
              <Label>Type: </Label>
              <Row>
                {entry.type.map((selected, i) => {
                  if (!selected) return undefined;
                  const typeInfo = typeInfoArr[i];
                  return (
                    <TypeImageStyled
                      key={typeInfo.title}
                      source={typeInfo.imgSource}
                    />
                  );
                })}
              </Row>
            </InfoRow>
          </>
        )}

        {hasColorEntry && (
          <>
            <Spacer size="8" />
            <InfoRow>
              <Label>Color: </Label>
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
            <NoteContainer>
              {entry.note.split("\n").map((line, i) => (
                <Text key={i}>{line}</Text>
              ))}
            </NoteContainer>
          </>
        ) : undefined}
        <Spacer size="12" />
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

const Label = styled.Text`
  font-weight: 700;
  width: 60px;
  margin-right: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const TypeImageStyled = styled(TypeImage)`
  margin-right: 4px;
  width: 30px;
  height: 30px;
`;

const ColorBoxStyled = styled(ColorBox)`
  margin-right: 4px;
  height: 30px;
  width: 30px;
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
