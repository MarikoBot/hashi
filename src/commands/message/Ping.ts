import { Injectors } from '../../decorators';
import { HashiMessageCommand } from '../../root';

@Injectors.HashiCommandInjector({
  id: 'ping',
})
export class Ping extends HashiMessageCommand {}
