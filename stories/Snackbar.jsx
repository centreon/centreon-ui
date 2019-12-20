import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorSnackbar from '../src/Snackbar/Error';

storiesOf('Snackbar', module).add('Error', () => (
  <ErrorSnackbar open message="Something unexpected happened..." />
));
