import { HttpResponse, HttpStatusCode } from "./protocols";

export const niceRequest = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.NICE_REQUEST,
  body,
});

export const createdRequest = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED_REQUEST,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong.",
  };
};
