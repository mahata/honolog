import { beforeEach, describe, expect, it, vi } from 'vitest';
import app from '../src/index';

// Mock articles for testing
const mockArticles = [
  {
    id: "1",
    title: "Test Article 1",
    content: "This is test content 1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Test Article 2",
    content: "This is test content 2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock D1 database
const mockDb = {
  prepare: vi.fn().mockReturnThis(),
  all: vi.fn().mockResolvedValue({ results: mockArticles }),
  run: vi.fn().mockResolvedValue(null),
  get: vi.fn().mockResolvedValue(null),
};

// Mock drizzle implementation
vi.mock('drizzle-orm/d1', () => ({
  drizzle: () => ({
    select: () => ({
      from: () => ({
        all: () => Promise.resolve(mockArticles)
      })
    }),
    insert: () => ({
      values: () => ({
        returning: () => ({
          get: () => Promise.resolve(mockArticles[0])
        })
      })
    })
  })
}));

describe('API Endpoints', () => {
  let bindings: { DB: any };

  beforeEach(() => {
    bindings = {
      DB: mockDb
    };
  });

  describe('GET /api/v1/articles', () => {
    it('should return all articles', async () => {
      const res = await app.fetch(
        new Request('http://localhost/api/v1/articles'),
        bindings
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toEqual(mockArticles);
    });
  });
});
