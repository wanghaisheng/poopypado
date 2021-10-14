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
              Yes
            </SquareButton>
            <SquareButton onPress={onCancel}>No</SquareButton>
          </ButtonGroup>
        </ThickCard>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled(BlurView)`
  flex: 1;
  padding-top: 50%;
`;

const ThickCard = styled(Card)`
  padding: 80px 0;
  margin: 0 25px;
  align-items: center;
`;

const Prompt = styled.Text`
  font-size: 25px;
  text-align: center;
  margin-bottom: 25px;
`;

const ButtonGroup = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-around;
`;
