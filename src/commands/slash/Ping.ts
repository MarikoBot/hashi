import { Injectors } from '../../decorators';
import { HashiSlashCommand } from '../../root';

@Injectors.HashiCommandInjector({
  id: 'pang',
})
export class Ping extends HashiSlashCommand {}
