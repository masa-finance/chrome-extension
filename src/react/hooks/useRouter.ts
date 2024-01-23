import { useMemo } from "react";
const getQueryParam = (param: string) => {
  const urlParams = new URL(window.location.href);
  return urlParams.searchParams.get(param);
};

export const useRouter = () => {
  const page = useMemo(() => getQueryParam("page"), []);

  return { page };
};
