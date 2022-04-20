import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginForm from '../components/LoginForm'


test('renders correct details', () => {

  const mockHandler = jest.fn()

  render(
    <LoginForm handleLogin={mockHandler} />
  )

  screen.getByPlaceholderText('Käyttäjätunnus')
  screen.getByPlaceholderText('Salasana')
  screen.getByRole('button')
})


test('handleLogin is not called with unsuitable credentials', async () => {

  const handleLogin = jest.fn()

  render(
    <LoginForm handleLogin={handleLogin} />
  )

  const username = screen.getByPlaceholderText('Käyttäjätunnus')
  const password = screen.getByPlaceholderText('Salasana')
  const submit = screen.getByRole('button')

  userEvent.click(submit)

  await waitFor(() => {
    expect(handleLogin.mock.calls).toHaveLength(0)
  })

  userEvent.type(username, 'gg')
  userEvent.type(password, 'wp')
  userEvent.click(submit)

  await waitFor(() => {
    expect(handleLogin.mock.calls).toHaveLength(0)
  })

})

test('handleLogin is called with suitable credentials', async () => {

  const handleLogin = jest.fn()

  render(
    <LoginForm handleLogin={handleLogin} />
  )

  const username = screen.getByPlaceholderText('Käyttäjätunnus')
  const password = screen.getByPlaceholderText('Salasana')
  const submit = screen.getByRole('button')

  userEvent.type(username, 'good')
  userEvent.type(password, 'input')
  userEvent.click(submit)

  await waitFor(() => {
    expect(handleLogin.mock.calls).toHaveLength(1)
  })

})