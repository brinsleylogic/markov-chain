import MarkovModel from "./MarkovModel";
import WordProcessor from "./processor/WordProcessor";

/**
 * Shorthand function to process the supplied text sources and generate results using whle words.
 *
 * @export
 * @param {...string[]} sources the sources used to train the model.
 * @returns {string}
 */
export default function(...sources: string[]): string {
    const chain = new MarkovModel<string>();

    let i = sources.length;

    while (i-- > 0) {
        chain.add(sources[i]);
    }

    return chain.train(new WordProcessor()).generate();
}