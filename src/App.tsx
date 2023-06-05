import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { browserRouter } from '@/router';
import store from '@/store';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  );
}

export default App;
