import ISourceProcessor from "./processor/ISourceProcessor";
/**
 * Model used to procedurally generate results based on input sources and processing rules.
 *
 * @export
 * @class MarkovModel
 * @template T
 */
export default class MarkovModel<T = any> {
    private _ngrams;
    private _starters;
    private _sources;
    private _processor;
    private _order;
    /**
     * Adds a source to the Markov chain.
     *
     * @param {T} source Source to add.
     * @returns {this}
     * @memberof MarkovModel
     */
    add(source: T): this;
    /**
     * Trains the model using the provided sources.
     *
     * @param {IMarkovProcessor} processor Component responsible for processing the sources.
     * @param {number} [order=3] The order (n) of the Markov model.
     * @returns {this}
     * @memberof MarkovModel
     */
    train(processor: ISourceProcessor, order?: number): this;
    /**
     * Generates output based on the trained model.
     *
     * @param {number} [max] If supplied will cap the number of passes through the system before returning the result.
     * @returns {T}
     * @memberof MarkovModel
     */
    generate(max?: number): T;
    /**
     * Processes the supplied source and builds the ngrams.
     *
     * @private
     * @param {T} source The source to process.
     * @param {IMarkovProcessor} processor Component responsible for processing the sources.
     * @param {number} order The order (n) of the Markov model.
     * @memberof MarkovModel
     */
    private process;
    /**
     * Returns a random element from the supplied array using the number of occurances of unqiue values as a weighting.
     *
     * @param {string[]} tokens The data to use.
     * @returns {string}
     * @memberof MarkovModel
     */
    private getNext;
}
