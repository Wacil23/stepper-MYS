import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App'

function start() {
  const container = document.getElementById('product-stepper');
  if (!container) {
    console.warn('No #product-stepper or root found, retrying...');
    setTimeout(start, 200);
    return;
  }
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
