/**
 * Mock users for JWT login.
 * In production, use a real database and hashed passwords.
 */

const users = [
  {
    id: '1',
    email: 'pilot@airline.com',
    password: 'pilot123',
    name: 'Test Pilot',
  },
  {
    id: '2',
    email: 'admin@airline.com',
    password: 'admin123',
    name: 'Fleet Admin',
  },
];

function findByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

module.exports = {
  findByEmail,
};
