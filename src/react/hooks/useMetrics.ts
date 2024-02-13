import { useAsync } from "react-use";
import { API_URL } from "../../constants";

export type Points = {
  cappedPageViews: number | null;
  login: number | null;
  bridge: number | null;
  wallet: number | null;
  soulMint: number | null;
  tokenMint: number | null;
  trade: number | null;
  discord: number | null;
  telegram: number | null;
  twitter: number | null;
  discordCount: number | null;
  telegramCount: number | null;
  twitterCount: number | null;
  totalPoints: number | null;
};

export type Progresses = {
  pageViewProgress: number | null;
  loginProgress: number | null;
  mintProgress: number | null;
  tradeProgress: number | null;
  walletProgress: number | null;
  averageProgress: number | null;
};

export type NewPoints = {
  transactionPoints: number | null;
  surfPoints: number | null;
}

export type LoginDays = {
  consecutiveLoginDays: number | null;
};

export const useMetrics = (address?: string) => {
  const {
    value: points
    loading: isLoadingPoints,
    error,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/points/${address}`);
      const responseData = (await response.json()) as Points;

      return { responseData };
    } catch (e) {
      throw e;
    }
  }, [address]);

  const {
    value: newPoints
    loading: isLoadingNewPoints,
    error,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/new-points/${address}`);
      const responseData = (await response.json()) as NewPoints;

      return { responseData };
    } catch (e) {
      throw e;
    }
  }, [address]);

  const {
    value: progresses
    loading: isLoadingProgresses,
    error,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/progresses/${address}`);
      const responseData = (await response.json()) as Progresses;

      return { responseData };
    } catch (e) {
      throw e;
    }
  }, [address]);

  const {
    value: loginDays
    loading: isLoadingLoginDays,
    error,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile//${address}`);
      const responseData = (await response.json()) as Points;

      return { pointsResponseData };
    } catch (e) {
      throw e;
    }
  }, [address]);

  return { metrics, isLoading, error };
};
