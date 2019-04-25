/*
  Модель json ответа сервера.
 */
export interface IResponse {
  status: string;
  message: string;
  code: string;
  payload: object;
}
