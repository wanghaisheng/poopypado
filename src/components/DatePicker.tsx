import DateTimePicker from "@react-native-community/datetimepicker";
import format from "date-fns/format";
import React, { useState } from "react";
import { Button, Platform, View } from "react-native";

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
    <View>
      <View>
        <Button onPress={showDatepicker} title={format(date, "yyyy MM dd")} />
      </View>
      <View>
        <Button onPress={showTimepicker} title={format(date, "HH:mm")} />
      </View>
      {show && (
        <DateTimePicker value={date} mode={mode} is24Hour onChange={onUpdate} />
      )}
    </View>
  );
};
