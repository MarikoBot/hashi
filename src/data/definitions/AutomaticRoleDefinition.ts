import { Schema, Types } from 'mongoose';
import { AutomaticRoleEntry } from '../entries';
import { DataMapDefinition } from '../../base';

/**
 * The interface that includes all the properties of an automatic roles system.
 */
export const AutomaticRoleDefinition: DataMapDefinition<typeof AutomaticRoleStructure> = {
  name: 'automaticRole',
  entry: AutomaticRoleEntry,
  schema: new Schema<typeof AutomaticRoleStructure>({
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    discordId: {
      type: String,
      unique: true,
    },
    roles: { type: [String] },
  }),
  defaultValues: {
    _id: new Types.ObjectId(),
    discordId: '0',
    roles: [],
  },
};

/**
 * The automatic-role definition.
 */
export const AutomaticRoleStructure = {
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
