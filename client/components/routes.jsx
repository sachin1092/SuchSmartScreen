import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Root from 'root';

const loadRoute = callback => mod => callback(null, mod.default);

const errorLoading = err => console.error('Dynamic page loading failed', err);

ReactDOM.render((
    <Root />
), document.getElementById('root'));
