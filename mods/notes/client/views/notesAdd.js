Template.notesAdd.events({
    'submit .js-add-note-form': function (event, tmpl) {
        event.preventDefault();

        var title = tmpl.$('[name="title"]').val();
        var content = tmpl.$('[name="content"]').val();
        var access = tmpl.$('input[name=access]:checked').val();
        var skey = tmpl.$('[name=secretKey]').val();



        Meteor.call('addNewNote', title, content, access, skey, function (err) {
            if (err) {
                toastr.error(err.reason);
            } else {
                toastr.success("Note added");
                FlowRouter.go('/notes');
            }
        });
    }
});

