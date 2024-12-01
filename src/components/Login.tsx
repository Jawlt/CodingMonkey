import { useAuth0 } from '@auth0/auth0-react';
import { useThemeContext } from '../hooks/useTheme';

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { systemTheme } = useThemeContext();

  return (
    !isAuthenticated && (
    <div 
      className="h-screen w-full flex items-center justify-center"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Coding Monkey</h1>
        
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 py-2 rounded-lg"
          style={{
            backgroundColor: systemTheme.background.secondary,
          }}
        >
          Log In
        </button>
        
      </div>
    </div>
  ));
};

export default Login;
