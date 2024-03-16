import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { tcp } from '@libp2p/tcp';
import { webSockets } from '@libp2p/websockets';
import { kadDHT } from '@libp2p/kad-dht';
import defaultsDeep from 'lodash/defaultsDeep';
import { createLibp2p as create } from 'libp2p';
import { getConfig } from '../config';
import { Libp2pOptions } from '../types/libp2pTypes';

export async function createLibp2p(_options: Libp2pOptions): Promise<any> {
  const config = await getConfig();

  const defaults: Libp2pOptions = {
    transports: [
      tcp(),
      webSockets()
    ],
    streamMuxers: [
      yamux()
    ],
    connectionEncryption: [
      noise()
    ],
    services: {
      dht: kadDHT({
        protocol: config.protocolId
      })
    }
  };

  return create(defaultsDeep(_options, defaults));
}