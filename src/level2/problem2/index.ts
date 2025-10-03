export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  /**
   * insert your code here
   */

  // Flatten all downtime logs into a single array
  const allLogs: [Date, Date][] = [];
  for (const logs of args) {
    allLogs.push(...logs);
  }

  // If no logs, return empty array
  if (allLogs.length === 0) {
    return [];
  }

  // Sort by start time
  allLogs.sort((a, b) => a[0].getTime() - b[0].getTime());

  // Merge overlapping intervals
  const merged: [Date, Date][] = [];
  let current = allLogs[0];

  for (let i = 1; i < allLogs.length; i++) {
    const next = allLogs[i];

    // Check if current and next overlap or touch
    if (current[1].getTime() >= next[0].getTime()) {
      // Merge intervals - extend current end time if next end time is later
      if (next[1].getTime() > current[1].getTime()) {
        current = [current[0], next[1]];
      }
      // If next is completely contained in current, just continue
    } else {
      // No overlap, add current to result and move to next
      merged.push(current);
      current = next;
    }
  }

  // Add the last interval
  merged.push(current);

  return merged;
}