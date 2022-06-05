import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SignUpForm from '../components/authorization/SignUpForm'


test('renders correct details', () => {

  const handleSignUp = jest.fn()

  render(
    <SignUpForm handleSignUp={handleSignUp} />
  )

  screen.getByPlaceholderText('Käyttäjätunnus')
  screen.getByPlaceholderText('Nimi')
  screen.getByPlaceholderText('Salasana')
  screen.getByPlaceholderText('Toista salasana')
  screen.getByRole('button')
})


test('handleSignUp is not called with unsuitable credentials', async () => {

  const handleSignUp = jest.fn()

  render(
    <SignUpForm handleSignUp={handleSignUp} />
  )

  const username = screen.getByPlaceholderText('Käyttäjätunnus')
  const password = screen.getByPlaceholderText('Salasana')
  const confirmation = screen.getByPlaceholderText('Toista salasana')
  const submit = screen.getByRole('button')

  userEvent.click(submit)

  await waitFor(() => {
    expect(handleSignUp.mock.calls).toHaveLength(0)
  })

  userEvent.type(username, 'namemissing')
  userEvent.type(password, 'wp')
  userEvent.type(confirmation, 'wp')
  userEvent.click(submit)

  await waitFor(() => {
    expect(handleSignUp.mock.calls).toHaveLength(0)
  })

})

test('handleSignUp is not called with nonmatching password and confirmatiob', async () => {

  const handleSignUp = jest.fn()

  render(
    <SignUpForm handleSignUp={handleSignUp} />
  )

  const username = screen.getByPlaceholderText('Käyttäjätunnus')
  const name = screen.getByPlaceholderText('Nimi')
  const password = screen.getByPlaceholderText('Salasana')
  const confirmation = screen.getByPlaceholderText('Toista salasana')
  const submit = screen.getByRole('button')


  userEvent.type(username, 'mmallikas')
  userEvent.type(name, 'mikko mallikas')
  userEvent.type(password, 'hupsista')
  userEvent.type(confirmation, 'hupsist')
  userEvent.click(submit)

  await waitFor(() => {
    expect(handleSignUp.mock.calls).toHaveLength(0)
  })

})

test('handleSignUp is called with suitable credentials', async () => {

  const handleSignUp = jest.fn()

  render(
    <SignUpForm handleSignUp={handleSignUp} />
  )

  const username = screen.getByPlaceholderText('Käyttäjätunnus')
  const name = screen.getByPlaceholderText('Nimi')
  const password = screen.getByPlaceholderText('Salasana')
  const confirmation = screen.getByPlaceholderText('Toista salasana')
  const submit = screen.getByRole('button')


  userEvent.type(username, 'mmallikas')
  userEvent.type(name, 'mikko mallikas')
  userEvent.type(password, 'onnistui')
  userEvent.type(confirmation, 'onnistui')
  userEvent.click(submit)


  await waitFor(() => {
    expect(handleSignUp.mock.calls).toHaveLength(1)
  })

})