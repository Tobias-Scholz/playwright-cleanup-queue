export interface CleanupQueue {
  cleanup: (fn: () => Promise<void>) => void
}

export const cleanup = async (
  { page }: { page: unknown },
  use: (r: (fn: () => Promise<void>) => void) => Promise<void>
) => {
  const list: (() => Promise<void>)[] = []
  const cleanup = (fn: () => Promise<void>) => {
    list.push(fn)
  }
  await use(cleanup)

  list.reverse()
  for (const fn of list) {
    await fn()
  }
}
