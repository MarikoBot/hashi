import { StructureColumnOrChild, SuperModel, SuperModelColumn } from '../root';

/**
 // --- EXAMPLE --- //
 * An example of use case for the SuperModel.
 */
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

  /**
   * Define the name of the model into the super constructor using default parameters.
   */
  constructor(name: string = 'user') {
    super(name);
  }
}
