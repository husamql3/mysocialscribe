export const simulateDelay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
