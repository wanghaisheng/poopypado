import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { Poop } from "./history";
import { PoopEntry } from "./PoopEntry";

interface Props {
  history: Poop[];
  onClose: () => void;
}

export const PoopList = (props: Props) => {
  const { history, onClose } = props;
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
              <Text>LEFT</Text>
            </Pressable>
            <Text>
              Entry {index + 1}/{history.length}
            </Text>
            <Pressable onPress={onRight}>
              <Text>Right</Text>
            </Pressable>
          </Navigation>
        )}
        <Close>
          <Pressable onPress={onClose}>
            <Text>X</Text>
          </Pressable>
        </Close>
      </Header>

      <PoopEntry entry={history[index]} />
    </Container>
  );
};

const Container = styled(Card)``;

const Header = styled.View``;

const Navigation = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Close = styled.View`
  position: absolute;
  right: 0px;
`;
