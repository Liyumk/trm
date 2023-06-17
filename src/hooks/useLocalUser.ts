import { api } from "@/utils/api";
import { getEnv } from "@/utils/getEnv";
import { useEffect, useState } from "react";

export const useLocalUser = () => {
  const { isDev } = getEnv();
  const [luid, setLuid] = useState<string>("");

  const { mutate, data, isLoading } = api.user.createTemporary.useMutation();

  let initialRender = true;

  useEffect(() => {
    const localUserId = localStorage.getItem("luid");
    if (initialRender && isDev) {
      initialRender = false;
      return;
    }

    if (!localUserId) {
      mutate();
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("luid", data.id);
    }
  }, [data]);
};
