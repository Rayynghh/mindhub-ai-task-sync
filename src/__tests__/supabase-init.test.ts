import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient as createBrowserClient } from '../lib/supabase/client'
import { createClient as createServerClient } from '../lib/supabase/server'

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    getAll: vi.fn(() => []),
    set: vi.fn(),
  })),
}))

describe('Supabase Initialization', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'foo-bar')
  })

  it('should initialize browser client without error', () => {
    const client = createBrowserClient()
    expect(client).toBeDefined()
  })

  it('should initialize server client without error', async () => {
    const client = await createServerClient()
    expect(client).toBeDefined()
  })
})
