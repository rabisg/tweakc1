import { describe, it, expect } from 'vitest';
import { generateStrokeColors, generateFontVariables } from './themeGenerator';

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

describe('generateFontVariables', () => {
  it('should generate font variables with default weight scale (1.0)', () => {
    const result = generateFontVariables({
      body: 'Inter',
      heading: 'Inter',
      mono: 'Menlo',
    });

    // Body fonts should use weight 375 (default)
    expect(result.fontBody).toBe('375 16px/1.5 Inter');
    expect(result.fontBodyHeavy).toBe('450 16px/1.5 Inter');
    
    // Heading fonts should use weight 550 (default)
    expect(result.fontHeadingLarge).toBe('550 28px/1.15 Inter');
    expect(result.fontHeadingMedium).toBe('550 24px/1.15 Inter');
    
    // Mono fonts
    expect(result.fontNumber).toBe('375 16px/1.5 Menlo');
    expect(result.fontNumberHeavy).toBe('450 16px/1.5 Menlo');
  });

  it('should scale font weights by 0.5×', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
        heading: 'Inter',
      },
      undefined,
      0.5
    );

    // 375 * 0.5 = 188 (rounded)
    expect(result.fontBody).toBe('188 16px/1.5 Inter');
    // 450 * 0.5 = 225
    expect(result.fontBodyHeavy).toBe('225 16px/1.5 Inter');
    // 550 * 0.5 = 275
    expect(result.fontHeadingLarge).toBe('275 28px/1.15 Inter');
    expect(result.fontHeadingMedium).toBe('275 24px/1.15 Inter');
  });

  it('should scale font weights by 1.5×', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
        heading: 'Inter',
      },
      undefined,
      1.5
    );

    // 375 * 1.5 = 562 (rounded)
    expect(result.fontBody).toBe('562 16px/1.5 Inter');
    // 450 * 1.5 = 675
    expect(result.fontBodyHeavy).toBe('675 16px/1.5 Inter');
    // 550 * 1.5 = 825
    expect(result.fontHeadingLarge).toBe('825 28px/1.15 Inter');
    expect(result.fontHeadingMedium).toBe('825 24px/1.15 Inter');
  });

  it('should scale font weights by 1.2×', () => {
    const result = generateFontVariables(
      {
        body: 'Roboto',
        heading: 'Roboto',
        mono: 'Fira Code',
      },
      undefined,
      1.2
    );

    // 375 * 1.2 = 450
    expect(result.fontBody).toBe('450 16px/1.5 Roboto');
    expect(result.fontBodySmall).toBe('450 14px/1.5 Roboto');
    // 450 * 1.2 = 540
    expect(result.fontBodyHeavy).toBe('540 16px/1.5 Roboto');
    // 550 * 1.2 = 660
    expect(result.fontHeadingLarge).toBe('660 28px/1.15 Roboto');
    // Mono fonts
    expect(result.fontNumber).toBe('450 16px/1.5 Fira Code');
    expect(result.fontNumberHeavy).toBe('540 16px/1.5 Fira Code');
  });

  it('should handle only body font', () => {
    const result = generateFontVariables(
      {
        body: 'Arial',
      },
      undefined,
      1.3
    );

    // 375 * 1.3 = 488 (rounded)
    expect(result.fontBody).toBe('488 16px/1.5 Arial');
    expect(result.fontBodyHeavy).toBe('585 16px/1.5 Arial');
    expect(result.fontLabel).toBe('488 16px/1.2 Arial');
    expect(result.fontLabelHeavy).toBe('585 16px/1.2 Arial');
    
    // Should not have heading fonts
    expect(result.fontHeadingLarge).toBeUndefined();
    expect(result.fontHeadingMedium).toBeUndefined();
  });

  it('should handle only heading font', () => {
    const result = generateFontVariables(
      {
        heading: 'Georgia',
      },
      undefined,
      0.8
    );

    // 550 * 0.8 = 440
    expect(result.fontHeadingLarge).toBe('440 28px/1.15 Georgia');
    expect(result.fontHeadingMedium).toBe('440 24px/1.15 Georgia');
    expect(result.fontHeadingSmall).toBe('440 18px/1.25 Georgia');
    
    // Should not have body fonts
    expect(result.fontBody).toBeUndefined();
    expect(result.fontBodyHeavy).toBeUndefined();
  });

  it('should round font weights to nearest integer', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
      },
      undefined,
      1.33
    );

    // 375 * 1.33 = 498.75 → rounds to 499
    expect(result.fontBody).toBe('499 16px/1.5 Inter');
    // 450 * 1.33 = 598.5 → rounds to 598 or 599
    expect(result.fontBodyHeavy).toMatch(/^(598|599) 16px\/1\.5 Inter$/);
  });

  it('should work with letter spacing parameter', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
      },
      0.02,
      1.0
    );

    expect(result.fontBody).toBe('375 16px/1.5 Inter');
    expect(result.fontBodyLetterSpacing).toBe('0.02em');
    expect(result.fontBodyHeavyLetterSpacing).toBe('0.02em');
  });

  it('should apply weight scale even when letter spacing is provided', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
      },
      -0.01,
      1.4
    );

    // 375 * 1.4 = 525
    expect(result.fontBody).toBe('525 16px/1.5 Inter');
    expect(result.fontBodyLetterSpacing).toBe('-0.01em');
  });
});
