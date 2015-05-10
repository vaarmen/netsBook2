/**
 * Key/value store LOADER -- takes a text file representing a friend network
 * 							 and puts it into a DynamoDB KVS.
 */


//This is our DynamoDB KVS
var aws = require("./keyvaluestore.js");
var users = new aws('users');
var userids = new aws('userids');


users.init(function() {
	
	
	for (var i = 100; i < 200; i++) {
		
	
		var username = "user"+i;
		var json =
		{
			username: "user"+i,
			password: "user"+i,
			firstname: "user"+i,
			lastname: "user"+i,
			email: "user"+i,
			userid: i
		}
		
		console.log(json);
	
		
		users.exists(username, function(err,data){
			if(err){
				console.log("Error in create Account")
			} else if(data){
				console.log("Username" +"user"+i+ " is already being used !");
			}
			else{
				
				
				userids.put(json.userid.toString(), username, function(err, data) {
					if (err) {
						console.log("Error in adding a userid!");
						console.log(err);
						
					}
				});
				
				users.put(username, JSON.stringify(json), function(err, data) {
					if (err) {
						console.log("Error in adding a user !");
						console.log(err);
					}
				});
			}
		
			
		});
		// Dump the list of keys to the console
		
	}
	users.scanKeys(function(err,values) {
		if (err)
			throw err;
		else {
			console.log(values);
			for (var i = 0; i < values.length; i++) {
				console.log(JSON.stringify(values[i]));
			}
		}
	});
	console.log('Done with store');
		
		
});


