Router.configure({
	layoutTemplate:'layout',
	loadingTemplate: 'loading',
	notFoundTemplate : 'notFoundTemplate',
	waitOn : function(){return Meteor.subscribe('posts'); }
});

Router.route('/',{name:'postsLists'});

Router.route('/posts/:_id',
	{name :'postPage',
	data : function() {return Posts.findOne(this.params._id); }
	}
);

Router.route('/submit', {name : 'postSubmit'});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});