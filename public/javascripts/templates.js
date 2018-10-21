(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['allTweet'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<p>retweeted by "
    + container.escapeExpression(((helper = (helper = helpers.retweeter || (depth0 != null ? depth0.retweeter : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"retweeter","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"tweet\" data-tweet-content="
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + " data-tweet-creator="
    + alias4(((helper = (helper = helpers.creator || (depth0 != null ? depth0.creator : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creator","hash":{},"data":data}) : helper)))
    + ">\n	<p>\""
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\"</p>\n    <p>by "
    + alias4(((helper = (helper = helpers.creator || (depth0 != null ? depth0.creator : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creator","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.retweeter : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <a href=\"#\" class=\"retweet-tweet\">Retweet</a>\n</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\">\n    <h1>Groovyroom</h1>\n    <p>You must be signed in to continue.</p>\n    <button id=\"signin-btn\">Sign in</button>\n    <button id=\"register-btn\">Register</button>\n</div>\n";
},"useData":true});
templates['newsfeed'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"newsfeed\">\n    <h1>Groovyroom</h1>\n    <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logout-link\">logout</a>)</p>\n</div>";
},"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"register\">\n  <a href=\"#\" id=\"home-link\">Back to Home</a>\n  <h1>Register</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"register-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n    <br />\n    <div>First Name: <input type=\"text\" name=\"first-name\" required /></div>\n    <div>Middle Name: <input type=\"text\" name=\"middle-name\" /></div>\n    <div>Last Name: <input type=\"text\" name=\"last-name\" required /></div>\n    <div>Email: <input type=\"text\" name=\"email\" required /></div>\n    <div>Sex: <input type=\"text\" name=\"sex\" required /></div>\n    <div>Birthday: <input type=\"text\" name=\"birthday\" required /></div>\n    <br />\n    <div>College / school: <input type=\"text\" name=\"school\" /></div>\n    <div>Degree: <input type=\"text\" name=\"degree\" /></div>\n    <div>Major: <input type=\"text\" name=\"major\" /></div>\n    <br />\n    <div>Residence: <input type=\"text\" name=\"residence\" /></div>\n    <div>Hometown: <input type=\"text\" name=\"hometown\" /></div>\n    <br />\n    <div>Work employer: <input type=\"text\" name=\"work-employer\" /></div>\n    <div>Work position: <input type=\"text\" name=\"work-position\" /></div>\n    <div>Work location: <input type=\"text\" name=\"work-location\" /></div>\n    <br />\n    <div>Interested in: <input type=\"text\" name=\"interested\" /></div>\n    <div>Relationship status: <input type=\"text\" name=\"relationship-status\" /></div>\n    <input type=\"submit\" />\n  </form>\n</div>\n";
},"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\">\n    <a href=\"#\" id=\"home-link\">Back to Home</a>\n    <h1>Sign in</h1>\n    <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <form id=\"signin-form\">\n        <div>Username: <input type=\"text\" name=\"username\" required /></div>\n        <div>Password: <input type=\"password\" name=\"password\" required /></div>\n        <input type=\"submit\" />\n    </form>\n</div>";
},"useData":true});
templates['tweet'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<p>by "
    + alias4(((helper = (helper = helpers.creator || (depth0 != null ? depth0.creator : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creator","hash":{},"data":data}) : helper)))
    + "</p>\n		<p>retweeted by "
    + alias4(((helper = (helper = helpers.retweeter || (depth0 != null ? depth0.retweeter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"retweeter","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"tweet\" data-tweet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n	<p>\""
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\"</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.retweeter : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <a href=\"#\" class=\"delete-tweet\">Delete</a>\n</div>\n";
},"useData":true});
templates['tweets'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.tweet,depth0,{"name":"tweet","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "            <p><em>No tweets yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.allTweet,depth0,{"name":"allTweet","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"tweets\">\n\n    <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logout-link\">logout</a>)</p>\n\n    <div>\n        <div class=\"error\"></div>\n        <label for=\"new-tweet-input\">Post a new tweet:</label>\n        <input type=\"text\" id=\"new-tweet-input\" />\n        <button id=\"submit-new-tweet\">Post</button>\n    </div>\n\n    <div>\n        <label for=\"new-follower-input\">Follow a user:</label>\n        <input type=\"text\" id=\"new-follower-input\" />\n        <button id=\"submit-new-follower\">Follow</button>\n    </div>\n\n    <div>\n        <h1>My Tweets</h1>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tweets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n        <h1>Following</h1>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.followingTweets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n        <h1>All Tweets</h1>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.allTweets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"usePartial":true,"useData":true});
})();