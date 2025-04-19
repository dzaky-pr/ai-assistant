export {}

// Create a type for the roles
export type Roles = 'admin' | 'basic_user'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}
