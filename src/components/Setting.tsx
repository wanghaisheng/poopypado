import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { RootStackParamList } from "../../App";
import { AmountSlider } from "./AmountSlider";
import { Card } from "./Card";
import { ColourSelect } from "./ColourSelect";
import { ConfirmationModal } from "./ConfirmationModal";
import { DatePicker } from "./DatePicker";
import { FontText } from "./FontText";
import { Header } from "./Header";
import { Poop, addEntry, editEntry } from "./history";
import { Icon } from "./Icon";
import { Note } from "./Note";
import { Page } from "./Page";
import { PillButton } from "./PillButton";
import { Spacer } from "./Spacer";
import { TypeSelect } from "./TypeSelect";

interface Props extends NativeStackScreenProps<RootStackParamList, "Setting"> {
  db: WebSQLDatabase;
}
export const Setting = (props: Props) => {
  const { navigation, db, route } = props;

  const existingEntry = route.params?.entry;
  const hasExistingEntry = !!existingEntry;

  /**
   * Entry data
   */
  const [date, setDate] = useState(route.params?.entry.date ?? new Date());
  const [type, setType] = useState(
    hasExistingEntry && Array.isArray(existingEntry?.type)
      ? existingEntry.type
      : [false, false, false, false, false, false, false]
  );
  const [colour, setColour] = useState(
    hasExistingEntry && Array.isArray(existingEntry?.color)
      ? existingEntry.color
      : [false, false, false, false, false, false]
  );
  const [amount, setAmount] = useState(route.params?.entry.amount ?? 3);
  const [note, setNote] = useState(route.params?.entry.note ?? "");

  const [canExit, setCanExit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Prevent default behavior of leaving the screen
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (canExit) return;
        e.preventDefault();
        setCanExit(true);
        setShowConfirmModal(true);
      }),
    [navigation, canExit]
  );

  const confirm = () => {
    setCanExit(true);
    const onComplete = () => navigation.navigate("Main", { hasUpdate: true });
    const commonData: Omit<Poop, "id"> = {
      date,
      type,
      color: colour,
      amount,
      note,
    };
    if (hasExistingEntry) {
      editEntry(
        db,
        {
          id: route.params.entry.id,
          ...commonData,
        },
        onComplete
      );
    } else {
      addEntry(db, commonData, onComplete);
    }
  };

  return (
    <Page>
      <Header>
        <TitleContainer>
          <Title>{hasExistingEntry ? "Edit Existing" : "Create"} Entry</Title>
        </TitleContainer>
        <IconContainer>
          <Icon
            name="times"
            onPress={() => {
              setCanExit(true);
              setShowConfirmModal(true);
            }}
          />
        </IconContainer>
      </Header>
      <ScrollView decelerationRate={0.95}>
        <DatePicker date={date} onChange={(d) => setDate(d)} />
        <TypeSelect type={type} onTypeSelect={setType} />
        <ColourSelect colour={colour} setColour={setColour} />
        <AmountSlider amount={amount} setAmount={setAmount} />
        <Note value={note} setValue={setNote} />
        <Spacer size={"60"} />

        <ConfirmationModal
          visible={showConfirmModal}
          onConfirm={() => navigation.navigate("Main")}
          onCancel={() => {
            setShowConfirmModal(false);
            setCanExit(false);
          }}
        />
      </ScrollView>
      <Footer>
        <PillButton onPress={confirm}>
          {hasExistingEntry ? "Update" : "Save"} Entry
        </PillButton>
      </Footer>
    </Page>
  );
};

const Title = styled(FontText)`
  font-size: 22px;
  color: ${(p) => p.theme.color.icon};
`;

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  height: 10%;
  right: 0;
  width: 100%;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 30px;
  top: 52px;
`;

const TitleContainer = styled.View`
  position: absolute;
  left: 30px;
  bottom: 8px;
`;
