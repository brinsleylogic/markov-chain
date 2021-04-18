"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Used to generate strings by tokenising groups of characters from source material.
 *
 * @export
 * @class CharacterProcessor
 * @implements {ISourceProcessor<InputType, string>}
 */
var CharacterProcessor = /** @class */ (function () {
    function CharacterProcessor() {
    }
    /**
     * Returns a list of tokens representing the supplied data.
     *
     * @param {InputType} data The data to tokenise.
     * @returns {string[]}
     * @memberof CharacterProcessor
     */
    CharacterProcessor.prototype.tokenise = function (data) {
        if (typeof data === "number") {
            return data.toString().split("");
        }
        if (typeof data === "string") {
            return data.split("");
        }
        var tokens = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var datum = data[i];
            if (typeof datum === "number") {
                tokens.push.apply(tokens, datum.toString().split(""));
            }
            else {
                tokens.push.apply(tokens, datum.split(""));
            }
        }
        return tokens;
    };
    /**
     * Returns the data represented by the supplied tokens.
     *
     * @param {string[]} tokens Tokens to use.
     * @returns {string}
     * @memberof CharacterProcessor
     */
    CharacterProcessor.prototype.detokenise = function (tokens) {
        return tokens.join("");
    };
    /**
     * Combines multiple tokens to create a complex key.
     *
     * @param {string[]} tokens Tokens to use.
     * @param {number} [order] The order (n) used for genertaing the ngrams in the model.
     * @returns {string} A single token.
     * @memberof CharacterProcessor
     */
    CharacterProcessor.prototype.combineTokens = function (tokens, order) {
        if (!order) {
            return tokens.join("");
        }
        var joined = tokens.join("");
        return joined.slice(joined.length - order);
    };
    return CharacterProcessor;
}());
exports.default = CharacterProcessor;
