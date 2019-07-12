/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import MaterialIcon from '.';

describe('MaterialIcon', () => {
  it('renders', () => {
    const wrapper = create(
      <MaterialIcon>
        <i />
      </MaterialIcon>,
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
