Template.notesView.onCreated(function () {
    var self = this;
    self.keyOk = new ReactiveVar(false);
    var id = FlowRouter.getParam('id');
    this.autorun(function () {
        if (Meteor.userId()) {
            Meteor.subscribe('notesPrivateView', id);
        } else {
            Meteor.subscribe('notesPublicView', id);
            if (self.keyOk.get()) {
                Meteor.subscribe('notesPublicFullView', id);
            }
        }
    });
});


Template.notesView.helpers({
    note: function () {
        var noteId = FlowRouter.getParam('id');
        return Notes.findOne(noteId);
    },
    isKey: function () {
        if(!Meteor.userId()) {
            var noteId = FlowRouter.getParam('id');
            var isKey = Notes.findOne(noteId).secret;
            if (isKey) {
                if (Template.instance().keyOk.get()) { // zamieszane, ale tyle sie meczylem z ReactiveVar, ze nie mam sily poprawic, wazne ze dziala
                    return false
                } else
                    return true;
            } else {
                Template.instance().keyOk.set(true);
                return false;
            }
        } else
            return false;
    }
});

Template.notesView.events({
    'click .js-delete-note': function () {
        var noteId = FlowRouter.getParam('id');

        Notes.remove({_id: noteId}, function () {
            toastr.success("Note removed");
            FlowRouter.go('/notes');
        });
    },
    'submit form': function (e, t) {
        e.preventDefault();
        var k = t.$('[name="secretKey"]').val();

        Meteor.call('keyVerification', FlowRouter.getParam('id'), k, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                t.keyOk.set(result);
                if(result)
                    toastr.success("Welcome!");
                else
                    toastr.error("Access denied!");
            }
        });
    }
});