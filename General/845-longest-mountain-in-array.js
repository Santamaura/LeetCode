/*
    845. Longest Mountain in Array - Medium
    Let's call any (contiguous) subarray B (of A) a mountain if the following properties hold:

    B.length >= 3
    There exists some 0 < i < B.length - 1 such that B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... > B[B.length - 1]
    (Note that B could be any subarray of A, including the entire array A.)

    Given an array A of integers, return the length of the longest mountain. 

    Return 0 if there is no mountain.

    Eg. Input: [2,1,4,7,3,2,5]
        Output: 5
        Explanation: The largest mountain is [1,4,7,3,2] which has length 5.

    ~~Solution~~
    So we gotta be kinda careful with this problem because the problem because there are a bunch of cases we need to handle.
    The standard case is we have the biggest mountain somewhere in the middle of the array. However, we could also 
    have an array at the beginning of the array, the end of the array, an invalid mountain (eg peak starts at beg or end 
    of array or has a flat top), or even a flat valley where we end the mountain at the first flat point.
    
    The approach here is to keep a start point and end point for a mountain as well as 2 pointers keeping track of the value 
    just ahead and behind of end (named prev and next). We also keep a vairable for the max and a variable for whether we encountered a 
    valid mountain. The things we care about are peaks and valleys.

    Our counting condition for a mountain is as follows: end must be <= next and end <= prev and valPeak must be true.
    We then know we passed a mountain and need to check if our end - start + 1 exceeds max and if it does set max to it.
    We then set end to start and set valPeak to false. 
    If we dont meet this condition it may be a case where we are in a valley but did not encounter a mountain. Thus we need
    to set start = end as we might be at the start of a mountain.
    If we dont meet that condition we should check if prev < end > next indicating a peak in which case we set valPeak to true.
    At the end of every loop we increment prev, end and next. We keep looping til next reaches the end of the array.

    The only case the loop doesnt handle is when the whole array is the mountain. So at the end we need to check if valPeak is true.
    If it is, that means we were passing a mountain but reached the end of the array so we see if that mountain is bigger than max.

    Time: O(n)
    Space: O(1)
     */

    /*
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function(A) {
    let start = prev = max = 0;
    let end = 1;
    let next = 2;
    let valPeak = false;
    if(A.length <= 2) return 0;
    while(next < A.length) {
        if(A[end] <= A[next] && A[end] <= A[prev] && valPeak) {
            max = Math.max(end - start + 1, max);
            start = end;
            valPeak = false;
        }
        else if(A[end] <= A[prev] && A[end] <= A[next]) {
            start = end;
        }
        else if(A[prev] < A[end] && A[end] > A[next]) {
            valPeak = true;
        }
        prev++;
        end++;
        next++;
    }
    if(valPeak) max = Math.max(end - start + 1, max);
    return max;
};