import vuetify from './vuetify';
import pinia from '@/stores';
import router from '@/router';
import apolloClient from './apollo';

import { DefaultApolloClient } from '@vue/apollo-composable';

export function registerPlugins (app) {
  return app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .provide(DefaultApolloClient, apolloClient);
}
