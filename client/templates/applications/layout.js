Template.layout.helpers({
	pageTitle : function() {return Session.get('pageTitle');}
});
//Trigger in the browser console to set the session -> Session.set('pageTitle','Title Value');