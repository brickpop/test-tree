import { TreeItem } from "./types.ts";

export function renderAsMarkdown(root: TreeItem): string {
  let result = root.content + "\n";

  for (let i = 0; i < root.children.length; i++) {
    const item = root.children[i];
    const newLines = renderMarkdownTreeItem(
      item,
      i === root.children.length - 1
    );
    result += newLines.join("\n") + "\n";
  }

  return result;
}

function renderMarkdownTreeItem(
  root: TreeItem,
  lastChildren: boolean,
  prefix = ""
): Array<string> {
  const result: string[] = [];

  // Add ourselves
  const content = root.comment
    ? `${root.content} // ${root.comment}`
    : root.content;

  if (lastChildren) {
    result.push(prefix + "└── " + content);
  } else {
    result.push(prefix + "├── " + content);
  }

  // Add any children
  for (let i = 0; i < root.children.length; i++) {
    const item = root.children[i];

    // Last child
    if (i === root.children.length - 1) {
      const newPrefix = lastChildren ? prefix + "    " : prefix + "│   ";
      const lines = renderMarkdownTreeItem(item, true, newPrefix);
      lines.forEach((line) => result.push(line));
      continue;
    }

    // The rest of children
    const newPrefix = lastChildren ? prefix + "    " : prefix + "│   ";
    const lines = renderMarkdownTreeItem(item, false, newPrefix);
    lines.forEach((line) => result.push(line));
  }

  return result;
}
