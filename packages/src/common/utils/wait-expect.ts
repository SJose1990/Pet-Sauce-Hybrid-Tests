// packages/src/common/utils/wait-expect.ts

/**
 * Retries an expectation until it passes or the timeout is reached.
 * Practical for handling async API delays or teacher availability.
 */
export async function waitExpect(
  callback: () => Promise<void>,
  options: { timeout: number; interval: number } = { timeout: 10000, interval: 1000 }
): Promise<void> {
  const startTime = Date.now();

  while (true) {
    try {
      await callback();
      return; // Success!
    } catch (err) {
      if (Date.now() - startTime > options.timeout) {
        throw new Error(`[Wait-Expect Timeout]: ${err}`);
      }
      // Wait for the interval before trying again
      await new Promise((resolve) => setTimeout(resolve, options.interval));
    }
  }
}
