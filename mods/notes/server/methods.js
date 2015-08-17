Meteor.methods({
    keyVerification: function(id, key) {
        check(id, String);
        check(key, String);

        var note = Notes.findOne({_id: id, secretkey: key});
        return !!note;
    }
});