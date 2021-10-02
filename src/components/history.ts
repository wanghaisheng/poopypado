import { format } from "date-fns";

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
