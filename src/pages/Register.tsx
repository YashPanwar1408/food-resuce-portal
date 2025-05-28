import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AuthLayout from '@/components/auth/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import {toast} from "sonner"

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'restaurant';

  const { signUp, signIn, user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: defaultType,
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const userMetadata = {
      name: formData.name,
      user_type: formData.userType,
    };

    try {
      await signUp(formData.email, formData.password, userMetadata);

      // 👉 Sign in immediately after sign up
      await signIn(formData.email, formData.password);

      // 👉 Redirect to dashboard after login
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to create account.');
    }
  };

  // Remove this line or replace with your own loading logic if needed

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join FoodRescue Connect to start making a difference"
      type="register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userType">I am a:</Label>
          <RadioGroup
            value={formData.userType}
            onValueChange={handleUserTypeChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="restaurant" id="restaurant" />
              <Label htmlFor="restaurant">Restaurant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ngo" id="ngo" />
              <Label htmlFor="ngo">NGO</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">
            {formData.userType === 'restaurant' ? 'Restaurant Name' : 'Organization Name'}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder={
              formData.userType === 'restaurant'
                ? 'Your Restaurant Name'
                : 'Your Organization Name'
            }
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Create Account
        </Button>

        <div className="text-xs text-gray-500 mt-4">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
