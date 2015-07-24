import React from 'react';
import router from './utils/router';
import './style.css';

router.run(
  (Handler) => {
    const app = React.createElement(Handler);
    React.render(app, document.body);
});
