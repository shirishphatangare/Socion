/* Function to create a new user, set default trusts and create outbox for the user */

function createFacebookUser(uid,userName,userEmail,accessToken)
{
    var ReqXML = "";
    var nameArray = userName.split(/\s+/);
    var encodedToken = make_basic_auth(accessToken);
    var Firstname = nameArray[0];
    var Lastname = nameArray[1];
    
    ReqXML = ReqXML + "<member>";
    ReqXML = ReqXML + "<uid>" + uid + "</uid>";
    ReqXML = ReqXML + "<firstname>" + Firstname + "</firstname>";
    ReqXML = ReqXML + "<lastname>" + Lastname + "</lastname>";
    ReqXML = ReqXML + "<memberEmail>" + userEmail + "</memberEmail>";
    ReqXML = ReqXML + "<accessToken>" + accessToken + "</accessToken>";
    ReqXML = ReqXML + "</member>";

    var url = "/resources/members/facebook";
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                if(xhttp.responseText == "0")
                {    
                    setCookie('Loggeduser',userEmail,1);
                    setCookie('tId',encodedToken,1);
                    setCookie('U_F',Firstname,1);
                    setCookie('M_P_S',"true",1);
                    setCookie('ifbc',"true",1);

                    setMenuAdFrameset(encodedToken, userEmail);
                }
            }
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 403:
                        Errortext = "User already exists!";
                        updatedFacebookToken(encodedToken, userEmail,Firstname);
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
                
            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;

        xhttp.open("POST",url,false);
        xhttp.setRequestHeader("Content-Type","application/xml;charset=UTF-8");
        xhttp.send(ReqXML);

    }
    else
        alert("Ajax functionality is not supported by your browser!");
}



function updatedFacebookToken(encodedToken, userEmail,Firstname)
{
    
    var url = "/resources/token/facebook/" + userEmail + "?accessToken=" + encodedToken;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                if(xhttp.responseText == "0")
                {    
                    setCookie('Loggeduser',userEmail,1);
                    setCookie('tId',encodedToken,1);
                    setCookie('U_F',Firstname,1);
                    setCookie('M_P_S',"true",1);
                    setCookie('ifbc',"true",1);

                    setMenuAdFrameset(encodedToken, userEmail);
                }
            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("PUT",url,false);
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");
    
}
