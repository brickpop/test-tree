export type Rule = {
  comment?: string;
  given?: string;
  when?: string;
  and?: Array<Rule>;
  then?: Array<Rule>;
  it?: string;
};

export type TreeItem = {
  content: string;
  children: Array<TreeItem>;
  comment?: string;
};
