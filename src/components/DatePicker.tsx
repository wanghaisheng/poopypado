import DateTimePicker from "@react-native-community/datetimepicker";
import format from "date-fns/format";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import { Card } from "./Card";

interface Props {
  date: Date;
  onChange: (date: Date) => void;
}

export const DatePicker = (props: Props) => {
  const { date, onChange } = props;

  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onUpdate = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    onChange(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Card>
      <Text>Select a Time</Text>
      <DateTimeContainer>
        <View>
          <TouchableOpacity onPress={showTimepicker}>
            <DateTimeText>{format(date, "HH:mm a")}</DateTimeText>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={showDatepicker}>
            <DateTimeText>{format(date, "yyyy MMM dd")}</DateTimeText>
          </TouchableOpacity>
        </View>
      </DateTimeContainer>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour
          onChange={onUpdate}
          maximumDate={new Date()}
        />
      )}
    </Card>
  );
};

const DateTimeText = styled.Text`
  font-size: 28px;
`;

const DateTimeContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 10px 0 0 0;
`;
