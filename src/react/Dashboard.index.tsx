import React from 'react'
import { createRoot } from 'react-dom/client';
import DashboardApp from './Dashboard';
import { DashboardContextProvider } from './contexts/DashboardContextProvider';

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <DashboardContextProvider><DashboardApp /></DashboardContextProvider>)