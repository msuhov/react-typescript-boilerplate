import React from 'react';
import { render, cleanup } from 'react-testing-library';

import loadable from '../loadable';

afterEach(cleanup);

const testComponent = (props: any) => <span {...props}>Test</span>;

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    lazy: jest.fn().mockImplementation(() => testComponent),
  };
});

describe('utils loadable', () => {
  it('should render and match the snapshot', () => {
    const importFunction = () => {};
    const LoadableComponent = loadable(importFunction);
    const props = { className: 'test' };
    const { container } = render(<LoadableComponent {...props} />);
    expect(container).toMatchSnapshot();
  });
});
