
/*
    2. Add Two Numbers - Medium
    You are given two non-empty linked lists representing two non-negative integers. 
    The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
    You may assume the two numbers do not contain any leading zero, except the number 0 itself.

    Eg. Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.

    ~~Solution Explanation~~
    This problem is tricky because we need to account for if our addition of two numbers in the linkedlists causes overflow 
    in the form of a carry. We also have the problem of one list being longer than the other.
    We can approach this by traversing the linkedlists recursively and deconstructing them at each step.
    We check each node value and the next node. We will pass a carry back into the function each time.
    If we have a carry we need to add the two node values + carry else we just add the two values.
    We then define our current node by taking the modulo 10 of the sum.
    we then define the next node as the result of calling the function again with the lists two next nodes and a carry.
    If we have gone through both lists and a carry exists we define the current node as 1 and it is the tail.
    Our recursive calls on the stack will then all return building up the new merged linked list.
    Time: O(n) - the length of the longer list
    Space: O(n) - we build a list the length of the longer list
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/*
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const carry = arguments[2];
    let node = null;
    if(l1 || l2) {
        const valOne = l1 ? l1.val : 0;
        const valTwo = l2 ? l2.val : 0;
        const nextOne = l1 ? l1.next : null;
        const nextTwo = l2 ? l2.next : null;
        const val = carry ? valOne + valTwo + carry : valOne + valTwo;
        node = new ListNode(val % 10);
        node.next = addTwoNumbers(nextOne, nextTwo, val >= 10);
    }
    else if(carry) {
        node = new ListNode(1);
        node.next = null;
    }
    return node;
};