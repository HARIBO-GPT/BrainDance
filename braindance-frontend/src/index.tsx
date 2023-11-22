import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material';

import { Provider } from "react-redux";
import store from './store'

const theme = createTheme({
  palette: {
    primary: { main: "#ffd69e" },
    secondary: { main: "#ffcc00" }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: "bold"
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme = {theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

reportWebVitals();
