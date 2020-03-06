import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404! The panda ate this page!
    <Link to="/">Go home!</Link>
  </div>
);

export default NotFoundPage;