# markov-chain
A Markov Chain implementation written in TypeScript, with the intention of being somewhat extensible.

## Demo usage

```js
const markov = require("markov-chain");

const model = new markov.MarkovModel();
model.add("Today is sunny")
model.add("Today is rainy")
model.add("Tomorrow is snowy")
model.train(new markov.processor.CharacterProcessor());

console.log(model.generate()); // Could output: "Tomorrow is sunny"
```