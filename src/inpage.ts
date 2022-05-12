import PostMessageStream from 'post-message-stream';
import { cbToPromise, setupDnode, transformMethods } from '@core/setupDnode';
import { Environment } from '@core/types';

async function setupInpageApi() {
  const connectionStream = new PostMessageStream({
    name: 'page',
    target: Environment.CONTENT,
  });

  const inpageApi = {};

  const dnode = setupDnode(connectionStream, inpageApi);
  await new Promise((resolve) => {
    dnode.once('remote', (remoteApi) => {
      resolve(transformMethods(cbToPromise, remoteApi));
    });
  }).then((api) => {
    global.BeamApi = api;
    console.log(global.BeamApi.api);

    // chrome.storage.sync.get(['profile'], (result) => {
    //   console.log(`Value currently is ${Object.values(result)}`);
    //   a = Object.values(result);
    // });
    window.postMessage('apiInjected', window.origin);
    // eslint-disable-next-line no-console
    console.log('Source client API INJECTED');
    return api;
  });
}
// eslint-disable-next-line no-console
setupInpageApi().catch(console.error);
