import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import 'bulma/css/bulma.css';
import './global.scss';
import i18n from './helpers/i18n';

i18n.t('');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Root />
);

