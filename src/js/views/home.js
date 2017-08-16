// npm libs
import jQuery from 'jquery';

// app
import router from './../app/router.js';
import store from './../app/store.js';

const printProject = (project, id) =>
  `
<div class="project" data-id="${id}">
  <i class="material-icons project__icon">folder_shared</i>
  <span class="project__title">${project.title}</span>
</div>
`;

export default function home() {

  const homeView = jQuery('.home-view');

  const projects = store.getStore().projects;

  const projectsHtml = Object.keys(projects)
    .map(key => printProject(projects[key], key))
    .reduce((prevValue, currentValue) => prevValue + currentValue, '');

  homeView.find('.projects-list').html(projectsHtml);

  homeView.find('.project').click((event) => {
    store.getStore().selectedProject = jQuery(event.currentTarget).data('id');
    router.redirect(router.routes.PROJECT);
  });

  homeView.find('.form').submit((event) => {
    event.preventDefault();
  });

  return homeView;
}
