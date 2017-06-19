# pull-iterable

[pull-stream](https://github.com/pull-stream/pull-stream) source for [ES6 iterables](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators)

`npm install pull-iterable`

```javascript
const pull = require( 'pull-stream' )
const iterable = require( 'pull-iterable' )

function* range( start, end ){
  for( var i = start; i < end; i++ )
    yield i
}

pull(
  iterable( range( 1, 5 ) ),
  pull.collect( ( err, result ) => {
    console.log( result )
  })
)

pull(
  iterable( [ 1, 2, 3, 4 ] ),
  pull.collect( ( err, result ) => {
    console.log( result )
  })
)

pull(
  iterable( 'hello world' ),
  pull.collect( ( err, result ) => {
    console.log( result )
  })
)
```