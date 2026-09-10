import { SessionProvider } from "next-auth/react";

export default function SigninOptions (
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
){
    return(
        <main>
            <SessionProvider>
                {children}
            </SessionProvider>
        </main>
    )
}