/*
    953. Verifying an Alien Dictionary - easy

    In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. 
    The order of the alphabet is some permutation of lowercase letters.
    Given a sequence of words written in the alien language, and the order of the alphabet, 
    return true if and only if the given words are sorted lexicographicaly in this alien language.

    Example 1:
    Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
    Output: true
    Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
    
    Example 2:
    Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
    Output: false
    Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
    
    Example 3:
    Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
    Output: false
    Explanation: The first three characters "app" match, and the second string is shorter (in size.) 
    According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is 
    less than any other character.

    ~~Solution~~
    So the solution that was derived coincidentally is very similar to the leetcode solution. The solution is to store the dictionary
    in a map with its value indicating its order in the alphabet. We then check adjacent words by comparing each character in with the map
    if word2 has a letter that is less than word1 letter then its not in order, if we keep getting matching letters but we run out of letters
    in word2 first then its not in order.

    Runtime: O(C) c being the content of all the words
    Space: O(m) m being the size of the alphabet
*/

/*
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    let val = 0;
    let orderMap = new Map();
    for(let char of order) {
        orderMap.set(char, val++);
    }
    let cur = 0;
    let next = 1;
    let isInOrder = true;
    while(next < words.length) {
        let word1 = words[cur];
        let word2 = words[next];
        for(let i = 0; i < word1.length; i++) {
            if(i === word2.length) {
                isInOrder = false;
                break;
            }
            if(orderMap.get(word1[i]) > orderMap.get(word2[i])) {
                isInOrder = false;
            }
            if(orderMap.get(word1[i]) < orderMap.get(word2[i])) break;
        }
        cur++;
        next++;
    }
    return isInOrder;
};