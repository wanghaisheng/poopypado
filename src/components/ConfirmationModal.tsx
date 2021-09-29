import { BlurView } from "expo-blur";
import React from "react";
import { Modal, View } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";
import { SquareButton } from "./SquareButton";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = (props: Props) => {
  const { visible, onCancel, onConfirm } = props;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay intensity={80} tint="dark">
        <ThickCard>
          <Prompt>Exit without saving?</Prompt>
          <ButtonGroup>
            <SquareButton color="icon" onPress={onConfirm}>
              YES
            </SquareButton>
            <SquareButton onPress={onCancel}>NO</SquareButton>
          </ButtonGroup>
        </ThickCard>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled(BlurView)`
  flex: 1;
  justify-content: center;
`;

const ThickCard = styled(Card)`
  padding-top: 90px;
  padding-bottom: 90px;
`;

const Prompt = styled.Text`
  font-size: 30px;
  text-align: center;
  margin-bottom: 45px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
