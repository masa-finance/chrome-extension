import { useAsync } from "react-use";

export const useSoulnames = (address?: string) => {
  const {
    value: soulnames,
    loading: isLoading,
    error,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(
        `https://app.masa.finance/api/soulnames?address=${address}`
      );
      const responseData = await response.json();

      return responseData?.data?.flat();
    } catch (e) {
      throw e;
    }
  }, [address]);

  return {
    soulnames,
    isLoading: isLoading,
    error,
  };
};
