var replaceWords = function(dictionary, sentence) {
    let words = sentence.split(" ");
    
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let shortestRoot = null;

        for (let root of dictionary) {
            if (word.startsWith(root)) {
                if (!shortestRoot || root.length < shortestRoot.length) {
                    shortestRoot = root;
                }
            }
        }

        if (shortestRoot) {
            words[i] = shortestRoot;
        }
    }
    
    return words.join(" ");
};

const dictionary1 = ["cat","bat","rat"];
const sentence1 = "the cattle was rattled by the battery";
console.log(replaceWords(dictionary1, sentence1)); 

const dictionary2 = ["a","b","c"];
const sentence2 = "aadsfasf absbs bbab cadsfafs";
console.log(replaceWords(dictionary2, sentence2)); 