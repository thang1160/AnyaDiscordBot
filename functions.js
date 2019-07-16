// capitalize
exports.toTitleCase = function toTitleCase(str) {
    return str.replace(/(?![of])(\w+)('s)?('u)?/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
// capitalize Aw, Aw2v1, Aw2v2, Aa
exports.toAW = function toAW(str) {
    return str.replace(/((Aw)|(Aa))(\w+)?/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase();
    });
}
// delete Aw, Aw2v1, Aw2v2, Aa
exports.delAW = function delAW(str) {
    return str.replace(/(( Aw)|( Aa))(\w+)?/g, function (txt) {
        return "";
    });
}