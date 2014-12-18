Posts = new Mongo.Collection('posts');

// Posts.allow({
// 	insert : function(userId,doc){
// 		//only allow posting if you are logged in
// 		return !!userId;
// 	}
// })

Posts.allow({
	update : function(userId,post){
		return ownsDocument(userId,post);
	},
	remove : function(userId,post){
		return ownsDocument(userId,post);
	},
});

Meteor.methods({
	postInsert : function(postAttributes){
		check(this.userId, String);
		check(postAttributes,{
			title : String,
			url : String
		});

		//Start : To Show Latency Compensation by appending server/client on title
		if(Meteor.isServer){
			postAttributes.title += "(server)";
			Meteor._sleepForMs(5000);
		}else{
			postAttributes.title += "(client)";
		}
		//End : To Show Latency Compensation by appending server/client on title

		var postWithSameLink = Posts.findOne({url : postAttributes.url});
		if(postWithSameLink){
			return {
				postExists : true,
				_id : postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId : user._id,
			username : user.username,
			submitted : new Date()
		});

		var postId = Posts.insert(post);
		return{
			_id : postId
		};
	}
});