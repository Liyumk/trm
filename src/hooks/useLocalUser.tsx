import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useLocalUser = () => {
  const [luid, setLuid] = useState<string>("");
  const { mutateAsync } = api.user.createTemporary.useMutation();

  useEffect(() => {
    const localUser = localStorage.getItem("luid");

    if (localUser) {
      setLuid(localUser);
      return;
    }

    mutateAsync().then((res) => {
      localStorage.setItem("luid", res.id);
      setLuid(res.id);
    });
  }, []);

  return { luid };
};
