import React, { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import "./index.scss";
import { Quote } from "../../pages/quotes/Quotes.types";
import { QuotesTableItem } from "./QuotesTableItem";

interface IProps {
  name: string;
  data: Quote;
  setModalItem: (name: string, item: Quote) => void;
  index?: number;
}

export const QuotesTableRow: FC<IProps> = observer(
  ({ name, data, setModalItem, index }) => {
    const changeItem = useCallback(() => {
      setModalItem(name, data);
    }, [setModalItem, name, data]);

    return (
      <div className={"quotes-table_row"} onClick={changeItem}>
        <QuotesTableItem value={name} />
        <QuotesTableItem value={Number(data.last).toFixed(2)} />
        <QuotesTableItem value={Number(data.highestBid).toFixed(2)} />
        <QuotesTableItem value={Number(data.percentChange).toFixed(2)} />
      </div>
    );
  }
);
