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
          <PromptContainer>
            <Prompt>Exit without saving?</Prompt>
          </PromptContainer>
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
  padding-top: 55%;
`;

const ThickCard = styled(Card)`
  padding: 48px 0;
  margin: 0 28px;
  align-items: center;
`;

const PromptContainer = styled.View`
  width: 85%;
`;

const Prompt = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
`;

const ButtonGroup = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-around;
`;
