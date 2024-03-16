// /src/background.ts

import { initializeConfig } from './config';
import { navigationListener } from './background/navigationListener';
import { messageListener } from './background/messageListener';

// Call initializeConfig to set default values upon installation
initializeConfig();
console.log('Background script loaded.');

// Initialize listeners
navigationListener();
messageListener();