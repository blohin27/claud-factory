import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.scss";

interface IProps {
  value: string | number;
  animated?: boolean;
}

const transparent = "transparent";
const black = "#000";
const up = "green";
const down = "red";

export const QuotesTableItem: FC<IProps> = memo(({ value }) => {
  const timeoutId = useRef<NodeJS.Timer | null>(null);
  const [currentValue, setCurrentValue] = useState(value);
  const [color, setColor] = useState(transparent);

  const setDefaultColor = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setColor(transparent);
    }, 1000);
  }, []);

  useEffect(() => {
    if (currentValue !== value) {
      if (value > currentValue) {
        setColor(up);
        setDefaultColor();
      }
      if (value < currentValue) {
        setColor(down);
        setDefaultColor();
      }

      setCurrentValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const style = useMemo(
    () => ({
      backgroundColor: color,
      color: color !== transparent ? "#fff" : black,
    }),
    [color]
  );

  return (
    <div style={style} className={"quotes-table_item"}>
      {value}
    </div>
  );
});
