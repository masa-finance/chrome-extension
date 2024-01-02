// /src/content.ts

import { sendClickData } from './content/clickData';
import { trackUrlChanges } from './content/urlChangeTracker';

// Listen for all clicks on the page
document.addEventListener('click', sendClickData);

// Track URL changes
trackUrlChanges();