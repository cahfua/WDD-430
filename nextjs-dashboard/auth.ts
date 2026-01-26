// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { authConfig } from './auth.config';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  password: string;
};

async function getUser(email: string): Promise<UserRow | undefined> {
  const users = await sql<UserRow[]>`
    SELECT id, name, email, password
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;
  return users[0];
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name ?? '',
          email: user.email,
        };
      },
    }),
  ],
});
