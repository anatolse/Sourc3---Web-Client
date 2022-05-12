import { setupDnode } from '@core/setupDnode';
import NotificationManager from '@core/NotificationManager';

const notificationManager = NotificationManager.getInstance();

export default class DnodeApp {
  private appApi = null;

  private appApiHandler = null;

  async createAppAPI(wallet: any, apiver: string, apivermin: string, appname: string, origin: string) {
    this.appApi = await wallet.createAppAPI(apiver, apivermin, origin, appname, (...args) => {
      if (!localStorage.getItem('locked')) {
        this.appApiHandler(...args);
      } else {
        this.appApiHandler(JSON.stringify({
          error: true,
          errcode: -5,
          errormsg: 'Wallet is locked',
        }));
      }
    });
  }

  walletIsLocked() {
    this.appApiHandler(JSON.stringify({
      error: true,
      errcode: -5,
      errormsg: 'Wallet is locked',
    }));
  }

  walletUnlocked() {
    this.appApiHandler(JSON.stringify({
      is_locked: false,
    }));
  }

  pageApi() {
    return {
      callWalletApiResult: async (handler: any) => {
        this.appApiHandler = handler;
      },
      callWalletApi: async (callid: string, method: string, params) => {
        if (!localStorage.getItem('locked')) {
          const request = {
            jsonrpc: '2.0',
            id: callid,
            method,
            params,
          };
          this.appApi.callWalletApi(JSON.stringify(request));
        }
      },
      lockedReconnect: async (params) => {
        if (localStorage.getItem('locked')) {
          notificationManager.openAuthNotification(params, params.appurl);
        }
      },
      localStorage: async () => {
        let a;
        await new Promise((resolve, reject) => {
          chrome.storage.sync.get(['activePid'], (result) => {
            a = result;
            resolve(result);
            console.log(`Value currenty is ${Object.values(result)}`);
          });
        });
        return a;
      },
    };
  }

  connectPage(connectionStream, origin) {
    const api = this.pageApi();
    const dnode = setupDnode(connectionStream, api);

    dnode.on('remote', (remote) => {
      // eslint-disable-next-line no-console
      console.log(origin);
      // eslint-disable-next-line no-console
      console.log(remote);
    });
  }
}
