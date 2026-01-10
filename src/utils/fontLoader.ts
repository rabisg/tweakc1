// Top 100 Google Fonts by popularity
export const POPULAR_FONTS = {
  "sans-serif": [
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
    "Inter",
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
  weights: number[] = [300, 400, 500, 600]
): Promise<void> {
  // Check if it's a system font (no need to load)
  if (POPULAR_FONTS.system.includes(fontFamily)) {
    return Promise.resolve();
  }

  // Check if already loaded
  if (loadedFonts.has(fontFamily)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    // Create link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      / /g,
      "+"
    )}:wght@${weights.join(";")}&display=swap`;

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
