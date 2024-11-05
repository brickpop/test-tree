export async function readStdinText() {
  let result = "";
  const decoder = new TextDecoder();
  for await (const chunk of Deno.stdin.readable) {
    const text = decoder.decode(chunk);
    result += text;
  }
  return result;
}

export function cleanText(input: string): string {
  return input.replace(/[^a-zA-Z0-9 ]/g, "").trim();
}
