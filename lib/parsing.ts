import { parse } from "jsr:@std/yaml";
import { Rule, TreeItem } from "./types.ts";
import { cleanText } from "./util.ts";

export function parseDefinition(yamlDefinition: string): TreeItem {
  const data = parse(yamlDefinition) as { [k: string]: Array<Rule> };
  if (!data || typeof data !== "object") {
    throw new Error("The file format is not a valid yaml object");
  }

  const rootKeys = Object.keys(data);
  if (rootKeys.length > 1) {
    throw new Error("The test definition must have only one root node");
  }
  const [rootKey] = rootKeys;
  if (!rootKey || !data[rootKey]) {
    throw new Error("A root node needs to be defined");
  } else if (!data[rootKey].length) {
    throw new Error("The root node needs to include at least one element");
  }

  return {
    content: rootKey,
    children: parseRuleChildren(data[rootKey]),
  };
}

function parseRuleChildren(lines: Array<Rule>): Array<TreeItem> {
  if (!lines.length) return [];

  const result: Array<TreeItem> = lines.map((rule) => {
    if (!rule.when && !rule.given && !rule.it)
      throw new Error("All rules should have a 'given', 'when' or 'it' rule");

    let content = "";
    if (rule.given) {
      content = "Given " + cleanText(rule.given);
    } else if (rule.when) {
      content = "When " + cleanText(rule.when);
    } else if (rule.it) {
      content = "It " + rule.it;
    }

    let children: TreeItem[] = [];
    if (rule.and?.length) {
      children = parseRuleChildren(rule.and);
    } else if (rule.then?.length) {
      children = parseRuleChildren(rule.then);
    }

    const result: TreeItem = {
      content,
      children,
    };

    if (rule.comment) result.comment = rule.comment;
    return result;
  });

  return result;
}
