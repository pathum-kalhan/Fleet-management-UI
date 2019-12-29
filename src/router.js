import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';


Vue.use(Router);

// export default router;

const router = new Router({
  mode: 'history',
  routes,

})
import store from './store';

router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.permissions)) {
    
    if (store.state['token']) {
      if (to.meta.permissions.includes(store.state['role'])) {
        next()
      } else {
        store.dispatch('logout')
        next('/')
      }
    } else {
      store.dispatch('logout')

      next('/');
    }
  } else {
    
    next();
  }
})

export default router;

