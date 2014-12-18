Template.postSubmit.events({
	'submit form' : function(e){
		e.preventDefault();

		var post = {
			url : $(e.target).find('[name=url]').val(),
			title : $(e.target).find('[name=title]').val()
		};

		Meteor.call('postInsert',post,function(error,result){
			//display the error to the user and abort
			if(error){
				return alert('Error: ' + error.reason);
			}

			if(result.postExists){
				alert ('This link has been posted before');
			}

			//Router.go('postPage',{_id:result._id});
		});
			/*Change to display list of post and move the code here so that the client 
			will not wait until the postInsert Method call finish (return result)
			(For the sake of testing latency compensation)
			*/
			Router.go('postsLists');
	}
});