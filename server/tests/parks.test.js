const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


describe('Park data', () => {
  test('is seeded if DB is empty', async () => {
    await api
      .get('/api/parks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('contains specific park details', async () => {
    const response = await api.get('/api/parks')

    const contents = response.body.map(r => r.label)
    expect(contents).toContain('Leivonmäen kansallispuisto')
  })

  test('contains all parks', async () => {
    const response = await api.get('/api/parks')

    expect(response.body).toHaveLength(40)
  })
})

afterAll(async () => {
  await mongoose.connection.dropCollection('parks')
  mongoose.connection.close()
})