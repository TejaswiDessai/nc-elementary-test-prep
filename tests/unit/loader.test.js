import { describe, it, expect, vi } from 'vitest';
import { loadQuestions } from '../../src/data/loader';

describe('loadQuestions', () => {
  it('should fetch and return a random subset of questions from the pool', async () => {
    const mockData = [
      { q: 'Q1', options: ['A', 'B'], answer: 0, explanation: 'E1' },
      { q: 'Q2', options: ['A', 'B'], answer: 1, explanation: 'E2' },
      { q: 'Q3', options: ['A', 'B'], answer: 0, explanation: 'E3' },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const questions = await loadQuestions('3', 'math', 2);
    
    expect(questions).toHaveLength(2);
    expect(global.fetch).toHaveBeenCalledWith('/data/3/math_pool.json');
  });

  it('should fallback to set1.json if pool file is missing', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: false }) // First call for pool fails
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ q: 'Fallback', options: ['A'], answer: 0, explanation: 'E' }],
      });

    const questions = await loadQuestions('3', 'math');
    
    expect(questions[0].q).toBe('Fallback');
    expect(global.fetch).toHaveBeenCalledWith('/data/3/math/set1.json');
  });

  it('should throw an error if both pool and fallback fail', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(loadQuestions('3', 'math')).rejects.toThrow('No question data found');
  });
});
