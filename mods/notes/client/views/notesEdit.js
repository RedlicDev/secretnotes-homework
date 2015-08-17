Template.notesEdit.onCreated(function () {
    this.autorun(function () {
        Meteor.subscribe('notesPrivateView', FlowRouter.getParam('id'));
    });
});

Template.notesEdit.helpers({
    note: function () {
        var noteId = FlowRouter.getParam('id');
        return Notes.findOne(noteId);
    }
});

Template.notesEdit.events({
    'submit .js-edit-note-form': function (event, tmpl) {
        event.preventDefault();

        var id = FlowRouter.getParam('id');
        var title = tmpl.$('[name="title"]').val();
        var content = tmpl.$('[name="content"]').val();
        var access = tmpl.$('input[name=access]:checked').val();
        var skey = tmpl.$('[name=secretKey]').val();

        Meteor.call('editNote', id, title, content, access, skey, function (err) {
            if (err) {
                toastr.error(err.reason);
            } else {
                toastr.success("Note edited");
                FlowRouter.go('/notes');
            }
        });
    }
});

