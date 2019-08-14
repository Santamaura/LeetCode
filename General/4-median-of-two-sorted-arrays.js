/* 
    4. Median of Two Sorted Arrays - Hard
    There are two sorted arrays nums1 and nums2 of size m and n respectively.
    Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
    You may assume nums1 and nums2 cannot be both empty.
    
    Eg. nums1 = [1, 3]
        nums2 = [2]

        The median is 2.0

    ~~Solution~~
    Spoilers, it's rated hard because the optimal solution O(lg(m+n)) is pretty complex and would be almost impossible to 
    come up with in an interview. Instead we are gonna do the intuitive approach which is slightly less optimal.
    We will build a new array up from the two sorted arrays. We iterate through the full length of the sum of array 1 and array 2 lengths.
    We need to check at every iteration whether we have reached the end of an array. If one isnt empty and two is or our number in one is less than two,
    We pass in the value in one and update the index for one. Otherwise we pass in and update two.
    We then just check if our summed length is odd or even. If odd we just return the middle element else we sum the middle element and 
    the element before and divide by 2. 
    Time: O(n + m)
    Space: O(n + m)
*/
/*
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const len = nums1.length + nums2.length;
    const medIdx = Math.floor(len / 2);
    let merged = [];
    let idxOne = idxTwo = cur = 0;
    while(cur < len) {
        let isOneEmpty = idxOne >= nums1.length;
        let isTwoEmpty = idxTwo >= nums2.length;
        if(!isOneEmpty && (isTwoEmpty || (nums1[idxOne] < nums2[idxTwo]))) {
            merged[cur] = nums1[idxOne];
            idxOne++;
        }
        else {
            merged[cur] = nums2[idxTwo];
            idxTwo++;
        }
        cur++;
    }
    return len % 2 === 1 ? merged[medIdx] : (merged[medIdx - 1] + merged[medIdx]) / 2;
};