/// <reference types="chrome"/>

import * as extensionizer from 'extensionizer';
import WasmWallet from '@core/WasmWallet';
import { Environment, RemoteRequest } from '@app/core/types';

import NotificationManager from '@core/NotificationManager';
import { ExternalAppMethod } from '@core/types';

window.global = globalThis;

const notificationManager = NotificationManager.getInstance();
const wallet = WasmWallet.getInstance();

let port = null;
let contentPort = null;
let notificationPort = null;
let connected = false;
let activeTab = null;

chrome.storage.sync.get(['activePid'], () => {});

function postMessage(data) {
  if (port && connected) {
    port.postMessage(data);
  }
}

function handleConnect(remote) {
  port = remote;
  connected = true;
  // eslint-disable-next-line no-console

  port.onDisconnect.addListener(() => {
    connected = false;
  });

  port.onMessage.addListener(({ id, method, params }: RemoteRequest) => {
    if (method !== undefined) {
      wallet.send(id, method, params);
    }
  });

  switch (port.name) {
    case Environment.POPUP: {
      wallet.init(postMessage, null);
      break;
    }
    case Environment.NOTIFICATION: {
      const tabId = remote.sender.tab.id;
      notificationManager.openBeamTabsIDs[tabId] = true;
      activeTab = remote.sender.tab.id;
      notificationPort = remote;
      notificationPort.onDisconnect.addListener(() => {
        if (activeTab) {
          // notificationManager.closeTab(activeTab);
          activeTab = null;
          notificationManager.appname = ''; // TODO: check with reconnect
          notificationManager.openBeamTabsIDs = {};
        }
      });

      wallet.init(postMessage, notificationManager.notification);
      break;
    }

    case Environment.CONTENT:
      NotificationManager.setPort(remote);
      break;

    case Environment.CONTENT_REQ: {
      notificationManager.setReqPort(remote);
      contentPort = remote;
      contentPort.onMessage.addListener((msg) => {
        if (wallet.isRunning() && !localStorage.getItem('locked')) {
          if (wallet.isConnectedSite({ appName: msg.appname, appUrl: remote.sender.origin })) {
            msg.appurl = remote.sender.origin;
            wallet.connectExternal(msg);
          } else if (msg.type === ExternalAppMethod.CreateSourc3Api) {
            if (msg.is_reconnect) {
              // eslint-disable-next-line
              notificationManager.appname === msg.appname
                ? notificationManager.openPopup()
                : notificationManager.openConnectNotification(msg, remote.sender.origin);
            } else {
              notificationManager.openConnectNotification(msg, remote.sender.origin);
            }
            // msg.appurl = remote.sender.origin;
            // wallet.connectExternal(msg);
          }
        } else {
          notificationManager.openAuthNotification(msg, remote.sender.origin);
        }
      });

      contentPort.onDisconnect.addListener((e) => {
        wallet.disconnectAppApi(e.sender.origin);
      });
      break;
    }
    default:
      break;
  }
}

wallet.initContractInfoHandler((req, info, amounts, cb) => {
  wallet.initcontractInfoHandlerCallback(cb);
  notificationManager.openContractNotification(req, info, amounts);
});

wallet.initSendHandler((req, info, cb) => {
  wallet.initSendHandlerCallback(cb);
  notificationManager.openSendNotification(req, info);
});

extensionizer.runtime.onConnect.addListener(handleConnect);

chrome.runtime.getPlatformInfo(() => {
  setTimeout(() => {
    // Increasing body size enforces the popup redrawing
    document.body.style.height = '600px';
  }, 250); // 250ms is enough to finish popup open animation
});
