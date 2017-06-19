'use strict'

module.exports = function pullIterable( iterable, onAbort ){
  if( !iterable || typeof iterable[ Symbol.iterator ] !== 'function' )
    return function( abort, cb ){
      cb( true )
    }

  var iterator = iterable[ Symbol.iterator ]()

  return function next( abort, cb ){
    if( abort ) return cb( true )
    var current = iterator.next()
    if( current.done ) return cb( true )
    cb( null, current.value )
  }
}
