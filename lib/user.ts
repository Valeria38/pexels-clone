import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function getGuestId() {
  const cookieStore = await cookies();
  let guestId = cookieStore.get("guest_id")?.value;

  if (!guestId) {
    guestId = crypto.randomUUID();
  }

  return guestId;
}
