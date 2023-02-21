export interface ApiResponse<R> {
  data?: R;
  error?: Error;
}
