import React, { createContext, useContext, useMemo } from 'react';
import { useMetamask } from '../hooks/useMetamask';
import { Metrics, useMetrics } from '../hooks/useMetrics';
import { calculateMetrics } from '../helpers/calculateMetrics';

interface DashboardContextProps {
    initiateConnection: () => void;
    account?: string;
    metrics?: Metrics | null;
    isLoading?: boolean;
    error?: any;
    metricsData?: any | null;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { initiateConnection, account } = useMetamask();

    const { metrics, isLoading, error } = useMetrics(account);
    console.log("metrics", { metrics, isLoading, error });

    const metricsData = useMemo(() => {
        return calculateMetrics(metrics);
    }, [metrics])

    const context = useMemo(() => ({ account, initiateConnection, metrics, isLoading, error, metricsData }), [account, initiateConnection, metrics, isLoading, error, metricsData])

    return (
        <DashboardContext.Provider value={context}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboardContext must be used within a DashboardContextProvider');
    }
    return context;
};
