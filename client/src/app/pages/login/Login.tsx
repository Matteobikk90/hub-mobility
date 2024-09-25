import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [filledFields, setFilledFields] = useState<Record<string, boolean>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Login failed');
    }
  };

  // Update filledFields state if inputs are filled
  useEffect(() => {
    setFilledFields({
      email: email.trim() !== '',
      password: password.trim() !== '',
    });
  }, [email, password]);

  return (
    <section className="p-4 flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-azzurro">Login</h2>

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={`w-full p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
            filledFields.email ? 'border-azzurro border-b-2' : 'border-black'
          } mb-4`}
        />

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={`w-full p-3 bg-transparent border-b focus:border-b-2 focus:border-azzurro ${
            filledFields.password ? 'border-azzurro border-b-2' : 'border-black'
          } mb-4`}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-azzurro text-white py-3 rounded-md hover:bg-black transition"
        >
          Login
        </button>
      </form>
    </section>
  );
};
