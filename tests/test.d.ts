declare module 'x' {
  namespace X {
    interface Options {
      prop: string
    }

    type Comp = React.ComponentType & {
      x: string
    }
  }

  export = X
}

declare module 'y' {
  namespace Y {
    type Comp = React.ComponentType & {
      y: string
    }
  }

  export = Y
}

declare module 'z' {
  namespace Z {
    type Comp = React.ComponentType & {
      z: string
    }
  }

  export = Z
}
