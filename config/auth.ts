import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/user'),
      }),
    }),
  },
})

export default authConfig

/**
 * Inferring types for the auth config
 */
declare module '@adonisjs/auth/types' {
  // eslint-disable-next-line prettier/prettier
  export interface Authenticators extends InferAuthenticators<typeof authConfig> { }
}
declare module '@adonisjs/core/types' {
  // eslint-disable-next-line prettier/prettier
  interface EventsList extends InferAuthEvents<Authenticators> { }
}
