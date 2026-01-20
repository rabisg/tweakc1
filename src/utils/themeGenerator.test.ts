import { describe, it, expect } from 'vitest';
import {
  generateSemanticColors,
  generateFontVariables,
  defaultColorEngine,
} from './themeGenerator';

describe('defaultColorEngine', () => {
  describe('generateHover', () => {
    it('should lighten colors in dark mode', () => {
      const result = defaultColorEngine.generateHover('rgb(100, 100, 100)', 'dark');
      expect(result).toContain('rgb');
  });

    it('should darken colors in light mode', () => {
      const result = defaultColorEngine.generateHover('rgb(100, 100, 100)', 'light');
      expect(result).toContain('rgb');
  });
  });

  describe('generatePressed', () => {
    it('should generate pressed state colors', () => {
      const result = defaultColorEngine.generatePressed('rgb(100, 100, 100)', 'dark');
      expect(result).toContain('rgb');
  });
  });

  describe('generateSubtle', () => {
    it('should generate subtle colors with low opacity', () => {
      const result = defaultColorEngine.generateSubtle('rgb(100, 100, 100)', 'dark');
      // Should have low opacity
      expect(result).toMatch(/rgba?\(/);
    });
  });
});

describe('generateSemanticColors', () => {
  it('should generate all required color keys', () => {
    const result = generateSemanticColors(
      { primary: 'rgb(0, 100, 200)' },
      defaultColorEngine,
      'dark'
    );

    // Check some key color variables exist
    expect(result).toHaveProperty('primaryFills');
    expect(result).toHaveProperty('primaryText');
    expect(result).toHaveProperty('primaryTextInverse');
  });

  it('should handle missing colors gracefully', () => {
    const result = generateSemanticColors({}, defaultColorEngine, 'dark');
    expect(result).toBeDefined();
  });

  it('should generate different colors for light and dark modes', () => {
    const darkResult = generateSemanticColors(
      { primary: 'rgb(0, 100, 200)' },
      defaultColorEngine,
      'dark'
    );
    const lightResult = generateSemanticColors(
      { primary: 'rgb(0, 100, 200)' },
      defaultColorEngine,
      'light'
    );

    // Hover colors should be different based on mode
    expect(darkResult.primaryFillsHover).not.toBe(lightResult.primaryFillsHover);
  });
});

describe('generateFontVariables', () => {
  it('should generate font variables with default weights (400, 500, 600)', () => {
    const result = generateFontVariables({
      body: 'Inter',
      heading: 'Inter',
      mono: 'Menlo',
    });

    // Body fonts should use weight 400 (regular)
    expect(result.fontBody).toBe('400 16px/1.5 Inter');
    expect(result.fontBodyHeavy).toBe('500 16px/1.5 Inter');
    
    // Heading fonts should use weight 600 (bold)
    expect(result.fontHeadingLarge).toBe('600 28px/1.15 Inter');
    expect(result.fontHeadingMedium).toBe('600 24px/1.15 Inter');
    
    // Mono fonts
    expect(result.fontNumber).toBe('400 16px/1.5 Menlo');
    expect(result.fontNumberHeavy).toBe('500 16px/1.5 Menlo');
  });

  it('should allow custom regular weight', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
        heading: 'Inter',
      },
      undefined,
      { regular: 300 }
    );

    // Regular fonts should now use 300
    expect(result.fontBody).toBe('300 16px/1.5 Inter');
    expect(result.fontBodySmall).toBe('300 14px/1.5 Inter');
    // Medium should still be 500 (default)
    expect(result.fontBodyHeavy).toBe('500 16px/1.5 Inter');
    // Bold should still be 600 (default)
    expect(result.fontHeadingLarge).toBe('600 28px/1.15 Inter');
  });

  it('should allow custom medium weight', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
        heading: 'Inter',
      },
      undefined,
      { medium: 700 }
    );

    // Regular should still be 400 (default)
    expect(result.fontBody).toBe('400 16px/1.5 Inter');
    // Medium fonts should now use 700
    expect(result.fontBodyHeavy).toBe('700 16px/1.5 Inter');
    expect(result.fontLabelHeavy).toBe('700 16px/1.2 Inter');
    // Bold should still be 600 (default)
    expect(result.fontHeadingLarge).toBe('600 28px/1.15 Inter');
  });

  it('should allow custom bold weight', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
        heading: 'Inter',
      },
      undefined,
      { bold: 800 }
    );

    // Regular should still be 400 (default)
    expect(result.fontBody).toBe('400 16px/1.5 Inter');
    // Medium should still be 500 (default)
    expect(result.fontBodyHeavy).toBe('500 16px/1.5 Inter');
    // Bold fonts should now use 800
    expect(result.fontHeadingLarge).toBe('800 28px/1.15 Inter');
    expect(result.fontHeadingMedium).toBe('800 24px/1.15 Inter');
    expect(result.fontHeadingSmall).toBe('800 18px/1.25 Inter');
  });

  it('should allow all custom weights', () => {
    const result = generateFontVariables(
      {
        body: 'Roboto',
        heading: 'Roboto',
        mono: 'Fira Code',
      },
      undefined,
      { regular: 300, medium: 600, bold: 800 }
    );

    expect(result.fontBody).toBe('300 16px/1.5 Roboto');
    expect(result.fontBodySmall).toBe('300 14px/1.5 Roboto');
    expect(result.fontBodyHeavy).toBe('600 16px/1.5 Roboto');
    expect(result.fontHeadingLarge).toBe('800 28px/1.15 Roboto');
    expect(result.fontNumber).toBe('300 16px/1.5 Fira Code');
    expect(result.fontNumberHeavy).toBe('600 16px/1.5 Fira Code');
  });

  it('should handle only body font', () => {
    const result = generateFontVariables(
      {
        body: 'Arial',
      },
      undefined,
      { regular: 200 }
    );

    expect(result.fontBody).toBe('200 16px/1.5 Arial');
    expect(result.fontBodyHeavy).toBe('500 16px/1.5 Arial');
    expect(result.fontLabel).toBe('200 16px/1.2 Arial');
    expect(result.fontLabelHeavy).toBe('500 16px/1.2 Arial');
    
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
      { bold: 700 }
    );

    expect(result.fontHeadingLarge).toBe('700 28px/1.15 Georgia');
    expect(result.fontHeadingMedium).toBe('700 24px/1.15 Georgia');
    expect(result.fontHeadingSmall).toBe('700 18px/1.25 Georgia');
    
    // Should not have body fonts
    expect(result.fontBody).toBeUndefined();
    expect(result.fontBodyHeavy).toBeUndefined();
  });

  it('should work with letter spacing parameter (px to em conversion)', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
      },
      { body: 0.32 }, // 0.32px / 16 = 0.02em
      {}
    );

    expect(result.fontBody).toBe('400 16px/1.5 Inter');
    expect(result.fontBodyLetterSpacing).toBe('0.0200em');
    expect(result.fontBodyHeavyLetterSpacing).toBe('0.0200em');
  });

  it('should apply custom weights with letter spacing', () => {
    const result = generateFontVariables(
      {
        body: 'Inter',
      },
      { body: -0.16 }, // -0.16px / 16 = -0.01em
      { regular: 300, medium: 600 }
    );

    expect(result.fontBody).toBe('300 16px/1.5 Inter');
    expect(result.fontBodyHeavy).toBe('600 16px/1.5 Inter');
    expect(result.fontBodyLetterSpacing).toBe('-0.0100em');
  });
});
