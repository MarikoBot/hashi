import { DB_TECHNOLOGY, DataMap, PossibleDataMapStored } from './DataMap';

/**
 * The SQLite database technology class for Hashi.
 */
export class DBSQLite extends DataMap<PossibleDataMapStored> {
  /**
   * The constructor for the SQLite technology.
   * @param name The name of the collection.
   */
  constructor(name: string) {
    super(name, DB_TECHNOLOGY.SQLITE);
  }
}
