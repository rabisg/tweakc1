// Font weight availability for popular fonts
// Most Google Fonts support these weights, but we track known availabilities
export const FONT_WEIGHTS: Record<string, number[]> = {
  // Sans-serif fonts
  "Geist": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Inter": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Roboto": [100, 300, 400, 500, 700, 900],
  "Open Sans": [300, 400, 500, 600, 700, 800],
  "Lato": [100, 300, 400, 700, 900],
  "Montserrat": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Oswald": [200, 300, 400, 500, 600, 700],
  "Source Sans Pro": [200, 300, 400, 600, 700, 900],
  "Raleway": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Poppins": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "PT Sans": [400, 700],
  "Ubuntu": [300, 400, 500, 700],
  "Nunito": [200, 300, 400, 500, 600, 700, 800, 900],
  "Work Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Rubik": [300, 400, 500, 600, 700, 800, 900],
  "Barlow": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "DM Sans": [400, 500, 700],
  "Manrope": [200, 300, 400, 500, 600, 700, 800],
  "Mulish": [200, 300, 400, 500, 600, 700, 800, 900],
  "Outfit": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Public Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Lexend": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Red Hat Display": [300, 400, 500, 600, 700, 800, 900],
  
  // Serif fonts
  "Playfair Display": [400, 500, 600, 700, 800, 900],
  "Merriweather": [300, 400, 700, 900],
  "Lora": [400, 500, 600, 700],
  "PT Serif": [400, 700],
  "Crimson Text": [400, 600, 700],
  "EB Garamond": [400, 500, 600, 700, 800],
  "Source Serif Pro": [200, 300, 400, 600, 700, 900],
  "Spectral": [200, 300, 400, 500, 600, 700, 800],
  
  // Monospace fonts
  "Geist Mono": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Fira Code": [300, 400, 500, 600, 700],
  "JetBrains Mono": [100, 200, 300, 400, 500, 600, 700, 800],
  "Source Code Pro": [200, 300, 400, 500, 600, 700, 900],
  "Roboto Mono": [100, 200, 300, 400, 500, 600, 700],
  "IBM Plex Mono": [100, 200, 300, 400, 500, 600, 700],
  "Inconsolata": [200, 300, 400, 500, 600, 700, 800, 900],
  "Space Mono": [400, 700],
  "Ubuntu Mono": [400, 700],
  "Menlo": [400, 700],
  "Monaco": [400],
  "Courier New": [400, 700],
  
  // System fonts (assume standard weights)
  "system-ui": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "-apple-system": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Segoe UI": [300, 400, 600, 700],
  "Arial": [400, 700],
  "Helvetica": [300, 400, 700],
  "Georgia": [400, 700],
  "Times New Roman": [400, 700],
  "Verdana": [400, 700],
  "Tahoma": [400, 700],
};

// Get available weights for a font
export function getFontWeights(fontFamily: string): number[] {
  // Check if we have predefined weights
  if (FONT_WEIGHTS[fontFamily]) {
    return FONT_WEIGHTS[fontFamily];
  }
  // Default weights for unknown fonts
  return [300, 400, 500, 600, 700];
}

// Get common weights available across multiple fonts
export function getCommonWeights(fonts: (string | undefined)[]): number[] {
  const validFonts = fonts.filter((f): f is string => !!f);
  
  if (validFonts.length === 0) {
    return [400, 500, 600]; // Default if no fonts selected
  }
  
  // Get weights for all fonts
  const weightSets = validFonts.map(f => new Set(getFontWeights(f)));
  
  // Find intersection of all weight sets
  const commonWeights = [...weightSets[0]].filter(weight =>
    weightSets.every(set => set.has(weight))
  );
  
  // If no common weights, return the weights of the first font
  if (commonWeights.length === 0) {
    return getFontWeights(validFonts[0]);
  }
  
  return commonWeights.sort((a, b) => a - b);
}

