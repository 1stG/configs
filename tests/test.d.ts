declare module 'x' {
  namespace X {
    interface Options {
      prop: string
    }

    type Comp = React.ComponentType & {}
  }

  export = X
}

declare module 'y' {
  namespace Y {
    type Comp = React.ComponentType & {}
  }

  export = Y
}

declare module 'z' {
  namespace Z {
    type Comp = React.ComponentType & {}
  }

  export = Z
}
