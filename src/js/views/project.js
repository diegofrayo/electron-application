// electron
import {
  ipcRenderer,
  shell,
  clipboard,
} from 'electron';
import electronSettings from 'electron-settings';

// npm libs
import jQuery from 'jquery';

// electron-events
import ipcRendererEvents from './../electron/ipc-renderer-events.js';

// app
import firebase from './../app/firebase.js';
import store from './../app/store.js';

const printCategory = (categoryName, bookmarks) => (`
<div class="category">
  <h4 class="category__name">${categoryName}</h4>
  <div class="category__bookmarks">
    ${bookmarks.map(bookmark => (
    `<div class="bookmark" data-url="${bookmark.url}" title="${bookmark.url}">
      <i class="material-icons bookmark__icon">link</i>
      <i class="material-icons bookmark__icon-remove" data-id="${bookmark.id}">clear</i>
      <div class="bookmark__inner-container">
        <span class="bookmark__name u-cut-text">${bookmark.name}</span>
        <span class="bookmark__url u-cut-text">${bookmark.url}</span>
      </div>
    </div>`
  )).reduce((prevValue, currentValue) => prevValue + currentValue, '')}
  <div>
</div>`);

const updateSelectedFilePath = (projectView, filePath = '') => {
  projectView.find('.project-file-path').text(filePath).attr('title', filePath);
};

const normalizeBookmarks = (bookmarks = {}) => {

  const categories = {};

  Object.keys(bookmarks)
    .forEach((key) => {
      const bookmark = Object.assign({}, bookmarks[key]);
      bookmark.id = key;
      if (categories[bookmark.category] === undefined) {
        categories[bookmark.category] = [];
      }
      categories[bookmark.category].push(bookmark);
    });

  return categories;
};

export default function project() {

  const projectView = jQuery('.project-view');
  let state = store.getStore();
  let selectedProject = state.projects[state.selectedProject];

  const render = () => {

    state = store.getStore();
    selectedProject = state.projects[state.selectedProject];

    const bookmarks = normalizeBookmarks(selectedProject.bookmarks);
    const projectContent = projectView.find('.project-bookmarks').html('');

    Object.keys(bookmarks)
      .forEach(key => projectContent.append(printCategory(key, bookmarks[key])));

    projectView.find('.bookmark').click((event) => {
      shell.openExternal(jQuery(event.currentTarget).data('url'));
    });

    projectView.find('.bookmark__icon-remove').click((event) => {
      event.stopPropagation();
      event.preventDefault();
      firebase.deleteBookmark(state.selectedProject, jQuery(event.currentTarget).data('id'));
    });
  };

  projectView.find('.page-title').text(selectedProject.name);
  updateSelectedFilePath(projectView, electronSettings.get('file-path'));

  projectView.find('.btn-open-file').click(() => {
    const path = electronSettings.get('file-path');
    ipcRendererEvents.openFile(path);
    // if (!path) {
    // } else {
    //   ipcRenderer.send('text-file-selected', [path]);
    // }
  });

  projectView.find('.btn-clear-path').click(() => {
    electronSettings.set('file-path', '');
    updateSelectedFilePath(projectView);
  });

  projectView.find('.form').submit((event) => {

    event.preventDefault();

    const form = event.target.elements;
    const boomarkCategory = form.namedItem('category').value;
    const boomarkName = form.namedItem('name').value;
    const boomarkUrl = form.namedItem('url').value;

    if (boomarkCategory && boomarkName && boomarkUrl) {
      firebase.createBookmark({
        projectId: state.selectedProject,
        boomarkCategory,
        boomarkName,
        boomarkUrl,
      });
      form.namedItem('name').value = '';
      form.namedItem('url').value = '';
    }
  });

  projectView.find('#url').focus((event) => {
    if (!event.target.value) {
      jQuery(event.target).val(clipboard.readText());
    }
  });

  ipcRenderer.on('text-file-selected', (event, filePath) => {
    updateSelectedFilePath(projectView, filePath);
  });

  store.subscribe({
    viewName: 'project',
    callback: render,
  });

  render();

  return {
    destroy: () => {
      store.desubscribe('project');
    },
  };
}
