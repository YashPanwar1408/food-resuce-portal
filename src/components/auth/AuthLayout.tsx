
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  type?: 'login' | 'register';
}

const AuthLayout = ({ children, title, subtitle, type = 'login' }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-4 px-6 border-b bg-white">
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-primary rounded-md p-1">
            <span className="text-white font-bold text-xl">FR</span>
          </span>
          <span className="font-medium text-lg">
            <span>Food</span>
            <span className="text-primary">Rescue</span>
            <span>Connect</span>
          </span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="mt-6 text-center text-sm">
            {type === 'login' ? (
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="py-4 px-6 border-t bg-white text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} FoodRescue Connect. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;
