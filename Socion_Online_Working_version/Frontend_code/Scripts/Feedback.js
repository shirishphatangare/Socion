
//tokenID = getParameterfromURL("td");



function IsEmpty()
{
    var subject = document.getElementById("subject").value ;
    var feedbacktext = document.getElementById("feedback").value ;
    var categoryIndex = document.getElementById("category").selectedIndex;

    if (feedbacktext == "")
    {
  
        document.getElementById("outputmessage").innerHTML = "<b> Error! feedback is empty." + "</b>" ;
        return false;
    }

    if (subject == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! subject is empty." + "</b>" ;
        return false;
    }
    
    if(categoryIndex == 0)
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Please select feedback option" + "</b>" ;
        return false;
    }
    
    return true;
}



function sendFeedback()
{
    if (IsEmpty()== false)
        return;
    
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == '')
        Loggeduser = "oursocion@gmail.com";
    
    var subject = document.getElementById("subject").value ;
    //var category = document.getElementById("category").value;
    var feedbacktext = document.getElementById("feedback").value ;

    var categoryElement = document.getElementById("category");
    var category = categoryElement.options[categoryElement.selectedIndex].text;

    
    
    var url = "/Socion/resources/members/feedback";
    var xhttp = getXMLHttpRequestObject();
    
    var feedbackXML = "";

    feedbackXML = feedbackXML + "<feedback>";
    feedbackXML = feedbackXML + "<category>" + category + "</category>";
    feedbackXML = feedbackXML + "<subject>" + subject + "</subject>";
    feedbackXML = feedbackXML + "<feedbacktext>" + feedbacktext + "</feedbacktext>";
    feedbackXML = feedbackXML + "</feedback>"

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var responseCode = xhttp.responseText;

                if(responseCode == 0)
                {
                    document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! An email with your feedback sent to admin </b></font>" ;
                }
                else
                    document.getElementById("outputmessage").innerHTML = "<b> Error! Problem in sending feedback email to admin.<br/>" + Errortext + "</b>" ;

            }
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 500:
                        Errortext = "Internal server error!";
                        break;
                    case 404:
                        Errortext = "Feedback Not submitted! Member does not exist";
                        break;
                    default:
                        Errortext = "HTTP Error code: " + xhttp.status;
                }

                document.getElementById("outputmessage").innerHTML = "<b> Error! <br/>" + Errortext + "</b>" ;

            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;

        xhttp.open("POST",url,true);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");

        xhttp.setRequestHeader('Cookies', "En_tokenID= " + ";loggedUser=" + Loggeduser); 
        show_busy_icon();
        xhttp.send(feedbackXML);

    }
    else
        alert("Ajax functionality is not supported by your browser!");
    
}