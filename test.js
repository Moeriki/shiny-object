/* eslint-env mocha */

// vendor modules

import { expect } from 'chai';

// modules

import shiny from './index';

require('babel-polyfill');

// tests

describe('shiny', () => {
  it('should return an object when called with an object', () => {
    // test
    const shinyObj = shiny({ key: 'value' });

    // verify
    expect(shinyObj)
      .to.be.a('object')
      .and.to.have.property('key', 'value');
  });

  it('should throw an error when called without an object', () => {
    // test
    const callShiny = () => shiny();

    // verify
    expect(callShiny).to.throw();
  });

  it('should remove keys with an undefined value', () => {
    // test
    const shinyObj = shiny({ key: undefined }, { noUndefined: true });

    // verify
    expect(shinyObj).not.to.have.property('key');
  });

  it('should leave keys with a non-empty array', () => {
    // test
    const shinyObj = shiny({ key: [1, 2, 3] });

    // verify
    expect(shinyObj).to.have.property('key');
  });

  it('should remove keys with an empty array', () => {
    // test
    const shinyObj = shiny({ key: [] }, { noEmptyArray: true });

    // verify
    expect(shinyObj).not.to.have.property('key');
  });

  it('should not remove keys with an empty array', () => {
    // test
    const shinyObj = shiny({ key: [] });

    // verify
    expect(shinyObj).to.have.property('key');
  });

  it('should leave keys with a non-empty object', () => {
    // test
    const shinyObj = shiny({ key: { anotherKey: 'value' } });

    // verify
    expect(shinyObj).to.have.property('key');
  });

  it('should remove keys with an empty object', () => {
    // test
    const shinyObj = shiny({ key: {} }, { noEmptyObject: true });

    // verify
    expect(shinyObj).not.to.have.property('key');
  });

  it('should recursively remove keys containing empty objects', () => {
    // test
    const shinyObj = shiny(
      {
        key: {
          keyA: {},
          keyB: {
            keyC: {
              keyD: 'value',
              keyE: {},
            },
          },
        },
      },
      { noEmptyObject: true }
    );

    // verify
    expect(shinyObj).not.to.have.deep.property('key.keyA');
    expect(shinyObj).to.have.deep.property('key.keyB.keyC.keyD', 'value');
    expect(shinyObj).not.to.have.deep.property('key.keyB.keyC.keyE');
  });

  it('should not remove keys with an empty object', () => {
    // test
    const shinyObj = shiny({ key: {} });

    // verify
    expect(shinyObj).to.have.property('key');
  });

  it('should remove keys with an empty string', () => {
    // test
    const shinyObj = shiny({ key: '' }, { noEmptyString: true });

    // verify
    expect(shinyObj).not.to.have.property('key');
  });

  it('should not remove keys with an empty string', () => {
    // test
    const shinyObj = shiny({ key: '' });

    // verify
    expect(shinyObj).to.have.property('key');
  });

  it('should remove keys with a function', () => {
    // test
    const shinyObj = shiny({ key: () => ({}) }, { noFunction: true });

    // verify
    expect(shinyObj).not.to.have.property('key');
  });

  it('should not remove keys with a function', () => {
    // test
    const shinyObj = shiny({ key: () => ({}) });

    // verify
    expect(shinyObj).to.have.property('key');
  });

  it('should remove keys with a null value', () => {
    // test
    const shinyObj = shiny({ key: null }, { noNull: true });

    // verify
    expect(shinyObj).not.to.have.property('key');
  });

  it('should not remove keys with a null value', () => {
    // test
    const shinyObj = shiny({ key: null });

    // verify
    expect(shinyObj).to.have.property('key');
  });
});
