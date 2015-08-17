Meteor.methods({
    addNewNote: function (title, content, access, skey) {
        check(title, String);
        check(content, String);
        check(access, String);
        check(skey, String);


        if (!this.userId) {
            throw new Meteor.Error('403', 'Not logged in');
        }
        if (!title || !content || !access) {
            throw new Meteor.error('no-data', 'Please provide data');
        }
        if(skey.length>0){
            var secret = true;
        } else
            var secret = false;

        Notes.insert({
            title: title,
            content: content,
            access: access,
            secret: secret,
            secretkey: skey,
            createdAt: new Date(),
            authorId: this.userId
        });
    },
    editNote: function (id, title, content, access, skey) {
        check(id, String);
        check(title, String);
        check(content, String);
        check(access, String);
        check(skey, String);

        if (!this.userId) {
            throw new Meteor.Error('403', 'Not logged in');
        }
        if (!title || !content || !access) {
            throw new Meteor.error('no-data', 'Please provide data');
        }
        if(skey.length>0){
            var secret = true;
        } else
            var secret = false;

        Notes.update(id, {
            $set: {
                title: title,
                content: content,
                access: access,
                secret: secret,
                secretkey: skey,
                updatedAt: new Date()
            }
        });
    }
});