export function levenshteinDistance(s: string, t: string) {
  if (s === t) {
    return 0;
  }

  let n = s.length,
    m = t.length;

  if (n === 0) return m;
  if (m === 0) return n;

  // Swap to use the smaller array
  if (n > m) {
    [s, t] = [t, s];
    [n, m] = [m, n];
  }

  let prevRow = new Array(n + 1);
  let currentRow = new Array(n + 1);

  // Initialize the previous row
  for (let i = 0; i <= n; i++) {
    prevRow[i] = i;
  }

  for (let j = 1; j <= m; j++) {
    currentRow[0] = j;

    for (let i = 1; i <= n; i++) {
      let cost = s.charAt(i - 1) === t.charAt(j - 1) ? 0 : 1;
      currentRow[i] = Math.min(
        prevRow[i] + 1, // Deletion
        currentRow[i - 1] + 1, // Insertion
        prevRow[i - 1] + cost // Substitution
      );
    }

    [prevRow, currentRow] = [currentRow, prevRow];
  }

  return prevRow[n];
}
export function setCookieClientSide(
  name: string,
  value: string,
  daysToExpire: number
) {
  if (typeof window !== "undefined") {
    let expires = "";
    if (daysToExpire) {
      let date = new Date();
      date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
}
