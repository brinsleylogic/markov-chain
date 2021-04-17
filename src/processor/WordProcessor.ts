import ISourceProcessor from "./ISourceProcessor";

type InputType = string | string[];

/**
 * Used to generate strings by tokenising groups of words from source material.
 *
 * @export
 * @class CharacterProcessor
 * @implements {ISourceProcessor<InputType, string>}
 */
export default class WordProcessor implements ISourceProcessor<InputType, string> {
    /**
     * Used to split the words when tokenising.
     *
     * @type {string | RegExp}
     * @memberof WordProcessor
     */
    public splitExpression: string | RegExp;

    /**
     * Creates an instance of WordProcessor.
     *
     * @param {string | RegExp} [splitExpression=/\s+/] Used to split the words when tokenising input.
     * @memberof WordProcessor
     */
    public constructor(splitExpression: string | RegExp = /\s+/) {
        this.splitExpression = splitExpression;
    }

    /**
     * Returns a list of tokens representing the supplied data.
     *
     * @param {InputType} data The data to tokenise.
     * @returns {string[]}
     * @memberof WordProcessor
     */
    public tokenise(data: InputType): string[] {
        if (typeof data === "string") {
            return data.split(this.splitExpression);
        }

        const tokens = [];

        for (let i = 0, l = data.length; i < l; i++) {
            tokens.push(...data[i].split(this.splitExpression));
        }

        return tokens;
    }

    /**
     * Returns the data represented by the supplied tokens.
     *
     * @param {string[]} tokens Tokens to use.
     * @returns {string}
     * @memberof WordProcessor
     */
    public detokenise(tokens: string[]): string {
        return tokens.join(" ");
    }

    /**
     * Combines multiple tokens to create a complex key.
     *
     * @param {string[]} tokens Tokens to use.
     * @param {number} [order] The order (n) used for genertaing the ngrams in the model.
     * @returns {string} A single token.
     * @memberof WordProcessor
     */
    public combineTokens(tokens: string[], order?: number): string {
        if (!order) {
            return tokens.join(" ");
        }

        return tokens.slice(tokens.length - order).join(" ");
    }
}