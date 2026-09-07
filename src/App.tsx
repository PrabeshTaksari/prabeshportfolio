import { Theme } from './settings/types';
import { Portfolio } from './components/generated/Portfolio';
import { Toaster } from 'sonner';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return <>
      <Portfolio />
      <Toaster richColors position="top-right" />
    </>;
}

export default App;
