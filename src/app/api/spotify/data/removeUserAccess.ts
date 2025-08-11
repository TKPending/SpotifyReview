import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";
import { sessionItemsToRemove } from "@/app/global";

export const removeUserAccess = (router: AppRouterInstance) => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = getSessionStorage("access_token") || "";
  }

  if (!accessToken) {
    if (typeof window !== "undefined") {
      sessionItemsToRemove.forEach((item: string) => {
        removeSessionStorage(item);
      });
    }
    router.push("/");
  }
};
