/*
    279. Perfect Squares - Medium
    Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.
    
    Eg. Input: n = 12
        Output: 3 
        Explanation: 12 = 4 + 4 + 4.
    
    ~~Solution~~
    Ok so this problem came up on a Wish new grad phone screen. It was honestly pretty tricky to come up with an expression to build 
    the dp array for this one because the dp approach is pretty abstract. The best advice when it comes to dp is to make a table 
    outlining the array size and what the result is of the array after each iteration. From there you can likely notice a pattern
    of how the array is built up based on previously stored elements. FOr this particular problem, it can be modeled using the 
    following recurrence relation: ps(n) = j * j + ps(n - j * j) for 1 <= j <= sqrt(n). Here's a diagram for the example which 
    will help visualize this better.

                                    ps(12)
                                   |  |  |
                --------------------  |  -------------------
                |                     |                    |
            1^2+ps(11)             2^2+ps(8)             3^2+ps(3)
            |  |  |                |     |                  |  
       ------  |  ------      ------     ------             |  
       |       |       |      |               |             |       
1^2+1^2+ps(10) | 1^2+3^2+ps(2)|               |       3^2+1^2+ps(2)
        1^2+2^2+ps(7)    2^2+1^2+ps(7) 2^2+2^2+ps(4)        |
                                        |        |          |
                                        |        |     3^2+1^2+1^2+1^2
                            2^2+2^2+1^2+ps(3)  2^2+2^2+2^2 ------> solution
    
    Time: O(n^2)
    Space: O(n)
*/             

/*
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    if(n <= 0) return 0;
    
    let dp = new Array(n + 1).fill(Number.POSITIVE_INFINITY);
    dp[0] = 0;
    dp[1] = 1;
    for(let i = 2; i <= n; i++) {
        for(let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
        }
    }
    return dp[n];
};