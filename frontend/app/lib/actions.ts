'use server';

import { signIn, signUp, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function new_user(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const res = await signUp(formData);
        if (!res) {
            throw new Error('Failed to sign up');
        } 
        redirect('/signin')
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Failed to sign up. Try Again.';
            }
        }
        throw error;
    }
}

export async function logOut() {
    try {
        await signOut();
    } catch (error) {
        console.error(error);
    }
}