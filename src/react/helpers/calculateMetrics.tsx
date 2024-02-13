import React from 'react';
import { useMetrics } from "../hooks/useMetrics";
import { Tooltip } from '../features/Dashboard/Tooltip';

export const calculateMetrics = (metrics?: ReturnType<typeof useMetrics> | null) => {

  const metricsData = [
    {
      title: "Browsing",
      subTitle: "vs last week",
      percentChange: metrics?.progresses?.pageViewProgress,
      pointValue: 2,
      tooltip: 'Get 2 points per page view when the surf the web extension is enabled.',
      tooltipExtra: <p>Maximum of 1,000 points per day</p>,
      stats: [
        {
          label: "Page views",
          value: metrics?.points?.cappedPageViews,
        },
      ],
    },
    {
      title: "Masa app",
      subTitle: "All time",
      percentChange: metrics?.progresses?.loginProgress,
      pointValue: 3,
      tooltip: 'Get 3 points per daily login on the main Masa web application.',
      link: {
        label: "Login to Masa app",
        url: "https://app.masa.finance",
      },
      stats: [
        {
          label: "Logins",
          value: metrics?.points?.login,
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-xsmall)",
              }}
            >
              Daily login +10x
              <Tooltip
                title="Daily login 10x the points"
                description='Get 10 times the total points of a week when you login daily 7 days in a row to the Masa web app.'
                pointValue='10X'
              />
            </div>
          ),
          value: `${metrics?.loginDays?.consecutiveLoginDays} of 7`,
        },
      ],
    },
    {
      title: "Wallet activity",
      subTitle: "vs last week",
      tooltip: 'Get 10 points per wallet event while sharing your wallet information.',
      tooltipExtra: (<>
        <h4>Wallet connections</h4>
        <p>The number of times the same wallet has been connected.</p>
        <h4>Trades</h4>
        <p>The number of DEX trades with the connected wallet.</p>
        <h4>Bridge</h4>
        <p>Bridge transactions with the connected wallet.</p>
      </>),
      pointValue: 10,
      percentChange: metrics?.progresses?.walletProgress,
      stats: [
        {
          label: "Wallet connections",
          value: metrics?.points?.wallet,
        },
        {
          label: "Trades",
          value: metrics?.points?.trade,
        },
        {
          label: "Bridge",
          value: metrics?.points?.bridge,
        },
      ],
    },
    {
      isComingSoon: true,
      title: "Referred friends",
      subTitle: "vs last week",
      link: {
        label: "Invite more friends",
        url: "#",
      },
      stats: [
        {
          label: "Invites",
          value: "0",
        },
        {
          label: "Registered",
          value: "0",
        },
      ],
    },
    {
      title: "Minted",
      subTitle: "vs last week",
      tooltip: 'Get 15 point for every SBT that is minted with a soul name or campaign completion.',
      pointValue: 15,
      link: {
        label: "Mint another soul",
        url: "https://app.masa.finance/soulnames",
      },
      percentChange: metrics?.progresses?.mintProgress,
      stats: [
        {
          label: "SBTs",
          value: metrics?.points?.tokenMint,
        },
        {
          label: "Souls",
          value: metrics?.points?.soulMint,
        },
      ],
    },
    {
      title: "Social connections",
      subTitle: "All time",
      tooltip: 'Get 50 points the first time you connect a new social connection.',
      pointValue: 50,
      percentChange: metrics?.progresses?.tradeProgress,
      link: {
        label: "Connect",
        url: "https://app.masa.finance/",
      },
      stats: [
        {
          label: <><img src="/icons/x.svg" /></>,
          value: `${(metrics?.points?.twitterCount ?? 0) > 0 ? '+' : ''}${metrics?.points?.twitterCount}`,
          isSmall: true,
          isPositive: (metrics?.points?.twitterCount ?? 0) > 0
        },
        {
          label: <><img src="/icons/discord.svg" /></>,
          value: `${(metrics?.points?.discordCount ?? 0) > 0 ? '+' : ''}${metrics?.points?.discordCount}`,
          isSmall: true,
          isPositive: (metrics?.points?.discordCount ?? 0) > 0
        },
        {
          label: <><img src="/icons/telegram.svg" /></>,
          value: `${(metrics?.points?.telegramCount ?? 0) > 0 ? '+' : ''}${metrics?.points?.telegramCount}`,
          isSmall: true,
          isPositive: (metrics?.points?.telegramCount ?? 0) > 0
        },
        {
          label: <><img src="/icons/github.svg" /></>,
          value: "Coming soon",
          isSmall: true
        },
      ],
    },
  ];


  return metricsData;
};
