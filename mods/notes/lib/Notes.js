Notes = new Mongo.Collection('notes');

Notes.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        if(doc.authorId === userId)
            return true;
    },
    remove: function (userId, doc) {
        if (!doc.authorId) {
            return true;
        } else {
            return doc.authorId === userId;
        }
    }
});

Notes.deny({
    insert: function (userId, doc) {
        return !userId;
    },
    update: function(userId, docs, fields, modifier) {
        return _.contains(fields, 'authorId') || _.contains(fields, 'createdAt');
    }
});