import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import "./index.scss";
import { Quote, QuotesData } from "../../pages/quotes/Quotes.types";
import { QuotesTableRow } from "./QuotesTableRow";
import { Loader } from "../loader";
import { Modal } from "../modal";
import { QuotesInfo } from "../quotesInfo";
import { useStore } from "../../store";
import { QuotesTableHeader } from "./QuotesTableHeader";

export type QuotesType = "a" | "b";
export type QuotesTypeModal = { name: string; data: Quote };

interface IProps {
  type: QuotesType;
  data: QuotesData;
  loading?: boolean;
}

export const QuotesTable: FC<IProps> = observer(({ type, data, loading }) => {
  const [itemForModal, setItemForModal] = useState<QuotesTypeModal | null>(
    null
  );
  const store = useStore();

  const items = useMemo(() => {
    const keys = Object.keys(data);
    const length = keys.length;

    if (type === "a") {
      return keys.slice(0, length / 2);
    }

    return keys.slice(length / 2, length);
  }, [data, type]);

  const setModalItem = useCallback((name: string, data: Quote) => {
    setItemForModal({ name, data });
  }, []);
  const onClose = useCallback(() => {
    setItemForModal(null);
    store.quotes.onGetData().then();
  }, [store.quotes]);

  useEffect(() => {
    if (itemForModal) {
      store.quotes.stopInterval();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemForModal]);
  const headers = ["Name", "Last", "HighestBid ", "PercentChange"];

  return (
    <div className={"quotes-table_wrap"}>
      <Loader loading={loading} rows={15} />

      <Modal
        title={"Модальное окно"}
        isOpen={!!itemForModal}
        onClose={onClose}
        onAfterClose={() => {
          console.log("модалка закрылась");
        }}
      >
        {itemForModal && (
          <QuotesInfo name={itemForModal.name} quote={itemForModal.data} />
        )}
      </Modal>

      <div className={"quotes-table"}>
        <QuotesTableHeader headers={headers} />
        {items.map((name, index) => (
          <QuotesTableRow
            setModalItem={setModalItem}
            key={name + index}
            name={name}
            data={data[name]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});
