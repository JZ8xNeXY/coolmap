import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/'],
}

export function middleware(req: NextRequest) {
  // 開発時では認証をスキップ
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  //環境変数が設定されていない場合は認証をスキップ
  if (!process.env.BASIC_AUTH_PASSWORD) {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1] ?? ''
    const [user, pwd] = atob(authValue).split(':')

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }

  return new Response('401 Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
