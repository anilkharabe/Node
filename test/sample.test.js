const { expect } = require('chai');

describe('I am test sample math test', ()=>{
    it('should be do addition', ()=>{
        const sum = 5 + 2
        expect(sum).to.equal(7)
    })
    
    it('should be do multiplication', ()=>{
        const multiplication = 5 * 2
        expect(multiplication).to.equal(10)
    })
})