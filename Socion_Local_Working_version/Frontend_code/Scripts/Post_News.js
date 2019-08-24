
tokenID = getParameterfromURL("td");



function IsEmpty()
{
    var title = document.getElementById("Newstitle").value;
    var url = document.getElementById("Newsurl").value;
    var categoryIndex = document.getElementById("category").selectedIndex;

    if (title == "")
    {
  
        document.getElementById("outputmessage").innerHTML = "<b> Error! Title is empty." + "</b>" ;
        return false;
    }

    if (url == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Link is empty." + "</b>" ;
        return false;
    }
    
    if(categoryIndex == 0)
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Please select category" + "</b>" ;
        return false;
    }

    return true;
}




function createNews()
{

    if (IsEmpty()== false)
        return;

    var Title = document.getElementById("Newstitle").value;
    var Url = document.getElementById("Newsurl").value;
    var Desc = document.getElementById("Newsdesc").value;
    var imageUrl = document.getElementById("newsImageUrl").value;
    
    var Loggeduser = getCookie('Loggeduser');

    Title = setNewsData(Title);
    Url = setNewsData(Url);
    Desc = setNewsData(Desc);
    imageUrl = setNewsData(imageUrl);

    if(Desc == "")
        Desc = " ";
    
    if(imageUrl == "")
        imageUrl = " ";
    
    var currentDateTime = getCurrentDateTime();
    var category = document.getElementById("category").value;

    var ReqXML = "";
    
    ReqXML = ReqXML + "<article>";
    ReqXML = ReqXML + "<title>" + Title + "</title>";
    ReqXML = ReqXML + "<description>" + Desc + "</description>";
    ReqXML = ReqXML + "<url>" + Url + "</url>";
    ReqXML = ReqXML + "<category>" + category + "</category>";
    ReqXML = ReqXML + "<datePosted>" + currentDateTime + "</datePosted>";
    ReqXML = ReqXML + "<postedBy>" + Loggeduser + "</postedBy>";
    ReqXML = ReqXML + "<imageurl>" + imageUrl + "</imageurl>";
    ReqXML = ReqXML + "</article>"

    var url = "/resources/articles/" ;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {

                document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! Story Posted </b></font>" ;

                var articleID = xhttp.responseText;

                if(articleID.length > 0)
                    updateOutbox(Loggeduser,articleID);

            }
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 500:
                        Errortext = "Internal server error!";
                        break;
                    case 400:
                        Errortext = "Invalid input XML!";
                        break;
                    case 403:
                        Errortext = "This URL has been already posted in the system! ";
                        break;
                    default:
                        Errortext = "HTTP Error code: " + xhttp.status;
                }

                document.getElementById("outputmessage").innerHTML = "<b> Error! Story NOT posted <br/>" + Errortext + "</b>" ;

            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        
        xhttp.open("POST",url,true);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");

        var d = new Date()
        var offsetMillis = d.getTimezoneOffset() * 60 * 1000;

        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser + ";TimeZoneOffset=" + offsetMillis); 
        xhttp.send(ReqXML);

    }
    else
        alert("Ajax functionality is not supported by your browser!");

}



function getUrlHeaderParameters(webUrl)
{
    var Loggeduser = getCookie('Loggeduser');

    if(trim(webUrl) == "")
    {
        document.getElementById("Newstitle").value = "";
        document.getElementById("Newsdesc").value = "";
        document.getElementById("newsImageUrl").value = "";
        document.getElementById("newsImage").src = "";
        document.getElementById("newsImage").border = 0;
        document.getElementById("outputmessage").innerHTML = "";

        return;
    }    

    document.getElementById("Newstitle").value = "";
    document.getElementById("Newsdesc").value = "";
    document.getElementById("newsImageUrl").value = "";
    document.getElementById("newsImage").src = "";
    document.getElementById("newsImage").border = 0;
    document.getElementById("outputmessage").innerHTML = "";
    
    var url = "/resources/articles/urlheader" + "?weburl=" + webUrl;
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if ((xhttp1.readyState==4) && (xhttp1.status == 200))
        {
            
            document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\"><b> Valid URL </b></font>" ;

            var xmlDoc = xhttp1.responseXML;
            //alert(xhttp1.responseText);
            
            var readUrlTitle = xmlDoc.getElementsByTagName("urltitle");
            var readUrlDescription = xmlDoc.getElementsByTagName("urldescription");
            var readUrlImage = xmlDoc.getElementsByTagName("urlimage");

            
            var urltitle = readUrlTitle[0].firstChild.nodeValue;
            var urldescription = readUrlDescription[0].firstChild.nodeValue;
            var urlimage = readUrlImage[0].firstChild.nodeValue;
            
            if(urltitle != "null")
                document.getElementById("Newstitle").value = urltitle;
            else
                document.getElementById("Newstitle").value = "";

            if(urldescription != "null")
                document.getElementById("Newsdesc").value = urldescription;
            else
                document.getElementById("Newsdesc").value = " ";

            if(urlimage != "null")
            {    
                document.getElementById("newsImageUrl").value = urlimage;
                document.getElementById("newsImage").src = urlimage;
                document.getElementById("newsImage").border = 1;
            }
            else
                document.getElementById("newsImageUrl").value = " ";
            
        }
        
        if(xhttp1.status == 400)
        {

            document.getElementById("outputmessage").innerHTML = "<b> Invalid URL </b>" ;

        }
        
        document.getElementById("busyicon").innerHTML = "" ;
        //document.getElementById("newsImageUrl").value = urlimage;
        
        var limitField = document.getElementById("Newsdesc");
        var limitCount = document.getElementById("countdown");
        
        if (limitField.value.length > 350) 
        {
		limitField.value = limitField.value.substring(0, 350);
	} 
        else 
        {
		limitCount.value = 350 - limitField.value.length;
	}

    };


    if(xhttp1 != null)
    {
        xhttp1.onreadystatechange = funct1;
        xhttp1.open("GET",url,true);

        xhttp1.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 

        document.getElementById("busyicon").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
        xhttp1.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");
}




function updateOutbox(membername,articleID)
{
    var Loggeduser = getCookie('Loggeduser');
    var url = "/resources/outbox/" + membername + "?ds=Submitted" ;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                //document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! Outbox Updated </b></font>" ;
            }
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 500:
                        Errortext = "Internal server error!";
                        break;
                    case 400:
                        Errortext = "Invalid input XML!";
                        break;
                    default:
                        Errortext = "HTTP Error code: " + xhttp.status;
                }

                document.getElementById("outputmessage").innerHTML = "<b> Error! Outbox Updating failed <br/>" + Errortext + "</b>" ;

            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        
        xhttp.open("PUT",url,true);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send(articleID);

    }
    else
        alert("Ajax functionality is not supported by your browser!");
   
}