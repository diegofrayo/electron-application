const store = {
  projects: {
    alfred: {
      title: 'Alfred',
      bookmarks: {
        code: {
          category_name: 'Code',
          bookmarks: {
            1: {
              title: 'Github',
              url: 'http://github.com',
            },
            2: {
              title: 'Github',
              url: 'http://github.com',
            },
            3: {
              title: 'Github',
              url: 'http://github.com',
            },
          },
        },
        communication: {
          category_name: 'Communication',
          bookmarks: {
            1: {
              title: 'Slack',
              url: 'http://slack.com',
            },
            2: {
              title: 'Slack',
              url: 'http://slack.com',
            },
            3: {
              title: 'Slack',
              url: 'http://slack.com',
            },
          },
        },
      },
    },
    pllay: {
      title: 'Pllay',
      bookmarks: {
        code: {
          category_name: 'Code',
          bookmarks: {
            1: {
              title: 'Github',
              url: 'http://github.com',
            },
          },
        },
        communication: {
          category_name: 'Communication',
          bookmarks: {
            1: {
              title: 'Slack',
              url: 'http://slack.com',
            },
          },
        },
      },
    },
    'title-toolbox': {
      title: 'Title Toolbox',
      bookmarks: {
        code: {
          category_name: 'Code',
          bookmarks: {
            1: {
              title: 'Github',
              url: 'http://github.com',
            },
          },
        },
        communication: {
          category_name: 'Communication',
          bookmarks: {
            1: {
              title: 'Slack',
              url: 'http://slack.com',
            },
          },
        },
      },
    },
  },
};

export default {
  getStore: () => store,
};
