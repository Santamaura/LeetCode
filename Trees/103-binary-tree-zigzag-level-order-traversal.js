/* 
    103. Binary Tree Zigzag Level Order Traversal - Medium
    Given a binary tree, return the zigzag level order traversal of its nodes' values.
    (ie, from left to right, then right to left for the next level and alternate between).

    Eg. Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
   return its zigzag level order traversal as:
    [
    [3],
    [20,9],
    [15,7]
    ]

    ~~Solution~~
    Well this one is level order traversal with a bit of a twist; we swap the direction we store the levels based on our current level.
    To do this, we can no longer use a queue like in a normal level order traversal. We need to use 2 stacks; one to keep track of our current level,
    and another to keep track of our next level.
    We also need an array to store each level and and array to hold our entire solution.
    We will run a BFS like normally but instead of using shift for the current node we pop (since we are using stacks).
    When we pop a node we gotta first check if it has value. From there we gotta see what level we are at.
    If we are on an even level, we need to push left child then right child. If we are on an odd level we push right then left.
    Draww out the 2 stacks it will make sense. After we push the children we push the current node value into our current level array.
    We then need to see if our current stack is empty. If it is we need to feed it the next level stack, reset next stack, increment level,
    push our current level array to our solution array and reset our current level array.

    Time: O(n) we are simply doing a BFS O(n) with push and pop ops on stacks O(1)
    Space: O(n) we only hold O(1) amounts in our stacks and O(n) amounts in our solution array
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(!root) return [];
    let curS = [];
    let nextS = [];
    let res = [];
    let curLvl = [];
    curS.push(root);
    let level = 0;
    while(curS.length > 0) {
        let cur = curS.pop();
        if(cur) {
                if(level % 2 === 0) {
                    if(cur.left) {
                        nextS.push(cur.left);
                    }
                    if(cur.right) {
                        nextS.push(cur.right);
                    }
                }
                else {
                    if(cur.right) {
                        nextS.push(cur.right);
                    }
                    if(cur.left) {
                        nextS.push(cur.left);
                    }
                }
            curLvl.push(cur.val);
        }
        if(curS.length === 0) {
            curS = nextS;
            nextS = [];
            level++;
            res.push(curLvl);
            curLvl = [];
        }
    }
    return res;
};