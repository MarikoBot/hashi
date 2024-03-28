import { Document, Model, Schema, SchemaDefinition, SchemaDefinitionProperty } from 'mongoose';
import { Validators } from '../decorators';
import { InstanceValidator } from '../decorators/shared';
import { SuperModelColumn } from './';
import { Placeholder } from './Placeholder';

/**
 * A type-structure that represents a column or an object of columns.
 */
export type StructureColumnOrChild = { [key: string]: SuperModelColumn | StructureColumnOrChild };

/**
 * The class that combines a model and a schema.
 */
export class SuperModel {
  /**
   * The list of the columns of the collection.
   */
  @((<(superModelColumn: typeof SuperModelColumn) => InstanceValidator>(
    Validators.ObjectValidator.KeySuperModelColumnPair
  ))(SuperModelColumn))
  public columns: StructureColumnOrChild;

  /**
   * The model class content.
   */
  @((<(arg: typeof Model<SchemaDefinition & Document>, placeholder: typeof Placeholder) => InstanceValidator>(
    Validators.ObjectValidator.KindOfInstance
  ))(Model, Placeholder))
  public readonly model: Model<SchemaDefinition & Document>;

  /**
   * The schema class content.
   */
  @((<(arg: typeof Schema<any>, placeholder: typeof Placeholder) => InstanceValidator>(
    Validators.ObjectValidator.KindOfInstance
  ))(Schema, Placeholder))
  public readonly schema: Schema<SchemaDefinition>;

  /**
   * The model name (the name of the collection).
   */
  @(<InstanceValidator>Validators.StringValidator.ValidId)
  public readonly name: string = 'default';

  /**
   * The structure of the model.
   */
  @(<InstanceValidator>Validators.ObjectValidator.Matches)
  public structure: { [p: string]: SchemaDefinitionProperty };

  /**
   * The default values of the model.
   */
  @(<InstanceValidator>Validators.ObjectValidator.Matches)
  public defaultValues: { [p: string]: any };

  /**
   * @param name The name of the model.
   */
  constructor(name: string) {
    this.name = name;

    this.structure = SuperModel.diveObject(this.columns, 'data');
    this.defaultValues = SuperModel.diveObject(this.columns, 'defaultValue');

    this.schema = new Schema<typeof this.structure>(this.structure, this.defaultValues);
  }

  /**
   * Generates a new object based on the property you chose to take into the current instance-value.
   * @param obj The object to dive in.
   * @param propertyName The name of the property to take into the value.
   * @returns An object (the finale one or a child).
   */
  public static diveObject(obj: object, propertyName: string) {
    if (obj instanceof SuperModelColumn) return obj[propertyName];

    if (typeof obj === 'object' && obj !== null) {
      const result: any = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) result[key] = SuperModel.diveObject(obj[key], propertyName);
      }

      return result;
    }

    return obj;
  }
}
