import { headers } from "next/headers";

export const isMobile = () => {
  const ua = headers().get("user-agent");
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua || ""
  );
};
