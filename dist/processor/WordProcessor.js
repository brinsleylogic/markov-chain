"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Used to generate strings by tokenising groups of words from source material.
 *
 * @export
 * @class CharacterProcessor
 * @implements {ISourceProcessor<InputType, string>}
 */
var WordProcessor = /** @class */ (function () {
    /**
     * Creates an instance of WordProcessor.
     *
     * @param {string | RegExp} [splitExpression=/\s+/] Used to split the words when tokenising input.
     * @memberof WordProcessor
     */
    function WordProcessor(splitExpression) {
        if (splitExpression === void 0) { splitExpression = /\s+/; }
        this.splitExpression = splitExpression;
    }
    /**
     * Returns a list of tokens representing the supplied data.
     *
     * @param {InputType} data The data to tokenise.
     * @returns {string[]}
     * @memberof WordProcessor
     */
    WordProcessor.prototype.tokenise = function (data) {
        if (typeof data === "string") {
            return data.split(this.splitExpression);
        }
        var tokens = [];
        for (var i = 0, l = data.length; i < l; i++) {
            tokens.push.apply(tokens, data[i].split(this.splitExpression));
        }
        return tokens;
    };
    /**
     * Returns the data represented by the supplied tokens.
     *
     * @param {string[]} tokens Tokens to use.
     * @returns {string}
     * @memberof WordProcessor
     */
    WordProcessor.prototype.detokenise = function (tokens) {
        return tokens.join(" ");
    };
    /**
     * Combines multiple tokens to create a complex key.
     *
     * @param {string[]} tokens Tokens to use.
     * @param {number} [order] The order (n) used for genertaing the ngrams in the model.
     * @returns {string} A single token.
     * @memberof WordProcessor
     */
    WordProcessor.prototype.combineTokens = function (tokens, order) {
        if (!order) {
            return tokens.join(" ");
        }
        return tokens.slice(tokens.length - order).join(" ");
    };
    return WordProcessor;
}());
exports.default = WordProcessor;
