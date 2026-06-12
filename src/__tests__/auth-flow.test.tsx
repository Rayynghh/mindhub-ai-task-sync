import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import LoginPage from '@/app/login/page'
import SignupPage from '@/app/signup/page'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock server actions to avoid import errors if they are not yet fully compatible with vitest environment
vi.mock('@/app/auth/actions', () => ({
  login: vi.fn(),
  signup: vi.fn(),
}))

describe('Auth Flow UI', () => {
  describe('Login Page', () => {
    it('renders login form', () => {
      render(<LoginPage searchParams={{}} />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('displays error message if provided in searchParams', () => {
      render(<LoginPage searchParams={{ error: 'Invalid credentials' }} />)
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })

    it('displays success message if provided in searchParams', () => {
      render(<LoginPage searchParams={{ message: 'Check your email' }} />)
      expect(screen.getByText('Check your email')).toBeInTheDocument()
    })
  })

  describe('Signup Page', () => {
    it('renders signup form', () => {
      render(<SignupPage searchParams={{}} />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it('displays error message if provided in searchParams', () => {
      render(<SignupPage searchParams={{ error: 'Email already exists' }} />)
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    })
  })
})
