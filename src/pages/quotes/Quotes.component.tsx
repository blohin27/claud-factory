import Tabs from "rc-tabs";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Content, QuotesTable, QuotesType } from "../../components";
import "./index.scss";

export const Quotes: FC = observer(() => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const activeTab = useMemo(
    () => (queryString.parse(search)["tab"] as QuotesType) || "a",
    [search]
  );

  const { quotes } = useStore();

  const data = useMemo(() => quotes.data, [quotes.data]);

  useEffect(
    () => () => {
      quotes.dispose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    quotes.onGetData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const onChange = useCallback(
    (activeKey: string) => {
      navigate({ search: `tab=${activeKey}` });
    },
    [navigate]
  );

  return (
    <Content>
      <Tabs
        activeKey={activeTab}
        onChange={onChange}
        items={[
          {
            key: "a",
            children: (
              <QuotesTable
                type={"a"}
                data={data}
                loading={quotes.loading && !quotes.loaded}
              />
            ),

            label: "Котировки А",
          },
          {
            key: "b",
            children: (
              <QuotesTable
                type={"b"}
                data={data}
                loading={quotes.loading && !quotes.loaded}
              />
            ),

            label: "Котировки Б",
          },
        ]}
      />
    </Content>
  );
});
