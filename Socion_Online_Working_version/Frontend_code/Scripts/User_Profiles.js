
tokenID = getParameterfromURL("td");

function confirmPassword()
{

    var new_password1 = document.getElementById("Newpasswd").value ;
    var new_password2 = document.getElementById("Confpasswd").value ;

    if (new_password1 == new_password2)
        return true;
    else
    {
        document.getElementById("outputmessage").innerHTML ="<b> Error! Your password is not changed because "  +
        "the verification does not match two passwords. " + "</b>" ;

        return false;
    }
}



function IsEmpty()
{
    var user = document.getElementById("username").value;
    var cur_pass = document.getElementById("Curpasswd").value;
    var new_pass = document.getElementById("Newpasswd").value;
    var conf_new_pass = document.getElementById("Confpasswd").value;

    if (user == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Username is empty. </b>" ;
        return false;
    }

    if (cur_pass == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Current Password is empty. </b>" ;
        return false;
    }

    if (new_pass == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! New Password is empty. </b>" ;
        return false;
    }

    if (conf_new_pass == "")
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Confirm New Password is empty. </b>" ;
        return false;
    }

    return true;
}



function PasswordContainwhite()
{
    var new_pass = document.getElementById("Newpasswd").value;

    var Regexpr = /\s+/;

    if(Regexpr.test(new_pass))
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! New Password contains white spaces. </b>" ;
        return false;
    }

    return true;
}




function PasswordLowerLimits()
{
    var new_pass = document.getElementById("Newpasswd").value;

    if(new_pass.length < 8)
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! New Password is less then 8 chars long. </b>" ;
        return false;
    }

    return true;
}




function changePassword()
{
    if ((IsEmpty()== false) || (PasswordContainwhite() == false) || (PasswordLowerLimits() == false)|| (confirmPassword() == false))
        return;

    var username = document.getElementById("username").value ;
    var Loggeduser = getCookie('Loggeduser');
    
    var cur_password = document.getElementById("Curpasswd").value ;
    var encodedCur_Password = make_basic_auth(cur_password);
    
    var new_password = document.getElementById("Confpasswd").value ;
    var encodedNew_Password = make_basic_auth(new_password);

    var passwordQuery = encodedCur_Password + " " + encodedNew_Password;
    
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if(xhttp.readyState == 4)
        {
            if(xhttp.status == 200)
                document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b>Success! Password changed" + "</b></font>" ;
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 404:
                        Errortext = "Access denied! Please ensure username and password are correct";
                        break;
                    case 500:
                        Errortext = "Internal server error!";
                        break;
                    case 400:
                        Errortext = "Invalid input XML!";
                        break;
                    default:
                        Errortext = "HTTP Error code: " + xhttp.status;
                }

                document.getElementById("outputmessage").innerHTML = "<b> Error! Password Not changed"+ "<br/>" +  Errortext +  "</b>" ;
            }
        }

    };
    
    var url = "/Socion/resources/members/" + username + "?passwordQuery=" + passwordQuery;


    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("PUT",url,true);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");
}




function changeConfig()
{
    var ReqXML = "";
    
    var Loggeduser = getCookie('Loggeduser');
    var coeff = document.getElementById("coeff").value;
    var inboxCategoryList = getStoryCategoryOptions();
    var inbox = document.getElementById("inbox").value;
    var txtdate = document.getElementById("lastdays").value;


    ReqXML = ReqXML + "<member>";
    ReqXML = ReqXML + "<ageCoefficient>" + coeff + "</ageCoefficient>";
    ReqXML = ReqXML + "<inboxCategoryList>" + inboxCategoryList + "</inboxCategoryList>";
    ReqXML = ReqXML + "<inboxCount>" + inbox + "</inboxCount>";
    ReqXML = ReqXML + "<daysCount>" + txtdate + "</daysCount>";
    ReqXML = ReqXML + "</member>";


    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if(xhttp.readyState == 4)
        {
            if(xhttp.status == 200)
                document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b>Success! Configuration changed" + "</b></font>" ;
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

                document.getElementById("outputmessage").innerHTML = "<b> Error! Configuration Not changed"+ "<br/>" +  Errortext +  "</b>" ;
            }
        }

    };
    
    var URI = "/Socion/resources/members/config";

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("PUT",URI,true);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send(ReqXML);
    }

}
