// noinspection JSUnusedGlobalSymbols

/**
 * The main class for managing the configuring constants for the bot.
 */
export class Constants {
  /**
   * The color list.
   */
  public readonly Colors: MainColors = {
    RED: 0xff4848,
    ORANGE: 0xff7526,
    YELLOW: 0xffec80,
    GREEN: 0x36ff6d,
    BLUE: 0x454bff,
    PURPLE: 0xc167ff,
    WHITE: 0xebebeb,
    DARK: 0x2c2d31,
  };

  /**
   * The custom color list (added manually by the user).
   */
  public CustomColors: Record<string, number> = {};
}

/**
 * The list of available colors.
 */
export interface MainColors {
  RED: number;
  ORANGE: number;
  YELLOW: number;
  GREEN: number;
  BLUE: number;
  PURPLE: number;
  WHITE: number;
  DARK: number;
}

/**
 * The pair of paths based on the environment.
 */
export type EnvPath = Record<'lab' | 'prod', string>;
