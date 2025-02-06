import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { z } from 'zod';
var bcrypt = require('bcryptjs');

async function getUser(email: string) {
    try {
        const res = await axios.get(`http://localhost:8000/user/${email}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function signUp(formData: FormData) {
    try {
        const parsedCredentials = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
        }).safeParse({name: formData.get('name'), email: formData.get('email'), password: formData.get('password')}); 
        if (!parsedCredentials.success) {
            console.log(parsedCredentials.error);
            return null;
        }
        const { name, email, password } = parsedCredentials.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await axios.post('http://localhost:8000/signup', {
            name: name,
            email: email,
            password: hashedPassword
        });
        if (res.data) {
            return res.data;
        }
        console.log(res.statusText);
        return null;
    } catch (error) {
        console.error(error);
        return null;
}}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            try {
                const parsedCredentials = z.object({
                    username: z.string().email(),
                    password: z.string(),
                }).safeParse(credentials);
                if (!parsedCredentials.success) {
                    return null;
                }
                const { username, password } = parsedCredentials.data;
                const user = await getUser(username);
                if (!user) {
                    console.log("User not found");
                    return null;
                }
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) {
                    return user;
                }
                console.log("Invalid credentials");
                return null;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    })
  ],
});