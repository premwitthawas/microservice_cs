'use client';
import { signIn } from 'next-auth/react';
import React from 'react'
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';

const LoginButton = () => {
    const handleLogin = () => {
        return signIn('id-server', { callbackUrl: '/' }, { propmt: 'login' })
    }
    return (
        <Button onClick={() => handleLogin()}>Login <LogIn className='w-5 h-5 ml-2' /></Button>
    )
}

export default LoginButton