

function forgotPassword()
{
    var userIdentity = document.getElementById("userIdentity").value ;
    
    userIdentity = trim(userIdentity);
    
    if(userIdentity == "")
        return;

    var url = "/Socion/resources/members/email/" + userIdentity;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 )
        {
            if(xhttp.status == 200)
            {
                var responseCode = xhttp.responseText;

                if(responseCode == 0)
                {
                    document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! Email with Password sent to your registered email id </b></font>" ;
                }
                else
                    document.getElementById("outputmessage").innerHTML = "<b> Error! Problem in sending email to your registered email id. Please try again later<br/>" + Errortext + "</b>" ;

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
                        Errortext = "Member Not registered! Please check provided username or Email id and try again";
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

        xhttp.open("GET",url,true);
        show_busy_icon();       
        xhttp.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");

}