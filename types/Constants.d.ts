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
 * The main class for managing the configuring constants for the bot.
 */
export declare class Constants {
    /**
     * The color list.
     */
    Colors: MainColors;
    /**
     * The custom color list (added manually by the user).
     */
    CustomColors: Record<string, number>;
}
