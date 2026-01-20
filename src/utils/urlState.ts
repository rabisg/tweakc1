import { DualModeThemeCustomization } from "../types/theme";

async function compressData(data: Uint8Array): Promise<Uint8Array> {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));
  const reader = compressedStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

async function decompressData(data: Uint8Array): Promise<Uint8Array> {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const decompressedStream = stream.pipeThrough(
    new DecompressionStream("gzip")
  );
  const reader = decompressedStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

export async function generateShareUrl(
  state: DualModeThemeCustomization,
  currentMode: "light" | "dark",
  baseUrl?: string
): Promise<string> {
  // Include the current mode in the shared state
  const stateWithMode = {
    ...state,
    currentMode,
  };
  
  const json = JSON.stringify(stateWithMode);
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(json);

  const compressed = await compressData(data);
  const base64 = btoa(String.fromCharCode(...compressed));

  const url = new URL(baseUrl || window.location.href);
  url.searchParams.set("c", base64);

  return url.toString();
}

export async function loadStateFromUrl(): Promise<DualModeThemeCustomization | null> {
  const url = new URL(window.location.href);
  const encoded = url.searchParams.get("c");

  if (!encoded) {
    return null;
  }

  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const decompressed = await decompressData(bytes);
    const textDecoder = new TextDecoder();
    const json = textDecoder.decode(decompressed);

    return JSON.parse(json) as DualModeThemeCustomization;
  } catch (error) {
    console.error("Failed to load state from URL:", error);
    return null;
  }
}

export function clearUrlState(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete("c");
  window.history.replaceState({}, "", url.toString());
}
