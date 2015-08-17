FlowRouter.route('/notes', {
    action: function () {
        BlazeLayout.render('layout', {
            main: 'notesListing'
        });
    }
});

FlowRouter.route('/notes/add', {
    action: function () {
        BlazeLayout.render('layout', {
            main: 'notesAdd'
        });
    }
});

FlowRouter.route('/notes/:id', {
    action: function () {
        BlazeLayout.render('layout', {
            main: 'notesView'
        });
    }
});

FlowRouter.route('/notes/edit/:id', {
    action: function () {
        BlazeLayout.render('layout', {
            main: 'notesEdit'
        });
    }
});





