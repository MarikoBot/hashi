import { HashiSlashCommand } from '../../root';
import { Injectors } from '../../decorators';

@Injectors.HashiCommandInjector({
  id: 'pang',
})
export class Ping extends HashiSlashCommand {}
