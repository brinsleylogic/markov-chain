"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model used to procedurally generate results based on input sources and processing rules.
 *
 * @export
 * @class MarkovModel
 * @template T
 */
var MarkovModel = /** @class */ (function () {
    function MarkovModel() {
    }
    /**
     * Adds a source to the Markov chain.
     *
     * @param {T} source Source to add.
     * @returns {this}
     * @memberof MarkovModel
     */
    MarkovModel.prototype.add = function (source) {
        if (this._sources) {
            this._sources.push(source);
        }
        else {
            this._sources = [source];
        }
        return this;
    };
    /**
     * Trains the model using the provided sources.
     *
     * @param {IMarkovProcessor} processor Component responsible for processing the sources.
     * @param {number} [order=3] The order (n) of the Markov model.
     * @returns {this}
     * @memberof MarkovModel
     */
    MarkovModel.prototype.train = function (processor, order) {
        this._processor = processor;
        this._order = (order == null || order < 0) ? 3 : order;
        this._ngrams = {};
        this._starters = [];
        var i = this._sources.length;
        while (i-- > 0) {
            this.process(this._sources[i], processor, this._order);
        }
        return this;
    };
    /**
     * Generates output based on the trained model.
     *
     * @param {number} [max] If supplied will cap the number of passes through the system before returning the result.
     * @returns {T}
     * @memberof MarkovModel
     */
    MarkovModel.prototype.generate = function (max) {
        var output = this._starters[Math.floor(Math.random() * this._starters.length)];
        var current = this._processor.combineTokens(output);
        var i = 0;
        while (!max || i++ < max) {
            var next = this.getNext(this._ngrams[current]);
            if (next == null) {
                break;
            }
            output.push(next);
            current = this._processor.combineTokens(output, this._order);
        }
        return this._processor.detokenise(output);
    };
    /**
     * Processes the supplied source and builds the ngrams.
     *
     * @private
     * @param {T} source The source to process.
     * @param {IMarkovProcessor} processor Component responsible for processing the sources.
     * @param {number} order The order (n) of the Markov model.
     * @memberof MarkovModel
     */
    MarkovModel.prototype.process = function (source, processor, order) {
        var tokens = processor.tokenise(source);
        for (var i = 0, l = tokens.length - order + 1; i < l; i++) {
            var current = tokens.slice(i, i + order);
            if (i === 0) {
                this._starters.push(current);
            }
            var token = this._processor.combineTokens(current);
            if (this._ngrams[token] == null) {
                this._ngrams[token] = [];
            }
            this._ngrams[token].push(tokens[i + order]);
        }
    };
    /**
     * Returns a random element from the supplied array using the number of occurances of unqiue values as a weighting.
     *
     * @param {string[]} tokens The data to use.
     * @returns {string}
     * @memberof MarkovModel
     */
    MarkovModel.prototype.getNext = function (tokens) {
        if (tokens == null) {
            return;
        }
        if (tokens.length === 1) {
            return tokens[0];
        }
        // Build list of counts.
        var counts = {};
        var total = tokens.length;
        var i = total;
        while (i-- > 0) {
            var value = tokens[i];
            if (counts[value]) {
                counts[value]++;
            }
            else {
                counts[value] = 1;
            }
        }
        // Run a probability check.
        var test = Math.random();
        var cumulative = 0;
        i = total;
        while (i-- > 0) {
            var value = tokens[i];
            cumulative += counts[value];
            if (test <= cumulative / total) {
                return value;
            }
        }
    };
    return MarkovModel;
}());
exports.default = MarkovModel;
