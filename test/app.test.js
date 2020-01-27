const app = require('../src/app')

describe('App', ()=>{
  it('GET / responds 200 and Hello World', ()=>{
    return supertest(app)
    .get('/')
    .expect(200, {message: 'Hello World'});
  })
})