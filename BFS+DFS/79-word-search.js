/*
    79. Word Search - Medium
    Given a 2D board and a word, find if the word exists in the grid.

    The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those 
    horizontally or vertically neighboring. The same letter cell may not be used more than once.
    Eg. board =
    [
        ['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E']
    ]
    Given word = "ABCCED", return true.
    Given word = "SEE", return true.
    Given word = "ABCB", return false.

    ~~Solution~~
    This one is kind of similar to number of islands, the only exception being we can't permanently update
    the grid in place because we might need those letters to be checked later if our first dfs is not valid.
    To get around this what we will do is use the letter during a particular run of dfs and set a temp variable
    to the original letter. After each call of dfs concludes we put back the original letter. Our exit condition
    is if we run out of letters to check as each call will pop off the first letter in word.

    Runtime: worst case O(n^2m^2) if we had a word the size of m*n and its the word begins at the end of the array. Avg case 
    will be O(nm)
    Space: worst case O(nm) for the stack on avg O(1)
*/

/*
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    if(!board) return false;
    const dfs = ((i, j, word) => {
        if(word.length === 0) return true;
        if(i < 0 || i >= board.length || j < 0 || j >= board[0].length || word[0] !== board[i][j]) return false;
        const temp = board[i][j];
        board[i][j] = '.';
        const res = dfs(i + 1, j, word.slice(1)) || dfs(i - 1, j, word.slice(1)) ||
              dfs(i, j + 1, word.slice(1)) || dfs(i, j - 1, word.slice(1));
        board[i][j] = temp;
        return res;
    });
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            if(dfs(i, j, word)) return true;
        }
    }
    return false;
};