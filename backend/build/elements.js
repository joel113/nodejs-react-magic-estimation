"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downvoteElement = exports.upvoteElement = exports.breakElement = exports.disbuteElement = exports.resetElement = exports.delElement = exports.addElement = void 0;
async function addElement(elementId, client) {
    const query = 'INSERT into elements(id) VALUES($1)';
    client.query(query, [elementId], (err, res) => {
        if (err) {
            console.log("Error when trying to insert: %s", err);
        }
        else {
            console.log("Inserted %d rows", res.rowCount);
        }
    });
}
exports.addElement = addElement;
async function delElement(elementId) {
}
exports.delElement = delElement;
async function resetElement(elementId) {
}
exports.resetElement = resetElement;
async function disbuteElement(elementId) {
}
exports.disbuteElement = disbuteElement;
async function breakElement(elementId) {
}
exports.breakElement = breakElement;
async function upvoteElement(elementId) {
}
exports.upvoteElement = upvoteElement;
async function downvoteElement(elementId) {
}
exports.downvoteElement = downvoteElement;
//# sourceMappingURL=elements.js.map