import { Injectors } from '../decorators';
import { StructureColumnOrChild, SuperModel, SuperModelColumn } from '../root';

/**
 * An example of use case for the SuperModel.
 */
@Injectors.SuperModelInjector('user')
export class UserSuperModel extends SuperModel {
  /**
   * Definitions of the columns.
   */
  public columns: StructureColumnOrChild = {
    id: new SuperModelColumn('MongooseId'),
    username: new SuperModelColumn(String, 'mariko_bot'),
    preferences: {
      favoriteColor: new SuperModelColumn(String, 'purple'),
      favoriteAnimal: new SuperModelColumn(String, 'panda'),
    },
  };
}
