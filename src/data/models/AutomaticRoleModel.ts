import { Document, Schema, model, Model, SchemaDefinition } from 'mongoose';
import { AutomaticRoleDefinition } from '../definitions';

export const AutomaticRoleModel: Model<SchemaDefinition & Document> = model<SchemaDefinition & Document>(
  'automaticRole',
  <Schema>AutomaticRoleDefinition.schema,
);
