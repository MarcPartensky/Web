function map2str(map) {
    str = "{";
    for (const [key, value] of map) {
        str += key;
        str += ":"
        str += String(value);
        str += ","
    }
    return str.slice(0, str.length-1)+"}";
}

function tree2str(tree) {
    str = "{";
    for (const [key, value] of tree) {
        str += key;
        str += ":"
        if (value instanceof Map) {
            str += tree2str(String(value))
        } else {
            str += value;
        }
        str += ","
    }
    return str.slice(0, str.length-1)+"}";
}