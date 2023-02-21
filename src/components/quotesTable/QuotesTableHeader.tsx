import React, { FC, memo } from "react";
import { QuotesTableItem } from "./QuotesTableItem";

interface IProps {
  headers: string[];
}

export const QuotesTableHeader: FC<IProps> = memo(({ headers }) => {
  return (
    <div className={"quotes-table_row quotes-table_row-header"}>
      {headers.map((item, index) => (
        <QuotesTableItem value={item} key={item + index} />
      ))}
    </div>
  );
});
