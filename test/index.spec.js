require('chai').should()
const sinon = require('sinon')

describe('index', () => {

  const sheet = require('../src/sheet')
  const stylesheet = 'stylesheet_object'
  const factory = () => stylesheet

  before(() => {
    sinon.stub(sheet, 'makeSheet', factory)
  })

  after(() => {
    sheet.makeSheet.restore()
  })

  it('should export factory function', () => {
    const make = require('../src/index').makeStyleSheet
    make.should.be.a.function
    make().should.equal(stylesheet)
  })

  it('should export global stylesheet', () => {
    const rss = require('../src/index').ResponsiveStyleSheet
    rss.should.equal(stylesheet)
  })

})
