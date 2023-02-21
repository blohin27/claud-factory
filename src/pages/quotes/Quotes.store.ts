import { action, makeAutoObservable, observable } from "mobx";
import { QuotesData } from "./Quotes.types";
import { quotesService } from "./Quotes.service";

export class QuotesStore {
  loading = false;
  loaded = false;
  error: Error | null = null;
  data: QuotesData = {};
  private intervalId: NodeJS.Timer | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {
        loading: observable,
        loaded: observable,
        error: observable,
        data: observable,
        dispose: action,
        onGetData: action,
      },
      { autoBind: true }
    );
  }

  dispose() {
    this.stopInterval();
    this.loading = false;
    this.loaded = false;
    this.data = {};
  }

  async onGetData() {
    this.loading = true;

    const res = await quotesService.getQuotes();

    if (res.error) {
      this.error = res.error;
    } else {
      this.data = res.data || {};
      this.error = null;
      this.loaded = true;
      this.startInterval();
    }

    this.loading = false;
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startInterval() {
    this.stopInterval();

    this.intervalId = setInterval(() => {
      this.onGetData().then();
    }, 5000);
  }
}
