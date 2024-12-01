import { useThemeContext } from './hooks/useTheme';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import Modes from './components/Modes';


const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { systemTheme } = useThemeContext();

  if (isLoading) {
    return (
      <div 
        className="h-screen w-full flex items-center justify-center"
        style={{
          backgroundColor: systemTheme.background.primary,
          color: systemTheme.text.primary,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Modes /> ;
}

export default App;
