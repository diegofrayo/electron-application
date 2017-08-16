// electron
import {
  shell,
} from 'electron';

// npm libs
import jQuery from 'jquery';

// electron-events
import {
  sendIpcRendererEvent,
} from './../electron/ipc-renderer-events.js';

// app
import store from './../app/store.js';

const printCategory = category =>
  `
<div class="category">
  <h3 class="category__title">${category.category_name}</h3>
  <div class="category__bookmarks">
    ${Object.keys(category.bookmarks).map(key => (
    `<div class="bookmark" data-url="${category.bookmarks[key].url}">
      <i class="material-icons bookmark__icon">link</i>
      <span class="bookmark__title">${category.bookmarks[key].title}</span>
    </div>`
  )).reduce((prevValue, currentValue) => prevValue + currentValue, '')}
  <div>
</div>`;

export default function project() {

  const projectView = jQuery('.project-view');
  const projectContent = projectView.find('.project-content');

  const state = store.getStore();
  const selectedProject = state.projects[state.selectedProject];

  Object.keys(selectedProject.bookmarks)
    .forEach(key => projectContent.append(printCategory(selectedProject.bookmarks[key])));

  projectView.find('.project-title').text(selectedProject.title);

  projectView.find('.btn-open-file').click(() => {
    sendIpcRendererEvent();
  });

  projectView.find('.bookmark').click((event) => {
    shell.openExternal(jQuery(event.currentTarget).data('url'));
  });

  return projectView;
}
