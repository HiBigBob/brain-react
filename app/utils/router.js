import Router from 'react-router';
import routes from 'utils/routes';

var config = {routes};
if (process.env.BROWSER) {
  config.location = Router.HistoryLocation;
}

const router = Router.create(config);

export default router;
