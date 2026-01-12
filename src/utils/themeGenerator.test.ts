import { describe, it, expect } from 'vitest';
import { generateStrokeColors } from './themeGenerator';

describe('generateStrokeColors', () => {
  it('should apply opacity to rgba colors', () => {
    const result = generateStrokeColors({
      base: 'rgba(0,0,0,1)',
      opacity: 0.2,
    });

    expect(result.strokeDefault).toBe('rgba(0,0,0,0.2)');
    expect(result.strokeInteractiveEl).toBe('rgba(0,0,0,0.4)');
  });

  it('should apply opacity to hex colors', () => {
    const result = generateStrokeColors({
      base: '#ff0000',
      opacity: 0.2,
    });

    expect(result.strokeDefault).toBe('rgba(255,0,0,0.2)');
    expect(result.strokeInteractiveEl).toBe('rgba(255,0,0,0.4)');
  });

  it('should apply opacity to named colors', () => {
    const result = generateStrokeColors({
      base: 'blue',
      opacity: 0.3,
    });

    expect(result.strokeDefault).toBe('rgba(0,0,255,0.3)');
    expect(result.strokeEmphasis).toBe('rgba(0,0,255,0.6)');
  });

  it('should apply opacity to hsl colors', () => {
    const result = generateStrokeColors({
      base: 'hsl(0, 100%, 50%)',
      opacity: 0.2,
    });

    expect(result.strokeDefault).toBe('rgba(255,0,0,0.2)');
  });

  it('should apply opacity to oklch colors', () => {
    const result = generateStrokeColors({
      base: 'oklch(0.68 0.08 50)',
      opacity: 0.2,
    });

    // oklch(0.68 0.08 50) converts to approximately RGB
    expect(result.strokeDefault).toMatch(/^rgba\(\d+,\d+,\d+,0\.2\)$/);
    expect(result.strokeInteractiveEl).toMatch(/^rgba\(\d+,\d+,\d+,0\.4\)$/);
  });

  it('should use default opacity when not provided', () => {
    const result = generateStrokeColors({
      base: 'rgba(100,100,100,1)',
    });

    expect(result.strokeDefault).toBe('rgba(100,100,100,0.2)');
  });

  it('should generate status stroke colors when provided', () => {
    const result = generateStrokeColors(
      {
        base: 'rgba(0,0,0,1)',
        opacity: 0.2,
      },
      {
        danger: 'rgba(220,60,70,1)',
        success: 'rgba(60,200,120,1)',
      }
    );

    expect(result.strokeDanger).toBe('rgba(220,60,70,0.2)');
    expect(result.strokeDangerEmphasis).toBe('rgba(220,60,70,1)');
    expect(result.strokeSuccess).toBe('rgba(60,200,120,0.2)');
    expect(result.strokeSuccessEmphasis).toBe('rgba(60,200,120,1)');
  });
});
