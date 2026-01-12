import { describe, it, expect } from 'vitest';
import { parseColor } from './colorParser';

describe('parseColor', () => {
  describe('rgba formats', () => {
    it('should parse rgba with spaces', () => {
      const result = parseColor('rgba(255, 0, 0, 1)');
      expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse rgba without spaces', () => {
      const result = parseColor('rgba(255,0,0,1)');
      expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse rgb without alpha', () => {
      const result = parseColor('rgb(0, 255, 0)');
      expect(result).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    });
  });

  describe('hex formats', () => {
    it('should parse hex with #', () => {
      const result = parseColor('#ff0000');
      expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse hex without #', () => {
      const result = parseColor('00ff00');
      expect(result).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    });
  });

  describe('named colors', () => {
    it('should parse red', () => {
      const result = parseColor('red');
      expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should parse blue', () => {
      const result = parseColor('blue');
      expect(result).toEqual({ r: 0, g: 0, b: 255, a: 1 });
    });

    it('should parse green', () => {
      const result = parseColor('green');
      expect(result).toEqual({ r: 0, g: 128, b: 0, a: 1 });
    });
  });

  describe('hsl formats', () => {
    it('should parse hsl', () => {
      const result = parseColor('hsl(0, 100%, 50%)');
      expect(result.r).toBeCloseTo(255, 0);
      expect(result.g).toBeCloseTo(0, 0);
      expect(result.b).toBeCloseTo(0, 0);
      expect(result.a).toBe(1);
    });

    it('should parse hsla', () => {
      const result = parseColor('hsla(120, 100%, 50%, 0.5)');
      expect(result.r).toBeCloseTo(0, 0);
      expect(result.g).toBeCloseTo(255, 0);
      expect(result.b).toBeCloseTo(0, 0);
      expect(result.a).toBe(0.5);
    });
  });

  describe('oklch formats', () => {
    it('should parse oklch(0.68 0.08 50)', () => {
      const result = parseColor('oklch(0.68 0.08 50)');
      // oklch(0.68 0.08 50) should give us a peachy/orange color
      expect(result.r).toBeGreaterThan(0);
      expect(result.g).toBeGreaterThan(0);
      expect(result.b).toBeGreaterThan(0);
      expect(result.a).toBe(1);
    });

    it('should parse oklch(0.60 0.11 40)', () => {
      const result = parseColor('oklch(0.60 0.11 40)');
      expect(result.r).toBeGreaterThan(0);
      expect(result.g).toBeGreaterThan(0);
      expect(result.b).toBeGreaterThan(0);
      expect(result.a).toBe(1);
    });
  });

  describe('oklab formats', () => {
    it('should parse oklab', () => {
      const result = parseColor('oklab(0.5 0.1 0.1)');
      expect(result.r).toBeGreaterThan(0);
      expect(result.g).toBeGreaterThan(0);
      expect(result.b).toBeGreaterThan(0);
      expect(result.a).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should handle invalid color by returning black', () => {
      const result = parseColor('invalid-color-xyz');
      expect(result).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it('should handle empty string', () => {
      const result = parseColor('');
      expect(result).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });
  });
});

