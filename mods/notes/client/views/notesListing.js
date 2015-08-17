Template.notesListing.onCreated(function () {
    this.subscribe('notesListing');
});

Template.notesListing.helpers({
    notes: function () {
        return Notes.find({}, {
            sort: {
                title: 1
            }
        });
    }
});