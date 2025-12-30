const {expect} = require('chai')
const request = require('supertest')
const app = require('../app')

describe('GET /health', ()=>{
    it('should return server status', async()=>{
        const res = await request(app).get('/health')

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('working properly')
    })
})