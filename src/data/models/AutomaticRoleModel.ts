import { Document, Schema, SchemaDefinition, model, Model } from 'mongoose';
import { AutomaticRoleDefinition } from '../definitions';

export const AutomaticRoleModel: Model<SchemaDefinition & Document> = model<SchemaDefinition & Document>(
  'automaticRole',
  <Schema>AutomaticRoleDefinition.schema,
);
