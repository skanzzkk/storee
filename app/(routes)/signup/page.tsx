'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Button from '@/app/shared/components/UIKIT/Button/Button';
import { AxiosInterceptor } from '@/app/shared/core/http';
import { useLocalStorage } from '@/app/shared/hooks/useLocalStorage';
import { useUserStore } from '@/app/shared/core/providers/userProvider';

export default function LoginPage() {
  const [value, setValue] = useLocalStorage('token', '');
  const { setUser  } = useUserStore(state => state);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (login.length > 0 && password.length > 6) {
      try {
        const data = await AxiosInterceptor.$post('/user/login', { login, password });
        if (data.status === 200) {
          const { body } = data;
          setValue(body.token);
          setUser (1, body.user.login);
          router.push('/');
        } else {
          console.log('Error:', data.status);
        }
      } catch (error) {
        console.log('Ошибка при входе:', error);
      }
    } else {
      console.log('Пожалуйста, убедитесь, что все поля заполнены корректно.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-bold text-center">Вход в аккаунт</h1>
          <form onSubmit={loginHandler} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="login" className="text-sm">Логин</label>
              <Input
                id="login"
                type="text"
                placeholder="Введите ваш логин"
                value={login}
                onChange={e => setLogin(e.currentTarget.value)}
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm">Пароль</label>
              <Input
                id="password"
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="flex justify-center">
              <Button size="m" type="submit" style="black_outline">
                Вход
              </Button>
            </div>
          </form>
          <div className="text-center text-sm">
            У вас нет аккаунта?{" "}
            <a href="/register" className="underline underline-offset-4">
              Зарегистрироваться
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
