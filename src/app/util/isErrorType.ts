import { ErrorType } from "@/app/types/ReviewTypes";

export const isErrorType = (data: any): data is ErrorType =>
  typeof data === "object" && data !== null && "error" in data;