// Top 100 Google Fonts by popularity
export const POPULAR_FONTS = {
  "sans-serif": [
    "Geist",
    "Inter",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Oswald",
    "Source Sans Pro",
    "Raleway",
    "Poppins",
    "PT Sans",
    "Ubuntu",
    "Nunito",
    "Roboto Condensed",
    "Mukta",
    "Work Sans",
    "Dosis",
    "Rubik",
    "Barlow",
    "Oxygen",
    "Karla",
    "Hind",
    "Cabin",
    "Quicksand",
    "Titillium Web",
    "Fira Sans",
    "Arimo",
    "Manrope",
    "Josefin Sans",
    "Mulish",
    "Heebo",
    "Abel",
    "Maven Pro",
    "Exo 2",
    "Catamaran",
    "DM Sans",
    "Asap",
    "Noto Sans",
    "Hind Siliguri",
    "Assistant",
    "Yanone Kaffeesatz",
    "Prompt",
    "Varela Round",
    "Archivo",
    "Public Sans",
    "Outfit",
    "Anton",
    "Bitter",
    "Comfortaa",
    "Fjalla One",
    "Libre Franklin",
    "Questrial",
    "Signika",
    "Kanit",
    "Saira Condensed",
    "Bebas Neue",
    "Barlow Condensed",
    "Rokkitt",
    "Shadows Into Light",
    "Pathway Gothic One",
    "Lexend",
    "Caveat",
    "Teko",
    "Cormorant Garamond",
    "Noto Sans Display",
    "Red Hat Display",
  ],
  serif: [
    "Playfair Display",
    "Merriweather",
    "Lora",
    "PT Serif",
    "Crimson Text",
    "Libre Baskerville",
    "EB Garamond",
    "Source Serif Pro",
    "Vollkorn",
    "Noto Serif",
    "Arvo",
    "Slabo 27px",
    "Cardo",
    "Cormorant",
    "Spectral",
    "Alegreya",
    "Gelasio",
    "Crimson Pro",
    "Domine",
    "Libre Caslon Text",
    "Old Standard TT",
    "Zilla Slab",
    "Alegreya Sans",
  ],
  monospace: [
    "Geist Mono",
    "Fira Code",
    "JetBrains Mono",
    "Source Code Pro",
    "Roboto Mono",
    "IBM Plex Mono",
    "Inconsolata",
    "Space Mono",
    "Ubuntu Mono",
    "Courier Prime",
    "Anonymous Pro",
    "Overpass Mono",
    "PT Mono",
  ],
  system: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Arial",
    "Helvetica",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Tahoma",
  ],
};

// Track loaded fonts to avoid duplicates
const loadedFonts = new Set<string>();

// Dynamically load a Google Font
export async function loadFont(
  fontFamily: string,
  weights?: number[]
): Promise<void> {
  // Check if it's a system font (no need to load)
  if (POPULAR_FONTS.system.includes(fontFamily)) {
    return Promise.resolve();
  }

  // Check if already loaded
  if (loadedFonts.has(fontFamily)) {
    return Promise.resolve();
  }

  // Use provided weights or get all available weights for this font
  const weightsToLoad = weights || getFontWeights(fontFamily);

  return new Promise((resolve, reject) => {
    // Create link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      / /g,
      "+"
    )}:wght@${weightsToLoad.join(";")}&display=swap`;

    // Handle load/error
    link.onload = () => {
      loadedFonts.add(fontFamily);
      resolve();
    };
    link.onerror = () => {
      reject(new Error(`Failed to load font: ${fontFamily}`));
    };

    // Append to document head
    document.head.appendChild(link);
  });
}

// Get popular fonts by category
export function getPopularFonts(
  category?: "sans-serif" | "serif" | "monospace" | "system"
): string[] {
  if (category) {
    return POPULAR_FONTS[category] || [];
  }
  // Return all if no category specified
  return [
    ...POPULAR_FONTS["sans-serif"],
    ...POPULAR_FONTS.serif,
    ...POPULAR_FONTS.monospace,
    ...POPULAR_FONTS.system,
  ];
}
