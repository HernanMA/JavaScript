var longestCommonPrefix = function(strs) {
    if (strs.length === 0) {
        return "";
    }
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        let current = strs[i];
        let j = 0;
        
        while (j < prefix.length && j < current.length && prefix[j] === current[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        
        if (prefix === "") {
            break;
        }
    }
    
    return prefix;
};

const strs1 = ["flower","flow","flight"];
console.log(longestCommonPrefix(strs1)); 

const strs2 = ["dog","racecar","car"];
console.log(longestCommonPrefix(strs2));