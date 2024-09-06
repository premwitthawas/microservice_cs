'use client';
import { Button } from '@/components/ui/button'
import { User } from 'next-auth'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CarFrontIcon, LogOut, Settings, Trophy, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';
interface Props {
    user: User
}

const UserActions = ({ user }: Props) => {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>Welcome {user.name} <UserIcon className='w-4 h-4 ml-2' /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/')}><UserIcon className='w-4 h-4 mr-2' />My Auctions</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/')}><Trophy className='w-4 h-4 mr-2' />Auction Won</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/')}><CarFrontIcon className='w-4 h-4 mr-2' />Sell Cars</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/session')}><Settings className='w-4 h-4 mr-2' />Settings</DropdownMenuItem>
                <Separator className='my-2' />
                <DropdownMenuItem className='cursor-pointer text-white bg-red-500' onClick={() => signOut()}><LogOut className='w-4 h-4 mr-2' />logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserActions