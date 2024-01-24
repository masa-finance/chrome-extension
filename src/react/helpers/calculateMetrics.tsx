import React from 'react';
import { Metrics } from "../hooks/useMetrics";

export const calculateMetrics = (metrics?: Metrics | null) => {
  const metricsData = [
    {
      title: "Browsing",
      subTitle: "vs last week",
      percentChange: metrics?.page_view_progress,
      columnWidth: 1,
      stats: [
        {
          label: "Page views",
          value: metrics?.page_view_count,
        },
      ],
    },
    {
      title: "Masa",
      subTitle: "All time",
      percentChange: metrics?.login_progress,
      columnWidth: 1,
      stats: [
        {
          label: "Logins",
          value: metrics?.login_count,
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
              7 day 10x
              <div className="help-icon">
                <img
                  src="icons/question-mark-in-circle.svg"
                  width="19"
                  height="19"
                />
                <div className="tooltip">
                  <h5 className="tooltip-title">Weekly 10X login</h5>
                  <p className="tooltip-body">
                    Login everyday of the week to Masa and 10X all your points
                    for that week.
                  </p>
                </div>
              </div>
            </div>
          ),
          value: `${metrics?.login_consecutive_days} of 7`,
        },
      ],
    },
    {
      title: "Wallet activity",
      subTitle: "vs last week",
      columnWidth: 2,
      percentChange: metrics?.wallet_progress,
      stats: [
        {
          label: "Swap",
          value: metrics?.swap_count,
        },
        {
          label: "Bridge",
          value: metrics?.bridge_count,
        },
        {
          label: "Wallet",
          value: metrics?.wallet_count,
        },
      ],
    },
    {
      isComingSoon: true,
      title: "Referred friends",
      subTitle: "vs last week",
      columnWidth: 2,
      // percentChange: 0,
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
      columnWidth: 2,
      link: {
        label: "Mint another soul",
        url: "https://app.masa.finance/soulnames",
      },
      percentChange: metrics?.mint_progress,
      stats: [
        {
          label: "Tokens",
          value: metrics?.token_mint_count,
        },
        {
          label: "Souls",
          value: metrics?.soul_mint_count,
        },
      ],
    },
    {
      title: "Dex trade",
      subTitle: "vs last week",
      columnWidth: 1,
      percentChange: metrics?.trade_progress,
      stats: [
        {
          label: "Trades",
          value: metrics?.trade_count,
        },
      ],
    },
  ];


  return metricsData;
};
