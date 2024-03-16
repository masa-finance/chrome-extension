export interface Libp2pOptions {
    // Define properties based on your _options structure
    transports?: any[];
    streamMuxers?: any[];
    connectionEncryption?: any[];
    services?: {
      dht?: any; // Consider specifying a more detailed type
    };
  }