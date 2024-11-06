import { parseDefinition } from "./lib/parsing.ts";
import { renderAsMarkdown } from "./lib/tree-render.ts";
import { readStdinText } from "./lib/util.ts";

async function main() {
  const yamlDefinition = await readStdinText();
  const tree = processDefinition(yamlDefinition);
  Deno.stdout.write(new TextEncoder().encode(tree));
}

export function processDefinition(yaml: string): string {
  const root = parseDefinition(yaml);
  return renderAsMarkdown(root);
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("Error: " + err.message);
  });
}
