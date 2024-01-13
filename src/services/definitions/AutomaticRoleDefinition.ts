import { Schema, Types } from 'mongoose';
import { DataMapDefinition } from '../../base';

/**
 * The automatic-role definition.
 */
export const AutomaticRoleSchema = {
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    unique: true,
  },
  discordId: {
    type: String,
    unique: true,
  },
  roles: { type: [String] },
};

/**
 * The interface that includes all the properties of an automatic roles system.
 */
export const AutomaticRoleDefinition: DataMapDefinition<typeof AutomaticRoleSchema> = {
  schema: new Schema<typeof AutomaticRoleSchema>(AutomaticRoleSchema),
  defaultValues: {
    _id: new Types.ObjectId(),
    discordId: '0',
    roles: [],
  },
};
