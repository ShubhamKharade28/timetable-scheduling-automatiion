
import { model } from "./langchain_config.js";

const res = await model.invoke("what is abstraction in oops!");

console.log(res.content);