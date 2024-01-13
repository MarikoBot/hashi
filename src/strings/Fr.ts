import { LanguageContent } from '../base/LanguageManager';

/**
 * Pack of all the strings used in important parts of the bot code.
 */
const strings: LanguageContent = <const>{
  activeInterfering: `❌ Vous ne pouvez pas exécuter cette commande tant que les commandes [[]] sont en cours d'utilisation.`,
  activeCoolDown: `⏳ Doucement ! La commande **/[[]]** ne peut pas être exécutée de nouveau, temps d'attente: <t:[[]]:R>.`,
  privilegesLocked: `🔑 Cette commande est verrouillée dans ce contexte.\n\`\`\`diff\n- Code privilèges: [[]]\`\`\``,
};

export default strings;
