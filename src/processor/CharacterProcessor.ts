import ISourceProcessor from "./ISourceProcessor";

type InputType = string | string[] | number | number[];

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
     public tokenise(data: InputType): string[] {
        if (typeof data === "number") {
            return data.toString().split("");
        }

        if (typeof data === "string") {
            return data.split("");
        }

        const tokens = [];

        for (let i = 0, l = data.length; i < l; i++) {
            const datum = data[i];

            if (typeof datum === "number") {
                tokens.push(...datum.toString().split(""));
            } else {
                tokens.push(...datum.split(""));
            }
        }

        return tokens;
    }

    /**
     * Returns the data represented by the supplied tokens.
     *
     * @param {string[]} tokens Tokens to use.
     * @returns {string}
     * @memberof CharacterProcessor
     */
    public detokenise(tokens: string[]): string {
        return tokens.join("");
    }

    /**
     * Combines multiple tokens to create a complex key.
     *
     * @param {string[]} tokens Tokens to use.
     * @param {number} [order] The order (n) used for genertaing the ngrams in the model.
     * @returns {string} A single token.
     * @memberof CharacterProcessor
     */
    public combineTokens(tokens: string[], order?: number): string {
        if (!order) {
            return tokens.join("");
        }

        const joined = tokens.join("");

        return joined.slice(joined.length - order);
    }
}