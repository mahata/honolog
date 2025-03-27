// Add any global setup needed for tests

// Mock crypto.randomUUID for consistent testing
const originalCrypto = global.crypto;

// Use Object.defineProperty to mock specific methods
Object.defineProperty(global.crypto, 'randomUUID', {
  configurable: true,
  value: () => '00000000-0000-0000-0000-000000000000'
});

// Restore original implementation after tests if needed
// This can be added if you want to restore the original implementation in afterAll
// afterAll(() => {
//   Object.defineProperty(global, 'crypto', {
//     configurable: true,
//     value: originalCrypto
//   });
// });
