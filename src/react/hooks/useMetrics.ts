import { useAsync } from "react-use";
import { API_URL } from "../../constants";

export type Metrics = {
  bridge_count: string | null;
  login_consecutive_days: string | null;
  login_count: string | null;
  login_progress: string | null;
  mint_progress: string | null;
  page_view_count: string | null;
  page_view_progress: string | null;
  soul_mint_count: string | null;
  swap_count: string | null;
  token_mint_count: string | null;
  trade_count: string | null;
  trade_progress: string | null;
  wallet_count: string | null;
  wallet_progress: string | null;
  totalPoints: string | null;
  average_progress: string | null;
};

export type NewPoints = {
  transactionPoints: number | null;
  surfPoints: number | null;
};

export const useMetrics = (address?: string) => {
  const {
    value: metrics,
    loading: isLoading,
    error,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/points/${address}`);
      const responseData = (await response.json()) as Metrics;

      return responseData;
    } catch (e) {
      throw e;
    }
  }, [address]);


  const {
    value: newPoints,
    loading: isLoadingNewPoints,
    error: newPointsErrors,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/new-points/${address}`);
      const responseData = (await response.json()) as NewPoints;

      return responseData;
    } catch (e) {
      throw e;
    }
  }, [address]);

  return { metrics, isLoading: isLoading || isLoadingNewPoints, error, newPoints, isLoadingNewPoints, newPointsErrors  };
};
