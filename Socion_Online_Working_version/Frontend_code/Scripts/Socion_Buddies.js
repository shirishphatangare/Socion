tokenID = getParameterfromURL("td");


function showFriendsList()
{
    showFollowersTo();
}


function showFollowersTo()
{
    document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    document.getElementById("Searchtext").value = "";
    document.getElementById("Searchtext").focus();
    
    var Loggeduser = getCookie('Loggeduser');

    var url = "/Socion/resources/members/friends/from";
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if ((xhttp.readyState==4) && (xhttp.status == 200))
        {
            var xmlDoc = xhttp.responseXML;
            
            var readcount = xmlDoc.getElementsByTagName("count");
            var readUserName = xmlDoc.getElementsByTagName("username");
            var readFullName = xmlDoc.getElementsByTagName("fullname");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");

            var friendHtml = "";
            var friendHeader = "";

            for(var i=0; i < readUserName.length;i++)
            {
                var photoColumn = "";
                var Friend_Username = readUserName[i].firstChild.nodeValue;
                var Friend_Fullname = readFullName[i].firstChild.nodeValue;
                var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;

                if(Member_Photo_Status == "true")
                    photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"\" width=\"75\" height=\"75\" align=\"middle\">" + " &nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + Friend_Username + "&td=" + tokenID + "\" class=\"link\"> " + Friend_Fullname + " </b> </td>" ;
                else
                    photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"75\" height=\"75\" align=\"middle\">" + " &nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + Friend_Username + "&td=" + tokenID + "\" class=\"link\"> " + Friend_Fullname + " </b> </td>" ;

                var postedColumn = "<td nowrap=\"nowrap\" class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + Friend_Username   + "\"/>" +  "</Posted>" + "</td></tr>" ;

                var removeFriendColumn = "<td  nowrap=\"nowrap\"> <outputmessage><input class=\"redbutton\" type=\"button\" value=\"Unfollow Buddy\" onclick=\" removeAsBuddy(" + i + ")\"> </outputmessage> </td>";

                friendHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \" >" +
                            "<th nowrap=\"nowrap\" colspan=\"2\" align=\"center\">People you are following</th>" +
                            "</tr>";

                friendHtml = friendHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">"  + photoColumn + removeFriendColumn + postedColumn;
            }

            friendHtml = friendHtml + "<tr style=\"height:50px;\" align=\"center\">  </tr>";

            document.getElementById("newslist").innerHTML = friendHeader + friendHtml ;


            var friendsCount = readcount[0].firstChild.nodeValue;

            document.getElementById("newsCount").innerHTML = "Total Count - <b>" + friendsCount + "</b>";
            document.getElementById("buddyLink").innerHTML = "<a href=\"#\" onclick=\"showFollowedBy();\" class=\"link\"> People following you </a>";

            
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



function showFollowedBy()
{
    document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    document.getElementById("Searchtext").value = "";
    document.getElementById("Searchtext").focus();
    
    var Loggeduser = getCookie('Loggeduser');
    
    var url =  "/Socion/resources/members/friends/from";
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if ((xhttp1.readyState==4) && (xhttp1.status == 200))
        {
            var xmlDoc = xhttp1.responseXML;

            var readcurrentFriendnames = xmlDoc.getElementsByTagName("username");

            url = "/Socion/resources/members/friends/to";
            var xhttp = getXMLHttpRequestObject();

            var funct = function ()
            {
                if ((xhttp.readyState==4) && (xhttp.status == 200))
                {
                    xmlDoc = xhttp.responseXML;

                    var readcount = xmlDoc.getElementsByTagName("count");
                    var readUserName = xmlDoc.getElementsByTagName("fromusername");
                    var readFullName = xmlDoc.getElementsByTagName("fromfullname");
                    var readphotouploadstatus = xmlDoc.getElementsByTagName("fromisMemberPhotoUploaded");

                    var friendHtml = "";
                    var friendHeader = "";

                    for(var i=0; i < readUserName.length;i++)
                    {
                        var photoColumn = "";
                        var Friend_Username = readUserName[i].firstChild.nodeValue;
                        var Friend_Fullname = readFullName[i].firstChild.nodeValue;
                        var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;

                        var addFriendColumn = "<td  nowrap=\"nowrap\"> <outputmessage><input class=\"greenbutton\" type=\"button\" value=\"Follow Buddy\" onclick=\" addAsBuddy(" + i +")\"> </outputmessage> </td>";

                        for(var j=0;j<readcurrentFriendnames.length;j++)
                        {
                            if(Friend_Username == readcurrentFriendnames[j].firstChild.nodeValue)
                            {
                                addFriendColumn = "<td nowrap=\"nowrap\"> <outputmessage><input class=\"redbutton\" type=\"button\" value=\"Unfollow Buddy\" onclick=\" removeAsBuddy(" + i + ")\"> </outputmessage> </td>";
                                break;
                            }

                        }

                        if(Member_Photo_Status == "true")
                            photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"\" width=\"75\" height=\"75\" align=\"middle\">" + " &nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + Friend_Username + "&td=" + tokenID + "\" class=\"link\"> " + Friend_Fullname + " </b> </td>" ;
                        else
                            photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"75\" height=\"75\" align=\"middle\">" + " &nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + Friend_Username + "&td=" + tokenID + "\" class=\"link\"> " + Friend_Fullname + " </b> </td>" ;

                        var postedColumn = "<td nowrap=\"nowrap\" class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + Friend_Username   + "\"/>" +  "</Posted>" + "</td></tr>" ;

                        friendHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \" >" +
                                    "<th nowrap=\"nowrap\" colspan=\"2\" align=\"center\">People following you</th>" +
                                    "</tr>";

                        friendHtml = friendHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">"  + photoColumn + addFriendColumn + postedColumn;
                    }

                    friendHtml = friendHtml + "<tr style=\"height:50px;\" align=\"center\">  </tr>";

                    document.getElementById("newslist").innerHTML = friendHeader + friendHtml ;


                    var friendsCount = readcount[0].firstChild.nodeValue;

                    document.getElementById("newsCount").innerHTML = "Total Count - <b>" + friendsCount + "</b>";
                    document.getElementById("buddyLink").innerHTML = "<a href=\"#\" onclick=\"showFollowersTo();\" class=\"link\"> People you are following</a>";

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



function searchFriends(Query)
{
    var searchQuery = trim(Query);
    
    if(searchQuery == "")
    {    
        showFriendsList();
        return;
    }
    document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    
    var Loggeduser = getCookie('Loggeduser');
    var url = "/Socion/resources/members/friends/from";
    
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if ((xhttp.readyState==4) && (xhttp.status == 200))
        {
            var xmlDoc = xhttp.responseXML;

            var readcurrentFriendnames = xmlDoc.getElementsByTagName("username");

            url = "/Socion/resources/members/search" + "?query=" + searchQuery;
            var xhttp1 = getXMLHttpRequestObject();

            var funct1 = function ()
            {
                if ((xhttp1.readyState==4) && (xhttp1.status == 200))
                {
                    xmlDoc = xhttp1.responseXML;

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

                        var addFriendColumn = "<td  nowrap=\"nowrap\"> <outputmessage><input class=\"greenbutton\" type=\"button\" value=\"Follow Buddy\" onclick=\" addAsBuddy(" + i +")\"> </outputmessage> </td>";

                        for(var j=0;j<readcurrentFriendnames.length;j++)
                        {
                            if(Friend_Username == readcurrentFriendnames[j].firstChild.nodeValue)
                            {
                                addFriendColumn = "<td nowrap=\"nowrap\"> <outputmessage><input class=\"redbutton\" type=\"button\" value=\"Unfollow Buddy\" onclick=\" removeAsBuddy(" + i + ")\"> </outputmessage> </td>";
                                break;
                            }

                        }

                        if(Member_Photo_Status == "true")
                            photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"\" width=\"75\" height=\"75\" align=\"middle\">" + "&nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + Friend_Username + "&td=" + tokenID + "\" class=\"link\"> " + Friend_Fullname + " </b> </td>" ;
                        else
                            photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"75\" height=\"75\" align=\"middle\">" + "&nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + Friend_Username + "&td=" + tokenID + "\" class=\"link\"> " + Friend_Fullname +  " </b> </td>" ;

                        var postedColumn = "<td nowrap=\"nowrap\" class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + Friend_Username   + "\"/>" +  "</Posted>" + "</td> </tr>" ;


                        friendHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \" >" +
                                    "<th nowrap=\"nowrap\" colspan=\"2\">Socion buddies search results</th>" +
                                    "</tr>";


                        friendHtml = friendHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">" +
                                     photoColumn + addFriendColumn + postedColumn + "</tr>";

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
            }


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




function addAsBuddy(j)
{
    var trustScore = 0.775;
    var Loggeduser = getCookie('Loggeduser');

    var posted = document.getElementsByTagName("Posted");
    var outputmessage = document.getElementsByTagName("outputmessage");

    var trustTo = posted[j].firstChild.value;
    
    var fromto = Loggeduser + " " + trustTo;

    var url = "/Socion/resources/trusts/" + fromto + "?trustScore=" + trustScore;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                outputmessage[j].innerHTML = "<font color=\"#347235\" size=\"2\">" + "<b>  Success! User added to Buddy List" + "</b></font>";
            }
            else
            {
                outputmessage[j].innerHTML = "<font color=\"#FF0000\" size=\"2\">" + "<b>  Error! User NOT added to Buddy List</b>";
            }
        }
    };


    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        
        xhttp.open("PUT",url,true);
        xhttp.setRequestHeader("Content-Type","application/xml;charset=UTF-8");

        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}

function confirmRemoveBuddy()
{
    var agree = confirm("Are you sure you want to remove buddy from your buddy list?");
    return agree;
}


function removeAsBuddy(j)
{
    if(!confirmRemoveBuddy())
        return;
    
    var trustScore = 0.325;
    var Loggeduser = getCookie('Loggeduser');

    var posted = document.getElementsByTagName("Posted");
    var outputmessage = document.getElementsByTagName("outputmessage");

    var trustTo = posted[j].firstChild.value;
    
    var fromto = Loggeduser + " " + trustTo;

    var url = "/Socion/resources/trusts/" + fromto + "?trustScore=" + trustScore;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                outputmessage[j].innerHTML = "<font color=\"#347235\" size=\"2\">" + "<b>  Success! User removed from Buddy List" + "</b></font>";
            }
            else
            {
                outputmessage[j].innerHTML = "<font color=\"#FF0000\" size=\"2\">" + "<b>  Error! User NOT removed from Buddy List</b>";
            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        
        xhttp.open("PUT",url,true);
        xhttp.setRequestHeader("Content-Type","application/xml;charset=UTF-8");

        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");
    
}
