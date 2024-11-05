import { parseDefinition } from "./lib/parsing.ts";
import { renderAsMarkdown } from "./lib/tree-render.ts";
import { readStdinText } from "./lib/util.ts";

async function main() {
  const yamlDefinition = await readStdinText();
  const root = parseDefinition(yamlDefinition);
  const tree = renderAsMarkdown(root);

  Deno.stdout.write(new TextEncoder().encode(tree));
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("Error: " + err.message);
  });
}
