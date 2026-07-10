import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Server Actions usan un protocolo de respuesta interno; si aquí devolvemos redirects,
  // el cliente recibe un formato inesperado y falla con "An unexpected response...".
  const isServerActionRequest = request.method === 'POST' && request.headers.has('next-action')

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // 1. Modificamos la request para que tenga las cookies actualizadas en el servidor
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options }) // <-- Pasamos un solo objeto compacto
          )

          // 2. Inicializamos la respuesta base de Next.js
          supabaseResponse = NextResponse.next({
            request,
          })

          // 3. Inyectamos las cookies en la respuesta final para el navegador
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set({ name, value, ...options }) // <-- Pasamos un solo objeto compacto
          )
        },
      },
    }
  )

  // Obtenemos al usuario actual autenticado
  const { data: { user } } = await supabase.auth.getUser()

  // No aplicar redirects de autenticación a llamadas internas de Server Actions.
  if (isServerActionRequest) {
    return supabaseResponse
  }

  // Proteger rutas: Si no hay usuario y no está intentando ir a /login, lo mandamos a /login
  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Si ya está logueado e intenta ir a /login, lo mandamos a la página de inicio
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

// Configura qué rutas va a interceptar el proxy (básicamente todo excepto archivos públicos)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}