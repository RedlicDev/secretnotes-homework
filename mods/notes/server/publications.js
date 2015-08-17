Meteor.publish('notesListing', function () {
    // var id = this.userId();
    return Notes.find({
        authorId: this.userId
    }, {
        fields: {
            title: 1,
            access: 1
        }
    });
});
Meteor.publish('notesPublicView', function (id) {
    check(id, String);
    return Notes.find({_id: id, access: 'public'}, {fields: {secret: 1}});
});

Meteor.publish('notesPublicFullView', function (id) {
    check(id, String);
    return Notes.find({_id: id, access: 'public'}, {fields: {secretkey: 0}});
});

Meteor.publish('notesPrivateView', function (id) {
    check(id, String);
    return Notes.find({_id: id, authorId: this.userId}); // autor i tak zna klucz wiec nie ma potrzeby go chowac
});
