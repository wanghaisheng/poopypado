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

export const addEntry = (
  db: WebSQLDatabase,
  entry: Omit<Poop, "id">,
  onComplete: () => void
) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into items (date) values (?)", [
        entry.date.toISOString(),
      ]);
    },
    undefined,
    onComplete
  );
};

export const editEntry = (
  db: WebSQLDatabase,
  entry: Poop,
  onComplete: () => void
) => {
  const { id, date } = entry;
  db.transaction(
    (tx) => {
      tx.executeSql(`update items set date = ? where id = ?;`, [date, id]);
    },
    undefined,
    onComplete
  );
};
