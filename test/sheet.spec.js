require('chai').should()
const sinon = require('sinon')
const { makeSheet } = require('../src/sheet')

describe('sheet', () => {

  describe('factory', () => {

    it('should be a function', () => {
      makeSheet.should.be.a.function
    })

    it('should create a function', () => {
      const sheet = makeSheet()
      sheet.should.be.a.function
    })

  })

  describe('object', () => {

    it('should have methods', () => {
      const sheet = makeSheet()
      sheet.should.contain.all.keys([
        'create',
        'getProperties',
        'getExtension',
        'setExtension',
      ])
      sheet.create.should.be.a.function
      sheet.getProperties.should.be.a.function
      sheet.getExtension.should.be.a.function
      sheet.setExtension.should.be.a.function
    })

  })

  describe('extensions', () => {

    let sheet;
    let Dimensions;

    beforeEach(() => {
      Dimensions = require('react-native').Dimensions
      sinon.stub(Dimensions, 'get', () => ({
        width: 800,
        height: 600
      }))
      sheet = makeSheet()
    })

    afterEach(() => {
      Dimensions.get.restore()
    })

    it('should create stylesheet with extension', () => {
      const style = { color: 'red' }
      const sheet = makeSheet(() => style)
      sheet.getExtension().should.be.a.function
      sheet.getExtension()().should.eql(style)
    })

    it('should set extension', () => {
      const style = { color: 'red' }
      const sheet = makeSheet()
      sheet.setExtension(() => style)
      sheet.getExtension().should.be.a.function
      sheet.getExtension()().should.eql(style)
    })

    it('should have default properties', () => {
      const properties = sheet.getProperties()
      properties.should.be.an.object
      properties.should.eql({
        width: 800,
        height: 600,
        landscape: true,
        orientation: 'landscape',
        ratio: 800 / 600,
      })
    })

    it('should contain properties from extension', () => {
      sheet.setExtension(({ width, landscape }) => ({
        halfWidth: width / 2,
        columns: landscape ? 2 : 1
      }))
      const properties = sheet.getProperties()
      properties.should.be.an.object
      properties.should.eql({
        width: 800,
        height: 600,
        landscape: true,
        ratio: 800 / 600,
        orientation: 'landscape',
        halfWidth: 400,
        columns: 2,
      })
    })

  })

  describe('create', () => {

    let sheet;
    let Dimensions;

    beforeEach(() => {
      Dimensions = require('react-native').Dimensions
      sinon.stub(Dimensions, 'get', () => ({
        width: 600,
        height: 800
      }))
      sheet = makeSheet()
    })

    afterEach(() => {
      Dimensions.get.restore()
    })

    it('should create simple styles', () => {
      const makeStyles = sheet.create(({width, height, orientation}) => ({
        container: {
          flexDirection: orientation === 'landscape' ? 'center' : 'flex-start',
          width: Math.min(width, height),
        },
      }))
      makeStyles.should.be.a.function
      const styles = makeStyles()
      styles.should.eql({
        container: {
          flexDirection: 'flex-start',
          width: 600,
        },
      })
    })

    it('should create styles using extension properties', () => {
      const extension = ({width, height}) => ({
        sidebarWidth: Math.max(width, height)
      })
      sheet.setExtension(extension)
      const makeStyles = sheet.create(({landscape, sidebarWidth}) => ({
        container: {
          flexDirection: landscape ? 'center' : 'flex-start',
          width: sidebarWidth,
        },
      }))
      makeStyles.should.be.a.function
      const styles = makeStyles()
      styles.should.eql({
        container: {
          flexDirection: 'flex-start',
          width: 800,
        },
      })
    })

  })

})
