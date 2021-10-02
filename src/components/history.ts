import { format } from "date-fns";
import { WebSQLDatabase } from "expo-sqlite";

export interface Poop {
  id: number;
  date: Date;
}

interface DateHash {
  [key: string]: Poop[];
}

export const historyDateHash = (history: Poop[]): DateHash => {
  const hash: DateHash = {};
  history.forEach((h) => {
    const date = format(h.date, "yyyy-MM-dd");
    const entryExists = !!hash[date];

    if (entryExists) {
      hash[date].push(h);
    } else {
      hash[date] = [h];
    }
  });
  return hash;
};

export const deleteEntry = (
  db: WebSQLDatabase,
  id: string,
  onComplete: () => void
): void => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from items where id = ?;`, [id]);
    },
    undefined,
    onComplete
  );
};
