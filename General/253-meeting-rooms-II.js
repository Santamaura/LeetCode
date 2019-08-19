/*
    253. Meeting Rooms II - Medium

    Given an array of meeting time intervals consisting of start and end times 
    [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

    Eg. Input: [[0, 30],[5, 10],[15, 20]]
    Output: 2

    ~~Solution~~
    Credit goes to the official leetcode answers for this nifty solution. My original solution was their 1st approach
    but would have been worse in terms of time complexity;

    So this is an optimization problem. Initially one may think recursion + DP but we actually don't need to go that far.
    If we separate the timespan tuples and store them in a respective start and end arrays we can use the following logic:
    Sort the arrays so they are in lexographical order. We loop through the start array, and have a pointer for the start
    array and one for the end array. Anytime we encounter a start time that equals or exceeds our current end time, we
    decrease our counter by 1 and increase our end pointer by 1. Every iteration of the loop we increase the count by 1 
    and our start pointer. 
    Why does this work? It works because we are prefilling meeting rooms but anytime we find an end time that is less than 
    our start time we can use an already existing meeting room and we can remove a pre added meeting room.

    Time: O(nlgn)
    Space: O(n)
    */
/*
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    let start = [];
    let end = [];
    for(let [s,e] of intervals) {
        start.push(s);
        end.push(e);
    }
    start.sort((a,b) => { return a - b});
    end.sort((a,b) => { return a - b});
    let stIdx = endIdx = count = 0;
    while(stIdx < start.length) {
        if(start[stIdx] >= end[endIdx]) {
            endIdx++;
            count--;
        }
        count++;
        stIdx++;
    }
    return count;
};
