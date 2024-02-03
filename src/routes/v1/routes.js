const express = require('express');

const router = express.Router();
const moduleRoutes = require('./module.route');
const roleRoutes = require('./role.route');
const auth0Routes = require('./auth0.route');
const userRoutes = require('./user.route');

function registerRoutes(sRouter, routes, currentPath = '') {
  routes.forEach((route) => {
    const routePath = currentPath + route.path;

    sRouter.use(routePath, route.route);
    if (route.children) {
      registerRoutes(sRouter, route.children, routePath);
    }
  });
}

const defaultRoutes = [
  {
    path: '/auth',
    route: auth0Routes,
  },
  {
    path: '/module',
    route: moduleRoutes,
  },
  {
    path: '/role',
    route: roleRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  // {
  //   path: "/user_organisatie",
  //   route: user_organisatieRoutes,
  //   children: [
  //     {
  //       path: "/vestiging",
  //       route: vestigingRoutes.userRouter,
  //     },
  //   ],
  // },
];

registerRoutes(router, defaultRoutes);

module.exports = router;
