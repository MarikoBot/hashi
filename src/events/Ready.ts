import { HashiClient, HashiEvent } from '../root';

export const Ready: HashiEvent = new HashiEvent('ready').setCallbackFunction((client: HashiClient): void => {
  console.log('I am ready!');
});
