import { model } from "./langchain_config.js";

let res = await model.invoke("Hi, how are you?");
console.log(res.text);