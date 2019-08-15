declare module 'x' {
  import React from 'react'

  namespace X {
    interface Options {
      prop: string
    }

    type Comp = React.ComponentType & {}
  }

  export = X
}

declare module 'y' {
  import React from 'react'

  namespace Y {
    type Comp = React.ComponentType & {}
  }

  export = Y
}
