// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = /*html*/ `
<h1>JS Starter</h1>
<div id="my-text-id">
  Hello world
  <form onsubmit="updateFn(event, this)">
    <input id="input-id" value="Original Value">
    <button type="submit">update</button>
  </form>
  <div>
  </div>
  <div>----</div>

</div>
`;

// Initialize variable
// const signal = {
//   _subs: [],
//   _value: "Original Value",
//   get value() {
//     return this._value;
//   },
//   set value(newValue) {
//     const oldValue = this._value;
//     this._value = newValue;
//     this._subs.forEach((fn) => fn(newValue, oldValue));
//   },
// };

function createSignal(defaultValue) {
  const signal = {
    _subs: [],
    _value: defaultValue,
    get value() {
      return this._value;
    },
    set value(newValue) {
      const oldValue = this._value;
      this._value = newValue;
      this._subs.forEach((fn) => fn(newValue, oldValue));
    },
  };
  return signal;
}
window.signal = createSignal("Original Value");

// Create text node with empty text
const textSignal = createSignal("Original Value");
let textNode = document.createTextNode(textSignal.value);

// Append text node to the body or any other element
const el = document.getElementById("my-text-id");
el.appendChild(textNode);

// register
textSignal._subs.push((newValue) => {
  textNode.textContent = newValue;
});

// update value
textSignal.value = "New Value";
// The text node will update to "New Value"

const inputEl = document.getElementById("input-id");

window.updateFn = (event) => {
  event.preventDefault();
  const value = inputEl.value;
  textSignal.value = value;
  inputEl.value = "";
};
