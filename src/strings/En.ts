import { LanguageContent } from '../base/';

/**
 * Pack of all the strings used in important parts of the bot code.
 */
export const strings: LanguageContent = <const>{
  activeInterfering: `❌ You can't execute this command while [[]] are used.`,
  activeCoolDown: `⏳ Chill! The command **/[[]]** can't be executed right now, waiting time: <t:[[]]:R>.`,
  privilegesLocked: `🔑 This command is locked in this context.\n\`\`\`diff\n- Privileges code: [[]]\`\`\``,
};

export default strings;
