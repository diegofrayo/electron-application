// npm libs
import jQuery from 'jquery';

// app
import firebase from './../app/firebase.js';
import router from './../app/router.js';
import store from './../app/store.js';

const printProject = (project, id) =>
  `
<div class="project" data-id="${id}">
  <i class="material-icons project__icon">folder_shared</i>
  <span class="project__name">${project.name}</span>
</div>
`;

export default function home() {

  let homeView = jQuery('.home-view');

  const renderProjects = () => {

    const projects = store.getStore().projects;

    const projectsHtml = Object.keys(projects)
      .map(key => printProject(projects[key], key))
      .reduce((prevValue, currentValue) => prevValue + currentValue, '');

    homeView.find('.projects-list').html(projectsHtml);

    homeView.find('.project').click((event) => {
      store.getStore().selectedProject = jQuery(event.currentTarget).data('id');
      router.redirect(router.routes.PROJECT);
    });
  };

  homeView.find('.form').submit((event) => {

    event.preventDefault();

    const form = event.target.elements;
    const projectName = form.namedItem('name').value;

    if (projectName) {
      firebase.createProject(projectName);
    }
  });

  store.subscribe({
    viewName: 'home',
    callback: renderProjects,
  });

  renderProjects();

  return {
    destroy: () => {
      store.desubscribe('home');
      homeView = null;
    },
  };
}
