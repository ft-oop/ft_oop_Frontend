import { debounceFrame } from './debounceFrame';
function MyReact() {
  const options = {
    currentStateKey: 0,
    states: [],
    root: null,
    rootComponent: null,
  };

  function useState(initState) {
    const { currentStateKey: key, states } = options;
    if (states.length === key) states.push(initState);

    const state = states[key];
    const setState = (newState) => {
      states[key] = newState;
      _render();
    };
    options.currentStateKey += 1;
    return [state, setState];
  }

  const _render = debounceFrame(() => {
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;
    root.innerHTML = new rootComponent(root);
    options.currentStateKey = 0;
  });

  function render(rootComponent, root) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  return { useState, render };
}

export const { useState, render } = MyReact();
