// /src/background.ts

import { navigationListener } from './background/navigationListener';
import { messageListener } from './background/messageListener';

console.log('Background script loaded.');

// Initialize listeners
navigationListener();
messageListener();