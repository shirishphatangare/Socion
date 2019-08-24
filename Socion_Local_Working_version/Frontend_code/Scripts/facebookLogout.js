            
window.fbAsyncInit = function() 
    {
    
    FB.init({
    appId      : '348144888569229',
    status     : true, 
    cookie     : true,
    xfbml      : true,
    oauth      : true
    });
    
    
   FB.Event.subscribe('auth.logout', function(response) {
        var Loggeduser = getCookie('Loggeduser');
        deleteAllCookies(Loggeduser);
        //clearTimeout(sessionTimeout);
        document.location = "index.html";
    });
    
        
        
    };
    
    
    (function(d){
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
    }(document));
    
    
function postToFeed(articleId,newsTitle,category,image,description) 
{
    var facebookStatus = getCookie('ifbc');
    
    if(trim(image) == "")
    {    
        image = getCategoryImage(category);
        image = image.replace("..","http://192.168.1.67:8080/Socion");
    }
    
    if(trim(description) == "")
    {    
        description = 'oursocion.com is a social news aggregator. You can share online stories with each other.' ;
    }
    
    if(facebookStatus == "false")
        return;
    

    var Main_Submitter_FirstName = getCookie('U_F');

    var publish = { 
        method: 'stream.publish',
        message: Main_Submitter_FirstName + ' read a story in ' + category + ' category on oursocion.com',
        link:'http://192.168.1.67:8080/Story/ReadArticle?aid=' + articleId,
        name: newsTitle,
        caption:'192.168.1.67:8080',
        picture: image,  
        description: description      
    };

    FB.api('/me/feed', 'POST', publish, function(response) {
            if (!response || response.error) {
                //alert('Error occured ' + response.error );
            } else {
                //alert('Post ID: ' + response.id);
            }
            });
}
    
        
        
