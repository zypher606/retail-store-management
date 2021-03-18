import React from 'react';
import logo from './logo.svg';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppRouter } from "./appRoutes";
import { theme } from './styles';
import './App.scss';

const App = (props: any): JSX.Element => {
  return (
    // <Provider store={appStore}>
      <MuiThemeProvider theme={theme}>
        <AppRouter authenticated={props.authenticated} />
      </MuiThemeProvider>
    // </Provider>
  );
}

export default App;
