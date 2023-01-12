import type { IsNegative, Negate } from './Sign'
import type { Subtract } from '../Subtraction/Subtract'
import type { IsInt } from './IsInt'
import type { Add } from '../Addition/Add'

type TakeIntegerComponent<N extends number> = (
    `${N}` extends `${infer I extends number}.${string}` ? I : N
)

export type Floor<N extends number> = (
    IsInt<N> extends 1 ? N : Negate<Subtract<IsNegative<N>, TakeIntegerComponent<N>>>
)

export type Ceil<N extends number> = (
    IsInt<N> extends 1 ? N : Add<Floor<N>, 1>
)

export type Round<N extends number> = (
    IsInt<N> extends 1 ? N : 
        IsNegative<N> extends 1
            ? Negate<Subtract<Gt<Multiply<Mod<Abs<N>, 1>, 10>, 5>, TakeIntegerComponent<N>>>
            : Add<GtOrEq        <Multiply<Mod<    N , 1>, 10>, 5>, TakeIntegerComponent<N>>
)

