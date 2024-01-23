//Truncates text after a certain length...
export function TruncateText(str, maxLength){
    if(!str) return null;
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}