import React from 'react'
import { createRoot } from 'react-dom/client';
import DashboardApp from './Dashboard';

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<DashboardApp />)