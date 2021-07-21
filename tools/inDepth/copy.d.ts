/** Will work with:
 * Array
 * Set
 * Map
 * Date
 * Plain object
 *
 * Any primary type.
 *
 * Best effort for object of custom class.
 */
export declare const copy: <T>(obj: T, options?: {
    freeze: boolean;
}) => T;
