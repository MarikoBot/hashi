import { Types } from 'mongoose';

/**
 * The automatic-role type.
 */
export type AutomaticRoleType = { _id: Types.ObjectId; discordId: string; roles: string[] };
