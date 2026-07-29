import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const url = new URL(request.url);
    const pathname = url.pathname;

    if (!session) {
        return NextResponse.redirect(new URL('/Login', request.url));
    }

    if (pathname.startsWith('/dashboard/admin')) {
        if (session.user.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (session.user.role === 'writer' && !session.user.isVerifiedWriter) {
        return NextResponse.redirect(new URL('/writer-verification', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};