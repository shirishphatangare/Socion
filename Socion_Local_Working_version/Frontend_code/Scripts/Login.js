

function IsEmpty()
{
    
    var user = document.getElementById("Loggeduser").value;
    var pass = document.getElementById("Loggedpasswd").value;

    if (user == "")
    {

        document.getElementById("outputmessage").innerHTML = "<b> Error! Username is empty." + "</b>" ;
        return false;
    }


    if (pass == "")
    {

        document.getElementById("outputmessage").innerHTML = "<b> Error! Password is empty." + "</b>" ;
        return false;
    }

    return true;
}




function chkcredentials()
{
    if (IsEmpty()== false)
        return;

    var username = document.getElementById("Loggeduser").value ;
    var password = document.getElementById("Loggedpasswd").value ;

    var url = "/resources/token";
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var En_tokenID = xhttp.responseText;

                var Loggeduser = username;
                
                if(Loggeduser == "oursocion@gmail.com")
                    setCookie('dbServerStatus','ON',1);

                setCookie('Loggeduser',Loggeduser,1);
                setCookie('tId',En_tokenID,1);
                setCookie('readnews',"false",1);
                setCookie('ifbc',"false",1);
                
                getWelcomeMessageParameters(En_tokenID, Loggeduser);
                setMenuAdFrameset(En_tokenID, Loggeduser);
                
            }
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 401:
                        Errortext = "Please ensure username and password are correct";
                        break;
                    case 500:
                        Errortext = "Internal server error!";
                        break;
                    default:
                        Errortext = "HTTP Error code: " + xhttp.status;
                }

                document.getElementById("outputmessage").innerHTML = "<b> Login Failed ! <br/>" + Errortext + "</b>" ;

            }
        }
            
    };

    var tmp1 = hex_hmac_md5(username, make_basic_auth(password));
    var auth = username + ":" + tmp1;
    
    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("GET",url,true);
        xhttp.setRequestHeader('Authorization', auth);
        show_busy_icon();   
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}