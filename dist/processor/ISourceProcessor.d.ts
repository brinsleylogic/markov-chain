/**
 * Defines a component used to interpret data for training the model and generating results.
 *
 * @export
 * @interface ISourceProcessor
 * @template InType The type of the incoming data that will be tokenised.
 * @template OutType the type of the outgoing data that is returned when detokenising.
 */
export default interface ISourceProcessor<InType = any, OutType = InType> {
    /**
     * Returns a list of tokens representing the supplied data.
     *
     * @param {InType} data The data to tokenise.
     * @returns {string[]} The tokens egenrated by the supplied data.
     * @memberof ISourceProcessor
     */
    tokenise(data: InType): string[];
    /**
     * Returns the data represented by the supplied tokens.
     *
     * @param {string[]} tokens Tokens to use.
     * @returns {OutType}
     * @memberof ISourceProcessor
     */
    detokenise(tokens: string[]): OutType;
    /**
     * Combines multiple tokens to create a complex key.
     *
     * @param {string[]} tokens Tokens to use.
     * @param {number} [order] The order (n) used for genertaing the ngrams in the model.
     * @returns {string} A single token.
     * @memberof ISourceProcessor
     */
    combineTokens(tokens: string[], order?: number): string;
}
