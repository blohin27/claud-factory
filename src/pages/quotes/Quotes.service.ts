import { ApiService } from "../../api";
import { QuotesData } from "./Quotes.types";

export class QuotesService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  getQuotes() {
    return this.api.get<QuotesData>("public?command=returnTicker");
  }
}

export const quotesService = new QuotesService(new ApiService());
