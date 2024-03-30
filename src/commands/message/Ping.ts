import { HashiMessageCommand } from '../../root';
import { Injectors } from '../../decorators';

@Injectors.HashiCommandInjector({
  id: 'ping',
})
export class Ping extends HashiMessageCommand {}
