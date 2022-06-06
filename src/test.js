class node {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const tree1 = new node(1);
tree1.left = new node(2);
tree1.right = new node(2);
tree1.left.left = new node(1);
tree1.left.right = new node(2);
tree1.right.left = new node(4);
tree1.right.right = new node(1);

const tree2 = new node(2);
tree2.left = new node(2);
tree2.right = new node(3);
tree2.left.left = new node(3);
tree2.left.right = new node(6);
tree2.left.left.left = new node(2);
tree2.right.left = new node(3);
tree2.right.right = new node(1);
tree2.right.right.left = new node(5);
tree2.right.right.right = new node(6);

function solve(root) {
  let answer = 0;
  function recurse(node, current = 1, memo = new Set()) {
    if (!node) return;
    if (memo.has(node.val)) return;
    if (current > answer) answer = current;
    if (node.left)
      recurse(node.left, current + 1, new Set([...memo, node.val]));
    if (node.right)
      recurse(node.right, current + 1, new Set([...memo, node.val]));
  }
  recurse(root);
  return answer;
}

console.log(solve(tree1));
console.log(solve(tree2));
