/* eslint no-unused-expressions:0, no-magic-numbers:0 */

require('babel-polyfill')

// vendor modules

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

// modules

import shiny from './index'

// setup

chai.use(sinonChai)

// tests

describe('shiny', () => {

  it('should return an object when called with an object', () => {
    // setup
    const obj = { key: 'value' }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).to.be.a('object').and.to.have.property('key', 'value')
  })

  it('should throw an error when called without an object', () => {
    // test
    const callShiny = () => shiny()

    // verify
    expect(callShiny).to.throw()
  })

  it('should remove keys with an undefined value', () => {
    // setup
    const obj = { key: undefined }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).not.to.have.property('key')
  })

  it('should leave keys with a non-empty array', () => {
    // setup
    const obj = { key: [1, 2, 3] }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).to.have.property('key')
  })

  it('should remove keys with an empty array', () => {
    // setup
    const obj = { key: [] }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).not.to.have.property('key')
  })

  it('should not remove keys with an empty array', () => {
    // setup
    const obj = { key: [] }
    const options = { allowEmptyArrays: true }

    // test
    const shinyObj = shiny(obj, options)

    // verify
    expect(shinyObj).to.have.property('key')
  })

  it('should leave keys with a non-empty object', () => {
    // setup
    const obj = { key: { anotherKey: 'value' } }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).to.have.property('key')
  })

  it('should remove keys with an empty object', () => {
    // setup
    const obj = { key: {} }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).not.to.have.property('key')
  })

  it('should recursively remove keys containing empty objects', () => {
    // setup
    const obj = {
      key: {
        keyA: {},
        keyB: {
          keyC: {
            keyD: 'value',
            keyE: {},
          },
        },
      },
    }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).not.to.have.deep.property('key.keyA')
    expect(shinyObj).to.have.deep.property('key.keyB.keyC.keyD', 'value')
    expect(shinyObj).not.to.have.deep.property('key.keyB.keyC.keyE')
  })

  it('should not remove keys with an empty object', () => {
    // setup
    const obj = { key: {} }
    const options = { allowEmptyObjects: true }

    // test
    const shinyObj = shiny(obj, options)

    // verify
    expect(shinyObj).to.have.property('key')
  })

  it('should remove keys with an empty string', () => {
    // setup
    const obj = { key: '' }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).not.to.have.property('key')
  })

  it('should not remove keys with an empty string', () => {
    // setup
    const obj = { key: '' }
    const options = { allowEmptyStrings: true }

    // test
    const shinyObj = shiny(obj, options)

    // verify
    expect(shinyObj).to.have.property('key')
  })

  it('should remove keys with a function', () => {
    // setup
    const spy = sinon.spy()
    const obj = { key: spy }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(spy).not.to.have.been.called
    expect(shinyObj).not.to.have.property('key')
  })

  it('should not remove keys with a function', () => {
    // setup
    const spy = sinon.spy()
    const obj = { key: spy }
    const options = { allowFunctions: true }

    // test
    const shinyObj = shiny(obj, options)

    // verify
    expect(spy).not.to.have.been.called
    expect(shinyObj).to.have.property('key')
  })

  it('should remove keys with a null value', () => {
    // setup
    const obj = { key: null }

    // test
    const shinyObj = shiny(obj)

    // verify
    expect(shinyObj).not.to.have.property('key')
  })

  it('should not remove keys with a null value', () => {
    // setup
    const obj = { key: null }
    const options = { allowNulls: true }

    // test
    const shinyObj = shiny(obj, options)

    // verify
    expect(shinyObj).to.have.property('key')
  })

})
