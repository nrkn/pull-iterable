'use strict'

const assert = require( 'assert' )
const pull = require( 'pull-stream' )
const pullIterable = require( '../' )

const arr = [ '0', '1', '2', '3' ]
const str = '0123'

function* generator(){
  for( var i = 0; i < 4; i++ )
    yield i.toString()
}

const expect = arr

describe( 'pull iterable', () => {
  it( 'Bad iterable', done => {
    pull(
      pullIterable( 42 ),
      pull.collect( ( err, result ) => {
        assert.strictEqual( err, null )
        assert.deepEqual( result, [] )
        done()
      })
    )
  })

  it( 'Array', done => {
    pull(
      pullIterable( arr ),
      pull.collect( ( err, result ) => {
        assert.deepEqual( result, expect )
        done()
      })
    )
  })

  it( 'Early abort', done => {
    pull(
      pullIterable( arr ),
      pull.take( 2 ),
      pull.collect( ( err, result ) => {
        assert.deepEqual( result, [ '0', '1' ] )
        done()
      })
    )
  })

  it( 'String', done => {
    pull(
      pullIterable( str ),
      pull.collect( ( err, result ) => {
        assert.deepEqual( result, expect )
        done()
      })
    )
  })

  it( 'Generator', done => {
    pull(
      pullIterable( generator() ),
      pull.collect( ( err, result ) => {
        assert.deepEqual( result, expect )
        done()
      })
    )
  })
})