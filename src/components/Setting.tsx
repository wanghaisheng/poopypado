import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useState } from "react";

import { RootStackParamList } from "../../App";
import { AmountSlider } from "./AmountSlider";
import { DatePicker } from "./DatePicker";
import { Page } from "./Page";
import { PillButton } from "./PillButton";

interface Props extends NativeStackScreenProps<RootStackParamList, "Setting"> {
  db: WebSQLDatabase;
}
export const Setting = (props: Props) => {
  const { navigation, db } = props;

  const [date, setDate] = useState(new Date());

  const [amount, setAmount] = useState(3);

  const confirm = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (date) values (?)", [
          date.toISOString(),
        ]);
      },
      () => {
        console.log("success");
        navigation.navigate("Main");
      }
    );
  };

  return (
    <Page>
      <DatePicker date={date} onChange={(d) => setDate(d)} />
      <AmountSlider amount={amount} setAmount={setAmount} />
      <PillButton onPress={confirm}>Create Entry</PillButton>
    </Page>
  );
};
