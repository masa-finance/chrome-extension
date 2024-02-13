import { useAsync } from "react-use";
import { API_URL } from "../../constants";
import { useMemo } from "react";

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
};

export type LoginDays = {
  consecutiveLoginDays: number | null;
};
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

export const useMetrics = (address?: string) => {
  const {
    value: points,
    loading: isLoadingPoints,
    error: pointsError,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/points/${address}`);
      const responseData = (await response.json()) as Points;

      return responseData;
    } catch (e) {
      throw e;
    }
  }, [address]);

  const {
    value: newPoints,
    loading: isLoadingNewPoints,
    error: newPointsError,
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

  const {
    value: progresses,
    loading: isLoadingProgresses,
    error: progressesError,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(`${API_URL}/profile/progresses/${address}`);
      const responseData = (await response.json()) as Progresses;

      return responseData;
    } catch (e) {
      throw e;
    }
  }, [address]);

  const {
    value: loginDays,
    loading: isLoadingLoginDays,
    error: loginDaysError,
  } = useAsync(async () => {
    if (!address) return null;
    try {
      const response = await fetch(
        `${API_URL}/profile/consecutive-login-days/${address}`
      );
      const responseData = (await response.json()) as LoginDays;

      return responseData;
    } catch (e) {
      throw e;
    }
  }, [address]);

  const isLoading = useMemo(
    () =>
      isLoadingLoginDays ||
      isLoadingNewPoints ||
      isLoadingPoints ||
      isLoadingProgresses,
    [
      isLoadingLoginDays,
      isLoadingNewPoints,
      isLoadingPoints,
      isLoadingProgresses,
    ]
  );

  return {
    points,
    pointsError,
    progresses,
    progressesError,
    loginDays,
    loginDaysError,
    isLoading,
    newPoints,
    newPointsError,
  };
};
