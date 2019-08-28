/*
    528. Random Pick with Weight - medium

    Given an array w of positive integers, where w[i] describes the weight of index i, 
    write a function pickIndex which randomly picks an index in proportion to its weight.

    Eg. Input: 
    ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
    [[[1,3]],[],[],[],[],[]]
    Output: [null,0,1,1,1,0]

    ~~Solution~~
    Ya the description for this one is terrible. I had no idea what it meant to randomly pick an index in 
    proportion to weight and the examples didnt do any favors. This solution is the js version of the LC
    solution. Basically what we need to do is 'randomly' select an index but have it based on its weighting through
    probability. So if we had [1,2,3,4] We would have a 1/10 chance at 1, 2/10 chance at 2, 3/10 chance at 3 or
    4/10 chance at 4. We can achieve this by defining a sum in the parent class and an accumulated weight array which
    will be set up as we iterate through the input array. So in the above example, our weighted array = [1,3,6,10] (aka prefix sum array)
    which gives us an indication of the distribution of our numbers if we had a probability array representing them eg
    [1,2,2,3,3,3,4,4,4,4]. Now that we have our prefix array, we will choose a target value by taking the floor of random * 
    sum which will give a num anywhere b/w 0-10. We then perform a binary search for that value on our prefix array. After 
    the binary search is done, lo will point to the last element in the array which is index 3. 
    Runtime O(lgn)
    Space: O(n)
*/

/*
 * @param {number[]} w
 */
var Solution = function(w) {
    this.sum = 0;
    this.arr = [];
    for(let val of w) {
        this.sum += val;
        this.arr.push(this.sum);
    }
};

/*
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    const target = Math.floor(Math.random() * this.sum);
    console.log(target);
    let lo = 0;
    let hi = this.arr.length - 1;
    while(lo !== hi) {
        let mid = Math.floor((lo + hi) / 2);
        if(target >= this.arr[mid]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
};