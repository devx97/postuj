import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default class ExtendedBrowserRouter extends Router {
  history;
}