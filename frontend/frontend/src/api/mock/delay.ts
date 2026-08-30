/**
 * Simulates network latency for mock API calls.
 * Returns a random delay between min and max milliseconds.
 */
export function delay(min = 200, max = 600): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
