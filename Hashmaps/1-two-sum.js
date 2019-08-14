/*
    1. Two Sum - Easy
    Given an array of integers, return indices of the two numbers such that they add up to a specific target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    Eg. Given nums = [2, 7, 11, 15], target = 9,
    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].

    ~~Solution Explanation~~
    The following solution makes use of a hashmap to store the difference b/w current number and our target.
    Every iteration of the loop we check if our curren number exists in the map and if it does we return 
    current index and index in our map. As we are looping we are storing the difference values in the map.

    Time: O(n) - iterating through whole array
    Space: O(n) - Worst case we store the whole array
*/
/*
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let sumMap = {};
    for(let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if(sumMap[nums[i]] !== undefined) {
            return [sumMap[nums[i]], i];
        }
        sumMap[diff] = i;
    }
    return [-1,-1];
};
