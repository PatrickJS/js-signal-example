// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `
<h1>JS Starter</h1>
<div id="my-text-id">
  Hello world
  <input id="input-id" value="Original Value">
  <div>
    <button onclick="updateFn(this)">update</button>
  </div>
  <div>----</div>
</div>
`;

// Initialize variable
const state = {
  _subs: [],
  _value: 'Original Value',
  get value() {
    return this._value;
  },
  set value(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this._subs.forEach((fn) => fn(newValue, oldValue));
  },
};
window.state = state;

// Create text node with empty text
let textNode = document.createTextNode(state.value);

// Append text node to the body or any other element
const el = document.getElementById('my-text-id');
el.appendChild(textNode);

state._subs.push((newValue) => {
  textNode.textContent = newValue;
});

// Test it by changing window.myRealValue
state.value = 'New Value'; // The text node will update to "New Value"

const inputEl = document.getElementById('input-id');
window.updateFn = () => {
  console.log(arguments);
  const value = inputEl.value;
  state.value = value;
  inputEl.value = '';
};
