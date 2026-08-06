// Unique-per-run data generators so tests don't collide with seed data or with each other
// across repeated runs against the same shared test DB.

export function uniqueSuffix(): string {
  return `${Date.now()}${Math.floor(Math.random() * 10000)}`;
}

// clients.email is VARCHAR(40) (server/schema.aiven.sql). Base36-encoding the timestamp+random
// portion keeps the suffix short (~10 chars) so `${prefix}_${suffix}@example.com` reliably fits
// under 40 chars even for longer prefixes — a plain decimal suffix (up to 17 digits) plus a
// realistic prefix and "@example.com" (12 chars) could exceed the column and get silently
// truncated or rejected by MySQL strict mode, which is what originally broke
// admin/clients-crud.spec.ts's client-creation test.
export function uniqueEmailSuffix(): string {
  return `${Date.now().toString(36)}${Math.floor(Math.random() * 1000).toString(36)}`;
}

export function uniqueEmail(prefix = 'e2e'): string {
  return `${prefix}_${uniqueEmailSuffix()}@example.com`;
}

/** Numeric IDs for admin-created entities (client_id, airplane_id, schedule_id, flight_no).
 *  Seed data uses low IDs (1-10, 41-75), so a large random range avoids collisions. */
export function uniqueNumericId(): number {
  return Math.floor(500000 + Math.random() * 400000);
}

export const seedAdmins = {
  ahmad: { username: 'Ahmad', password: 'fast123' },
  faheem: { username: 'Faheem', password: 'notfast123' },
  mohsin: { username: 'Mohsin', password: 'yesfast123' },
};

export const seedCustomerPassword = 'clientpass123';

export const seedCustomers = {
  mohsin: { client_id: 1, email: 'mohsinalimirza@gmail.com' },
  ahmad: { client_id: 2, email: 'ahmadaleem@hotmail.com' },
  hatif: { client_id: 3, email: 'muhammadhatifmujahd@yahoo.com' },
  wahaj: { client_id: 4, email: 'wahajjaved@gmail.com' },
  asfeen: { client_id: 5, email: 'asfeenhakani@gmail.com' },
  dure: { client_id: 6, email: 'duresameenwaseem@outlook.com' },
  abdullah: { client_id: 7, email: 'abdullahkhawajaghori@gmail.com' },
  saad: { client_id: 8, email: 'muhammadsaad@gmail.com' },
  marij: { client_id: 9, email: 'muhammadmarij@gmail.com' },
  waleed: { client_id: 10, email: 'muhammadwaleedgul@gmail.com' },
};

/** Seeded flight usable for the booking-flow test: flight_no 40, schedule 60 (9-Jul-2023),
 *  fares 5000. Both departure/arrival airport dropdown values are unused for actual date
 *  filtering (search.js only filters by date+fares) so any departure/arrival airport works. */
export const bookingFlowFlight = {
  flight_no: 40,
  schedule_id: 60,
  departureDateISO: '2023-07-09', // <input type="date"> value for schedule 60's 9-Jul-2023 date
  fares: 5000,
};
