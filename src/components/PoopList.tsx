import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { Poop } from "./history";
import { Icon } from "./Icon";
import { PoopEntry } from "./PoopEntry";

interface Props {
  history: Poop[];
  onClose: () => void;
  onEdit: (entry: Poop) => void;
  onDelete: (id: string) => void;
}

export const PoopList = (props: Props) => {
  const { history, onClose, onEdit, onDelete } = props;
  const [index, setIndex] = useState(0);
  const hasManyEntries = history.length > 1;

  const onLeft = () => {
    setIndex(index === 0 ? history.length - 1 : index - 1);
  };
  const onRight = () => {
    setIndex(index === history.length - 1 ? 0 : index + 1);
  };

  return (
    <Container>
      <Header>
        {hasManyEntries && (
          <Navigation>
            <Pressable onPress={onLeft}>
              <Icon name="angle-left" />
            </Pressable>
            <EntryText>
              Entry {index + 1}/{history.length}
            </EntryText>
            <Pressable onPress={onRight}>
              <Icon name="angle-right" />
            </Pressable>
          </Navigation>
        )}
        <Close>
          <Pressable onPress={onClose}>
            <Icon name="times" />
          </Pressable>
        </Close>
      </Header>
      <PoopEntry entry={history[index]} onEdit={onEdit} onDelete={onDelete} />
    </Container>
  );
};

const Container = styled(Card)`
  width: 100%;
  height: 100%;
`;

const Header = styled.View``;

const Navigation = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const EntryText = styled.Text`
  font-size: 18px;
  margin: 0 8px;
`;

const Close = styled.View`
  position: absolute;
  right: 0;
`;
