/* 
    146. LRU Cache - Medium
    Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

    get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
    put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, 
    it should invalidate the least recently used item before inserting a new item.

    The cache is initialized with a positive capacity.
    
    ~~Solution~~
    For a least recently used cache we should implement a queue because its FIFO which matches LRU. 
    We can implement a queue using a linkedlist. 
    Since we will be moving the tail of the linkedlist to the head as get is called (to match a queue) we should make it a doubly linked list 
    to access both the head and tail in O(1).

    For get we have 2 cases: if it exists we grab the node and insert it to the head otherwise we return -1.

    For set we have 2 cases: if it exists we update the value and move it to the head. 
    If it doesnt exist we generate a new node and attach it to the head. if the cache size exceeds capacity we remove the tail of the list.

    So we need 3 helper methods to manipulate the doubly linked list:
    1. attachToHead: attach an unlinked node to head
    2. moveToHead: move a linked node to head
    3. removeLast: remove tail of the list

    Time: O(1)
    Space: O(n) - n being the size of capacity given
*/

var Node = function(key, val) {
    this.prev = null;
    this.next = null;
    this.val = val;
    this.key = key;
}
/*
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
    this.capacity = capacity;
    this.map = new Map();
};

/*
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let node = this.map.get(key);
    if(node) {
       this.moveToHead(node);
        return node.val;
    }
    else {
        return -1;
    }
};

/*
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let node = this.map.get(key);
    if(!node) {
        node = new Node(key, value);
        this.attachToHead(node);
        this.size++;
    }
    else {
        node.val = value;
        this.moveToHead(node);
    }
    if(this.size > this.capacity) {
        this.removeLast();
        this.size--;
    }
    this.map.set(key, node);
};

//helper methods for manipulating the doubly linkedlist
LRUCache.prototype.attachToHead = function(node) {
    node.next = this.head.next;
    node.next.prev = node;
    this.head.next = node;  
    node.prev = this.head;
};
LRUCache.prototype.moveToHead = function(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.attachToHead(node);
};
LRUCache.prototype.removeLast = function(node) {
    let last = this.tail.prev;
    last.prev.next = this.tail;
    this.tail.prev = last.prev;
    this.map.delete(last.key);
};