import { Authenticators } from '@adonisjs/auth/types'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    auth: import('@adonisjs/auth').Authenticator<Authenticators>
  }
}
