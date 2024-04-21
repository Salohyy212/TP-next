"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormData = {
  name: string;
  email: string;
  phoneNumber: number;
  message: string;
};

const Login = () => {
  // Utilisez useState uniquement lorsque le code est exécuté côté client
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const schema = z.object({
    name: z.string().min(50),
    email: z.string().email().refine((email: string) => email.endsWith('@gmail.com')),
    phoneNumber: z.number().int().positive().max(999999999),
    message: z.string(),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await schema.parseAsync(data);
      console.log('Formulaire valide, données:', data);
    } catch (error) {
      console.error('Erreur de validation:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2196F3' }}>
      <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '20px' }}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
          <div style={{ marginBottom: '10px' }}>
            <input type="text" placeholder="Name" {...register('name', { required: true })} />
            {errors.name && <span> Name required (min. 50 characters).</span>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input type="email" placeholder="Email" {...register('email', { required: true })} />
            {errors.email && <span> Email required (@gmail.com).</span>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input type="tel" placeholder="Phone number" {...register('phoneNumber', { required: true })} />
            {errors.phoneNumber && <span> Phone number required (10 numbers).</span>}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <textarea placeholder="Message" {...register('message', { required: true })} />
            {errors.message && <span> Message.</span>}
          </div>
          
          <button type="submit" disabled={submitting} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
