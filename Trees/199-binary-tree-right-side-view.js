/* 
    199. Binary Tree Right Side View - medium

    Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

    Example:

    Input: [1,2,3,null,5,null,4]
    Output: [1, 3, 4]
    Explanation:

       1            <---
     /   \
    2     3         <---
     \     \
      5     4       <---

    ~~Solution~~
    This example they gave is terrible because it doesnt highlight that the left branch may have sub-branches that
    go deeper than only the right most branch which would be included in the solution. Regardless, its a binary tree
    and we want to prioritize traversing the right subtree so we will use DFS. For each branch of recursion, we need
    to pass in a node, a level, and the result array. If our node is empty we just return the array. If our result array
    length matches our level we need to add the node value to the result array because we have reached a new depth so it
    would show from the right side. We then call dfs with node right first, then left with level + 1.
    
    Runtime: O(n) we are gonna be hitting every node in the tree
    Space: O(1) worst case, we would be storing at most about half the tree
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/*
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    let res = [];
    if(!root) return res;
    const dfs = ((node, level, res) => {
        if(!node) return res;
        if(res.length === level) res.push(node.val);
        dfs(node.right, level + 1, res);
        dfs(node.left, level + 1, res);
    });
    dfs(root, 0, res);
    return res;
};