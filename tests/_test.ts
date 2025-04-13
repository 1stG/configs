/** @deprecated This has been deprecated, no not use it */
export const content = 'Hello World'

export interface PartialObserver<T> {
  value: T
}

export interface Subscription {
  unsubscribe(): void
}

export declare class TestCase<T = unknown> {
  subscribe(observer?: PartialObserver<T>): Subscription
  /** @deprecated Use an observer instead of a complete callback */
  subscribe(
    next: null | undefined,
    error: null | undefined,
    complete: () => void,
  ): Subscription

  /** @deprecated Use an observer instead of an error callback */
  subscribe(
    next: null | undefined,
    error: (error: unknown) => void,
    complete?: () => void,
  ): Subscription

  /** @deprecated Use an observer instead of a complete callback */
  subscribe(
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    next: (value: T) => void,
    error: null | undefined,
    complete: () => void,
  ): Subscription

  subscribe(
    next?: (value: T) => void,
    error?: (error: unknown) => void,
    complete?: () => void,
  ): Subscription
}
