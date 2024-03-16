chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['protocolId', 'bootnode'], (result) => {
      if (!result.protocolId) {
        chrome.storage.sync.set({protocolId: '/masa/oracle_protocol/v0.0.6-alpha-test'});
      }
      if (!result.bootnode) {
        chrome.storage.sync.set({bootnode: '/ip4/192.168.1.8/tcp/4001/p2p/16Uiu2HAm28dTN2WVWD2y2bjzwPdym59XASDfQsSktCtejtNR9Vox'});
      }
    });
  });