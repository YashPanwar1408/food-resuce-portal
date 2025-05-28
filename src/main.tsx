import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import Donate from './pages/Donate';

const router = createBrowserRouter([
  {
    path: '/donate',
    element: <Donate />,
  },
]);

createRoot(document.getElementById("root")!).render(<App />);
