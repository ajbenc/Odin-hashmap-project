import HashMap from "./hashMap.js";

const hashMap = new HashMap();

if (typeof "apple" !== "string" || "red" === undefined) {
  throw new Error(
    "Invalid input: Key must be a string and value must be defined"
  );
}
hashMap.set("apple", "red");
if (typeof "banana" !== "string" || "yellow" === undefined) {
  throw new Error(
    "Invalid input: Key must be a string and value must be defined"
  );
}
hashMap.set("banana", "yellow");
if (typeof "carrot" !== "string" || "orange" === undefined) {
  throw new Error(
    "Invalid input: Key must be a string and value must be defined"
  );
}
hashMap.set("carrot", "orange");
console.log(hashMap.get("apple")); // red
console.log(hashMap.has("banana")); // true
console.log(hashMap.keys()); // ['apple', 'banana', 'carrot']

try {
  hashMap.set("moon", "silver"); // Triggers resize
} catch (error) {
  console.error("Failed to set value:", error);
}
console.log(hashMap.length()); // 4

hashMap.remove("carrot");
console.log(hashMap.entries()); // [['apple', 'red'], ['banana', 'yellow'], ['moon', 'silver']]
