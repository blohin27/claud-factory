import React, { FC, memo } from "react";
import { Quote } from "../../pages/quotes/Quotes.types";

interface IProps {
  name: string;
  quote: Quote;
}

export const QuotesInfo: FC<IProps> = memo(({ name, quote }) => {
  return (
    <div>
      <div>{`Name: ${name}`}</div>
      <div>{`Last: ${quote.last}`}</div>
      <div>{`HighestBid: ${quote.highestBid}`}</div>
      <div>{`PercentChange: ${quote.percentChange}`}</div>
    </div>
  );
});
