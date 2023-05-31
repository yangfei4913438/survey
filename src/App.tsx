import { RouterProvider } from 'react-router-dom';

import { browserRouter } from '@/router';

function App() {
  return <RouterProvider router={browserRouter}></RouterProvider>;
}

export default App;
