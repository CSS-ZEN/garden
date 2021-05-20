
export const nullary: <TF extends Lambda1> (f: TF) => (arg: Arg1<TF>) => () => ReturnType<TF> = f => arg => () => f(arg) as ANY
