
tokenID = getParameterfromURL("td");


function IsEmpty()
{
    var name = document.getElementById("contactName").value ;
    var email = document.getElementById("contactEmail").value;
    var subject = document.getElementById("contactSubject").value;
    var message = document.getElementById("contactMessage").value;

    if (name == "")
    {
  
        document.getElementById("outputmessage").innerHTML = "<b> Error! Name field is empty." + "</b>" ;
        return false;
    }

    if (email == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Email field is empty." + "</b>" ;
        return false;
    }
    
    if(subject == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Subject field is empty." + "</b>" ;
        return false;
    }
    
    if(message == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Message field is empty." + "</b>" ;
        return false;
    }
    
    return true;
}



function sendContactMessage()
{
    if (IsEmpty()== false)
        return;
    
    //var Loggeduser = getCookie('Loggeduser');
    
    //if(Loggeduser == '')
        //Loggeduser = email;
    
    var name = document.getElementById("contactName").value ;
    var email = document.getElementById("contactEmail").value ;
    var subject = document.getElementById("contactSubject").value;
    var message = document.getElementById("contactMessage").value;
    
    
    var url = "/resources/members/contactus";
    var xhttp = getXMLHttpRequestObject();
    
    var contactMessageXML = "";

    contactMessageXML = contactMessageXML + "<contact>";
    contactMessageXML = contactMessageXML + "<name>" + name + "</name>";
    contactMessageXML = contactMessageXML + "<email>" + email + "</email>";
    contactMessageXML = contactMessageXML + "<subject>" + subject + "</subject>";
    contactMessageXML = contactMessageXML + "<message>" + message + "</message>";
    contactMessageXML = contactMessageXML + "</contact>"

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var responseCode = xhttp.responseText;

                if(responseCode == 0)
                {
                    document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! An email with your message sent to admin </b></font>" ;
                }
                else
                    document.getElementById("outputmessage").innerHTML = "<b> Error! Problem in sending contact message to admin.<br/>" + Errortext + "</b>" ;

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
                        Errortext = "Message Not submitted! Member does not exist";
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

        //xhttp.setRequestHeader('Cookies', "En_tokenID= " + ";loggedUser=" + Loggeduser); 
        show_busy_icon();
        xhttp.send(contactMessageXML);

    }
    else
        alert("Ajax functionality is not supported by your browser!");
    
}