const store = {
  data: {
    projects: {},
  },
  observers: {},
};

export default {
  getStore: () => store.data,
  dispatch: (viewName) => {
    if (store.observers[viewName]) {
      store.observers[viewName]();
    }
  },
  subscribe: ({
    viewName,
    callback,
  }) => {
    store.observers[viewName] = callback;
  },
  desubscribe: (viewName) => {
    store.observers[viewName] = null;
  },
  update: (updater) => {
    store.data = Object.assign({}, store.data, updater);
  },
};
