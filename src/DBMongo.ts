// noinspection JSUnusedGlobalSymbols

import { DB_TECHNOLOGY, DataMap, PossibleDataMapStored } from './DataMap';

/**
 * The SQLite database technology class for Hashi.
 */
export class DBMongo<IStructure extends PossibleDataMapStored> extends DataMap<IStructure> {
  /**
   * The constructor for the MongoDB technology.
   * @param name The name of the collection.
   */
  constructor(name: string) {
    super(name, DB_TECHNOLOGY.MONGODB);
  }
}
