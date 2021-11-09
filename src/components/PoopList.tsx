import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { Poop } from "./history";
import { Icon } from "./Icon";
import { PoopEntry } from "./PoopEntry";
import { Spacer } from "./Spacer";

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

  const goPrevEntry = () => {
    setIndex(index === 0 ? history.length - 1 : index - 1);
  };
  const goNextEntry = () => {
    setIndex(index === history.length - 1 ? 0 : index + 1);
  };

  return (
    <Container>
      <Header>
        {hasManyEntries && (
          <Navigation>
            <Icon onPress={goPrevEntry} name="angle-left" />
            <EntryText>
              Entry {index + 1}/{history.length}
            </EntryText>
            <Icon onPress={goNextEntry} name="angle-right" />
          </Navigation>
        )}
        <Close>
          <Icon name="times" onPress={onClose} />
        </Close>
      </Header>
      <Spacer size="24" />
      <PoopEntry entry={history[index]} onEdit={onEdit} onDelete={onDelete} />
    </Container>
  );
};

const Container = styled(Card)`
  flex: 1;
  background: #f5f5f5;
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
