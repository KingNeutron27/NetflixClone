import { useState } from 'react';
import banner from '../assets/Netflix_banner.png';
import logo from '../assets/logo.png';
import { login, signup } from '../Firebase';
import { toast } from 'react-toastify';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userAuth = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isSignUp && !name) {
      alert('Please enter your full name');
      return;
    }

    try {
      setLoading(true);
      if (!isSignUp) { // i used this not bcos i want the sign up page to come 
        await signup(name, email, password);
      } else {
        await login(email, password);
      }

      setName('');
      setEmail('');
      setPassword('');
      
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error.code)
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen xl:h-screen w-full xl:overflow-hidden bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <header className="px-6 py-4 sm:px-8">
          <img src={logo} alt="Netflix" className="w-24 sm:w-28"/>
        </header>
        
        <main className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </h1>
            
            <form onSubmit={userAuth} className="space-y-4 pb-2 -mb-6">
              {isSignUp && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                />
              )}
              
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              />
              
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white py-3 rounded font-medium transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isSignUp ? 'Signing Up...' : 'Signing In...'}
                  </div>
                ) : (
                  isSignUp ? 'Sign Up' : 'Sign In'
                )}
              </button>
              
              {!isSignUp && (
                <>
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-600"></div>
                    <span className="px-4 text-gray-400 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-600"></div>
                  </div>
                  
                  <button
                    type="button"
                    disabled={loading}
                    className="w-full bg-gray-600/50 hover:bg-gray-600/70 disabled:bg-gray-600/30 disabled:cursor-not-allowed text-white py-3 rounded font-medium transition-colors duration-200"
                  >
                    Use a Sign-In Code
                  </button>
                  
                  <p className="text-center mt-2">
                    <a href="#" className="text-gray-400 hover:text-white text-sm underline transition-colors duration-200">
                      Forgot password?
                    </a>
                  </p>
                </>
              )}
              
              <p className="text-gray-400 text-sm text-center mt-6">
                {isSignUp ? 'Already have an account? ' : 'New to Netflix? '}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-white hover:underline font-medium disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSignUp ? 'Sign in now' : 'Sign up now'}
                </button>
              </p>
              
              <p className="text-gray-500 text-xs mt-4 leading-relaxed">
                This page is protected by Google reCAPTCHA.{' '}
                <a href="#" className="text-blue-500 hover:underline transition-colors duration-200">
                  Learn more.
                </a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;