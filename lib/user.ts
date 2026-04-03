import { v4 as uuidv4 } from "uuid"; // нужно установить: npm install uuid
import { cookies } from "next/headers";

export async function getGuestId() {
  const cookieStore = await cookies();
  let guestId = cookieStore.get("guest_id")?.value;

  if (!guestId) {
    guestId = crypto.randomUUID(); // Современный стандарт браузеров
    // Но на сервере лучше генерировать через библиотеку или просто возвращать null,
    // пока клиент не установит куку.
  }

  return guestId;
}
