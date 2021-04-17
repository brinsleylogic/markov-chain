import ISourceProcessor from "./processor/ISourceProcessor";

/**
 * Model used to procedurally generate results based on input sources and processing rules.
 *
 * @export
 * @class MarkovModel
 * @template T
 */
export default class MarkovModel<T = any> {
    private _ngrams: { [token: string]: string[] };
    private _starters: string[][];
    private _sources: T[];

    private _processor: ISourceProcessor;
    private _order: number;

    /**
     * Adds a source to the Markov chain.
     *
     * @param {T} source Source to add.
     * @returns {this}
     * @memberof MarkovModel
     */
    public add(source: T): this {
        if (this._sources) {
            this._sources.push(source);
        } else {
            this._sources = [source];
        }

        return this;
    }

    /**
     * Trains the model using the provided sources.
     *
     * @param {IMarkovProcessor} processor Component responsible for processing the sources.
     * @param {number} [order=3] The order (n) of the Markov model.
     * @returns {this}
     * @memberof MarkovModel
     */
    public train(processor: ISourceProcessor, order?: number): this {
        this._processor = processor;
        this._order = (order == null || order < 0) ? 3 : order;

        this._ngrams = {};
        this._starters = [];

        let i = this._sources.length;

        while (i-- > 0) {
            this.process(this._sources[i], processor, this._order);
        }

        return this;
    }

    /**
     * Generates output based on the trained model.
     *
     * @param {number} [max] If supplied will cap the number of passes through the system before returning the result.
     * @returns {T}
     * @memberof MarkovModel
     */
    public generate(max?: number): T {
        const output = this._starters[Math.floor(Math.random() * this._starters.length)];

        let current = this._processor.combineTokens(output);
        let i = 0;

        while (!max || i++ < max) {
            const next = this.getNext(this._ngrams[current]);

            if (next == null) {
                break;
            }

            output.push(next);

            current = this._processor.combineTokens(output, this._order);
        }

        return this._processor.detokenise(output);
    }

    /**
     * Processes the supplied source and builds the ngrams.
     *
     * @private
     * @param {T} source The source to process.
     * @param {IMarkovProcessor} processor Component responsible for processing the sources.
     * @param {number} order The order (n) of the Markov model.
     * @memberof MarkovModel
     */
    private process(source: T, processor: ISourceProcessor, order: number): void {
        const tokens = processor.tokenise(source);

        for (let i = 0, l = tokens.length - order + 1; i < l; i++) {
            const current = tokens.slice(i, i + order);

            if (i === 0) {
                this._starters.push(current);
            }

            const token = this._processor.combineTokens(current);

            if (this._ngrams[token] == null) {
                this._ngrams[token] = [];
            }

            this._ngrams[token].push(tokens[i + order]);
        }
    }

    /**
     * Returns a random element from the supplied array using the number of occurances of unqiue values as a weighting.
     *
     * @param {string[]} tokens The data to use.
     * @returns {string}
     * @memberof MarkovModel
     */
    private getNext(tokens: string[]): string | undefined {
        if (tokens == null) {
            return;
        }

        if (tokens.length === 1) {
            return tokens[0];
        }

        // Build list of counts.
        const counts: { [token: string]: number } = {};
        const total = tokens.length;

        let i = total;

        while (i-- > 0) {
            const value = tokens[i];

            if (counts[value]) {
                counts[value]++;
            } else {
                counts[value] = 1;
            }
        }

        // Run a probability check.
        const test = Math.random();

        let cumulative = 0;

        i = total;

        while (i-- > 0) {
            const value = tokens[i];

            cumulative += counts[value];

            if (test <= cumulative / total) {
                return value;
            }
        }
    }
}