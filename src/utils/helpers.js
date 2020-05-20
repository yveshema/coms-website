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
    let para, left, right,sep;
    sep = queryStr.trim();
    para = str.split(sep);
    left = para[0].split(" ").length > 10 ? 
           para[0].split(" ").slice(-10).join(" ") 
           : para[0];
    right = para.length? para.slice(1).join(sep).split(" ").slice(0,20).join(" "):"";
    return right? [left,right].join(sep) : left;
    
}