export default interface Provider {
  id: string
  name: string
  type: ProviderType
  options?: Record<string, unknown>
}

export declare type ProviderType = 'oauth' | 'email' | 'credentials'
