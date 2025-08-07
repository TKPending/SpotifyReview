import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";

export const removeUserAccess = (
  router: AppRouterInstance,
  itemsToRemove: string[]
) => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = getSessionStorage("access_token") || "";
  }

  if (!accessToken) {
    if (typeof window !== "undefined") {
      itemsToRemove.forEach((item: string) => {
        removeSessionStorage(item);
      });
    }
    router.push("/");
  }
};
