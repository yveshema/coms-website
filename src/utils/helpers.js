export const strip_punct = (s) => s.replace(/[,)(.":]/,"");

export const snapshot = (str, queryStr) => {              
    // Extract an excerpt from the page(s)
    // returned from the index search        
    // let words = str.split(" ");        
    
    // let index, idx, end;        

    // Find the first occurence of the search term
    // Attempt a 15 word excerpt starting 5 positions
    // before up to 10 positions after
    // index = words.map(value => strip_punct(value).toUpperCase()).
    //                  indexOf(queryStr.trim().toUpperCase());        
    // idx = index > 5 ? index - 5 : index;
    // end = words.length > (index + 20) ? (index + 20) : words.length;       

    // return words.slice(idx, end ).join(" ");
    let para, left, right,sep, re;
    // split text using the query string as a separator
    // match even for capitalized versions of the string
    sep = queryStr.trim();
    sep = [sep,sep.charAt(0).toUpperCase()+ sep.slice(1)];
    sep = `${sep[0]}|${sep[1]}`;
    re = new RegExp(sep);
    para = str.split(re);
    
    // the snapshot consists of the text preceding the first occurence
    // of the search term in the text, including the term itself, and 
    // the next 20 words after the search term
    left = para[0].split(" ").length > 10 ? 
           para[0].split(" ").slice(-10).join(" ") 
           : para[0];
    right = para.length? para.slice(1).join(queryStr).split(" ").slice(0,20).join(" "):"";
    
    return left && right ? [left,right].join(queryStr) : left || right;
    
}