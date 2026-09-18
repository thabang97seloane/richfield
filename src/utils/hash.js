// Client-only password hashing. There is no backend to keep secrets on, so
// this only avoids storing the raw password in localStorage/state — it is
// not a substitute for real server-side authentication.
export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
