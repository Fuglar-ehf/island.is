import { ReactNode, useEffect, useRef, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { RegName, RegQueryName } from './types'

// ---------------------------------------------------------------------------

export const interpolateArray = (
  text: string,
  values: Record<string, ReactNode>,
): Array<string | ReactNode> =>
  text
    .replace(/\$\{([a-z0-9_$]+)\}/gi, '|||$1|||')
    .split('|||')
    .map((segment, i) =>
      i % 2 === 0
        ? segment
        : values[segment] != null
        ? values[segment]
        : '${' + segment + '}',
    )

export const interpolate = (
  text: string,
  values: Record<string, string | number>,
): string =>
  text.replace(/\$\{([a-z0-9_$]+)\}/gi, (marker, name) =>
    values[name] != null ? values[name] + '' : marker,
  )

// ---------------------------------------------------------------------------

export const isPlural = (n: number) => n % 10 !== 1 || n % 100 === 11

// ---------------------------------------------------------------------------

/** Pretty-formats a Regulation `name` for human consumption
 *
 * Chops off leading zeros
 */
export const prettyName = (regulationName: string): string =>
  regulationName.replace(/^0+/, '')

// ---------------------------------------------------------------------------

/** Converts a Regulation `name` into a URL path segment
 *
 *  Example: '0123/2020' --> '0123-2020'
 */
export const nameToSlug = (regulationName: RegName): RegQueryName =>
  regulationName.replace('/', '-') as RegQueryName

// ---------------------------------------------------------------------------

/** Returns the first query parameter value as string, falling back to '' */
const getParamStr = (query: ParsedUrlQuery, key: string): string => {
  const val = query[key]
  return val == null ? '' : typeof val === 'string' ? val : val[0]
}

/** Picks named keys from the query object and defaults them to '' */
export const getParams = <K extends string>(
  query: ParsedUrlQuery,
  keys: Array<K>,
): Record<K, string> =>
  keys.reduce((obj, key) => {
    obj[key] = getParamStr(query, key)
    return obj
  }, {} as Record<K, string>)

// ---------------------------------------------------------------------------

const domid_prefix = '_' + /*@__PURE__*/ (Date.now() + '-').substr(6)
let domid_incr = 0

export default function domid() {
  return domid_prefix + domid_incr++
}

// ---------------------------------------------------------------------------

/** Returns a stable, unique ID string
 *
 * NOTE: it triggers harmless SSR hydration warnings in the browser,
 * but those can't be avoided beause of how React is currently designed.
 */
export const useDomid = (staticId?: string) => useState(staticId || domid)[0]

// ---------------------------------------------------------------------------

const DEFAULT_DURATION = 0
// TODO: Add function signtures allowing either zero args, or 2.

/** State variable that always snaps back to `undefined` after `duration` milliseconds. */
export const useShortState = <S>(
  /** Initial temporary state that then gets reverted back
   * to `undefined` after `duration` milliseconds
   * */
  initialState?: S | (() => S),

  /** Default duration, can be overridden on a case-by-case basis
   * by passing a custom duration to the `setState` function
   * */
  defaultDuration = DEFAULT_DURATION,
) => {
  const [state, _setState] = useState<S | undefined>(initialState)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>()

  const cancelTimeout = () => {
    timeout.current && clearTimeout(timeout.current)
  }

  const setState = useRef(
    (newState: S | (() => S), duration = defaultDuration) => {
      _setState(newState)
      cancelTimeout()
      timeout.current = setTimeout(() => {
        timeout.current = null
        _setState(undefined)
      }, duration)
    },
  ).current

  useEffect(() => {
    if (initialState !== undefined) {
      setState(initialState, defaultDuration)
    }
    return cancelTimeout
  }, [])

  return [state, setState] as const
}

// ---------------------------------------------------------------------------
