// src/stores/index.js，所有的 store 都在这里注册
import common from './common';
import Store from '@ice/store';
import logger from '@ice/store-logger';
const storeManager = new Store();
const middlewares = [];

// Turn off logger middleware in production enviroment
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

storeManager.applyMiddleware(middlewares);

storeManager.registerStore('common', common);

export default storeManager;
export * from './Context'