
tokenID = getParameterfromURL("td");



function showMembers()
{
    document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    var Loggeduser = getCookie('Loggeduser');

    var url = "/resources/members/allmembernames";
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if ((xhttp.readyState==4) && (xhttp.status == 200))
        {
            var xmlDoc = xhttp.responseXML;

            var readcount = xmlDoc.getElementsByTagName("count");
            var readUserName = xmlDoc.getElementsByTagName("username");
            var readFullName = xmlDoc.getElementsByTagName("fullname");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isImageUploaded");

            var friendHtml = "";

            var friendHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \" >" +
            "<th nowrap=\"nowrap\">Socion Member Name</th>" +
            "</tr>";

            
            for(var i=0; i < readUserName.length;i++)
            {
                var photoColumn = "";
                var Friend_Username = readUserName[i].firstChild.nodeValue;
                
                var Friend_Fullname = readFullName[i].firstChild.nodeValue;
                
                var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;

                if(Member_Photo_Status == "true")
                    photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"\" width=\"75\" height=\"75\" align=\"middle\">" + "&nbsp;&nbsp;<b> " + Friend_Fullname + " </b> </td>" ;
                else
                    photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"75\" height=\"75\" align=\"middle\">" + "&nbsp;&nbsp;<b> " + Friend_Fullname + " </b> </td>" ;

                var postedColumn = "<td nowrap=\"nowrap\" class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + Friend_Username   + "\"/>" +  "</Posted>" + "</td></tr>" ;
    
                friendHtml = friendHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">"  + photoColumn + postedColumn;

            }

            friendHtml = friendHtml + "<tr style=\"height:50px;\" align=\"center\">  </tr>";

            document.getElementById("newslist").innerHTML =  friendHeader + friendHtml ;

            var friendsCount = readcount[0].firstChild.nodeValue;

            document.getElementById("newsCount").innerHTML = "Total Members - <b>" + friendsCount + "</b>";
            
            for(var index=0; index<friendsCount; index++)
            {
                var Posted = document.getElementsByTagName("Posted");
                var posterName = Posted[index].firstChild.value;
                var reloadImageId =  "imageId" + index ;
                var reloadImageIdSrc = document.getElementById(reloadImageId).src;
                
                if(reloadImageIdSrc.indexOf("no_photo.jpg") == -1)
                {
                    var pngImageName = posterName.replace(/\./g,"dot")
                    var profileImage = "../images/"  + pngImageName.toLowerCase() + ".png";
                    reloadImg(reloadImageId,profileImage) ;
                }
            }    

        }
    };


    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("GET",url,true);

        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");

}



function searchMembers(searchQuery)
{
    var Loggeduser = getCookie('Loggeduser');

    if(trim(searchQuery) == "")
        return;


    var url = "/resources/members/search" + "?query=" + searchQuery;
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if ((xhttp1.readyState==4) && (xhttp1.status == 200))
        {
            var xmlDoc = xhttp1.responseXML;

            var readcount = xmlDoc.getElementsByTagName("count");
            var readUserName = xmlDoc.getElementsByTagName("username");
            var readFullName = xmlDoc.getElementsByTagName("fullname");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isImageUploaded");

            var friendHtml = "";
            var friendHeader = "";

            for(var i=0; i < readUserName.length;i++)
            {
                var photoColumn = "";
                Serial_number = parseInt(i + 1);
                Friend_Username = readUserName[i].firstChild.nodeValue;
                Friend_Fullname = readFullName[i].firstChild.nodeValue;
                Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;


                if(Member_Photo_Status == "true")
                    photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"\" width=\"75\" height=\"75\" align=\"middle\">" + "<b> " + Friend_Fullname + " </b> </td>" ;
                else
                    photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"75\" height=\"75\" align=\"middle\">" + "<b> " + Friend_Fullname +  " </b> </td>" ;

                var postedColumn = "<td nowrap=\"nowrap\" class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + Friend_Username   + "\"/>" +  "</Posted>" + "</td></tr>" ;

                friendHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \" >" +
                            "<th nowrap=\"nowrap\">Socion Member Name</th>" +
                            "</tr>";


                friendHtml = friendHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">" +
                             photoColumn + postedColumn;

            }

            friendHtml = friendHtml + "<tr style=\"height:50px;\" align=\"center\">  </tr>";

            document.getElementById("newslist").innerHTML = friendHeader + friendHtml ;

            var friendsCount = readcount[0].firstChild.nodeValue;

            document.getElementById("newsCount").innerHTML = "Search Results = " + friendsCount;

            for(var index=0; index<friendsCount; index++)
            {
                var Posted = document.getElementsByTagName("Posted");
                var posterName = Posted[index].firstChild.value;
                var reloadImageId =  "imageId" + index ;
                var reloadImageIdSrc = document.getElementById(reloadImageId).src;
                
                if(reloadImageIdSrc.indexOf("no_photo.jpg") == -1)
                {
                    var pngImageName = posterName.replace(/\./g,"dot")
                    var profileImage = "../images/"  + pngImageName.toLowerCase() + ".png";
                    reloadImg(reloadImageId,profileImage) ;
                }
            }    
        }
    };


    if(xhttp1 != null)
    {
        xhttp1.onreadystatechange = funct1;
        xhttp1.open("GET",url,true);

        xhttp1.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp1.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");
}


function serverOperations()
{
    var operation = getParameterfromURL("op");
    var dbserverstatus = getCookie("dbServerStatus") ;

    if(dbserverstatus == 'ON')
        document.getElementById("serverstatus").style.color="#347235";
    else
        document.getElementById("serverstatus").style.color="#FF0000";

    document.getElementById("serverstatus").innerHTML = dbserverstatus;

    if(operation == 'start')
        serverStartOperation();
 
   if(operation == 'stop')
        serverStopOperation();

}



function serverStartOperation()
{
    var url = "/resources/server/start";
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if ((xhttp1.readyState==4) && (xhttp1.status == 200))
        {
            var response = xhttp1.responseText;

            if(response == "0")
            {
                setCookie('dbServerStatus','ON',1);
                document.getElementById("serverstatus").style.color="#347235";
                document.getElementById("serverstatus").innerHTML = getCookie("dbServerStatus") ;

            }
        }
        
    };


    if(xhttp1 != null)
    {
        xhttp1.onreadystatechange = funct1;
        xhttp1.open("GET",url,true);

        xhttp1.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");

}



function serverStopOperation()
{

    var Loggeduser = getCookie('Loggeduser');
    var url = "/resources/server/stop";
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if ((xhttp1.readyState==4) && (xhttp1.status == 200))
        {
            var response = xhttp1.responseText;

            if(response == "0")
            {
                setCookie('dbServerStatus','OFF',1);
                document.getElementById("serverstatus").style.color="#FF0000";
                document.getElementById("serverstatus").innerHTML = getCookie("dbServerStatus") ;
            }
        }
    };


    if(xhttp1 != null)
    {
        xhttp1.onreadystatechange = funct1;
        xhttp1.open("GET",url,true);

        xhttp1.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp1.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");

}



