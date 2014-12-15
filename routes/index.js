/**
 * Main Web route handling
 */

// Note the use of the exports object.  Each function that we
// assign to exports.XXX is callable by outside modules,
// and we can "hook" to it via routes.XXX.


// These are our key-value stores
var users;
var friends;
var userids;

// We export the init() function to initialize
// our KVS values
exports.init = function(fr,usrs,uids,callback) {
	users = usrs;
	userids = uids;
	friends = fr;
	
	
	callback();
};

/**
 * Default index page fetches some content and returns it
 */
exports.index = function(req, res) {
	var t = '';
	
	// See if the session object in the cookie has
	// been set, and change title correspondingly
	if (!req.session.loadedData)
		t = 'User login or creation';
	else
		t = 'User login or creation logged in (previously fetched data)';
	
	res.render('index', { title: t });
}

exports.getData = function(req, res) {
	// TODO: update this to do the right thing,
	//       or discard this function
	
	// Dummy response:  Consult the KVS and
	// get the list of keys (users who have friends)
	friends.scanKeys(function(err,values) {
		if (err)
			throw err;
		else {
			// Update the session object to remember we've
			// requested data
			req.session.loadedData = true;
			
			// Actually output the data
			res.send(values);
		}
	});
}

/**
 * Example of another function handled by the route
 */
exports.myfn = function(req, res) {
	
	// Trigger index.ejs.  Change the name to trigger a different page.
	
	res.render('index', { title: 'This is an example page' });
}

exports.login = function(req, res) {
	
	// Trigger index.ejs.  Change the name to trigger a different page.
	
	res.render('login', { title: 'Login Page' });
}

exports.signup = function(req, res) {
	
	// Trigger index.ejs.  Change the name to trigger a different page.
	
	res.render('signup', { title: 'This is an example page Armen' });
}

exports.home = function(req, res) {
	
	// Trigger index.ejs.  Change the name to trigger a different page.
	
	res.render('home', { title: 'This is an example page Armen' });
}

exports.validate = function(req, res) {
	
	// Trigger index.ejs.  Change the name to trigger a different page.
	
	console.log("Form submitted !")
	
	var username = req.body.username
	var password = req.body.password
	//Debug
	console.log(username)
	//
	users.exists(username, function (err, data){
		if(err){
			console.log("Error in validate 1")
			return
		}
		
		if(data){
			
			users.get(username, function(err, data){
				if(err){
					console.log("Error in validate 2")
					return 
				}
				
				console.log(data)
			})
			
		}
		else{
			res.send({"username": username, "errorMessgae" : "Wrong Username",
				"success" : false} )
			
		}
	})
	
	
	
	
	//res.render('home', { title: 'This is an example page Armen' });
}

