import { RouterState } from 'connected-react-router';

import { selectLocation } from 'containers/App/selectors';

describe('selectLocation', () => {
  it('should select the location', () => {
    const router: RouterState = {
      location: {
        pathname: '/foo',
        search: '',
        state: {},
        hash: '',
      },
      action: 'POP',
    };
    const mockedState = {
      router,
    };
    expect(selectLocation(mockedState)).toEqual(router.location);
  });
});
