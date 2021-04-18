import ISourceProcessor from "./ISourceProcessor";
declare type InputType = string | string[] | number | number[];
/**
 * Used to generate strings by tokenising groups of characters from source material.
 *
 * @export
 * @class CharacterProcessor
 * @implements {ISourceProcessor<InputType, string>}
 */
export default class CharacterProcessor implements ISourceProcessor<InputType, string> {
    /**
     * Returns a list of tokens representing the supplied data.
     *
     * @param {InputType} data The data to tokenise.
     * @returns {string[]}
     * @memberof CharacterProcessor
     */
    tokenise(data: InputType): string[];
    /**
     * Returns the data represented by the supplied tokens.
     *
     * @param {string[]} tokens Tokens to use.
     * @returns {string}
     * @memberof CharacterProcessor
     */
    detokenise(tokens: string[]): string;
    /**
     * Combines multiple tokens to create a complex key.
     *
     * @param {string[]} tokens Tokens to use.
     * @param {number} [order] The order (n) used for genertaing the ngrams in the model.
     * @returns {string} A single token.
     * @memberof CharacterProcessor
     */
    combineTokens(tokens: string[], order?: number): string;
}
export {};
