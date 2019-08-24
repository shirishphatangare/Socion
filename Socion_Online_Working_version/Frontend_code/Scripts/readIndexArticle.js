function showNewsinfo()
{
    var articleid = getParameterfromURL("aid");
    
    var url = "/Socion/resources/articles/" + articleid;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
            //alert(xhttp.responseText);
            
            var readnewsTitle = xmlDoc.getElementsByTagName("title");
            var readdateposted = xmlDoc.getElementsByTagName("datePosted");
            var readnewsDesc = xmlDoc.getElementsByTagName("description");
            var readmembername = xmlDoc.getElementsByTagName("membername");
            var readname = xmlDoc.getElementsByTagName("postedBy");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            var readvotecount = xmlDoc.getElementsByTagName("votesCount");
            var readavgrating = xmlDoc.getElementsByTagName("averageRating");
            var readcommentscount = xmlDoc.getElementsByTagName("commentsCount");


            var News_Submitter = readname[0].firstChild.nodeValue;
            var news_Submitter_Username = readmembername[0].firstChild.nodeValue;
            var News_title = readnewsTitle[0].firstChild.nodeValue;
            //var News_description = readnewsDesc[0].firstChild.nodeValue;
            var News_date_posted = readdateposted[0].firstChild.nodeValue;
            var News_total_votes = readvotecount[0].firstChild.nodeValue;
            var StoryCommentsCount = readcommentscount[0].firstChild.nodeValue;
            var News_Avg_Rating = readavgrating[0].firstChild.nodeValue;
            News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";
            
            var News_description = "" ;

            if(readnewsDesc[0].firstChild != null)
                News_description = readnewsDesc[0].firstChild.nodeValue;
            
            
            var localDate = getLocalDateTime(News_date_posted);
            var shareLink = "";
            var Member_Photo_Status = readphotouploadstatus[0].childNodes[0].nodeValue;

            var html = "";
            var photoColumn = "";

            if(News_title != null)
                    News_title = retrieveNewsData(News_title);
                    
            if(News_description != null)
                    News_description = retrieveNewsData(News_description);
            
            if(Member_Photo_Status == "true")
            {    
               photoColumn = "<td align=\"center\">"  + "<img id=\"newsposterimageid\" src=\"\" width=\"25\" height=\"25\" align=\"middle\"> " ;
            }
            else
               photoColumn = "<td align=\"center\">"  + "<img id=\"newsposterimageid\" src=\"../images/no_photo.jpg\" width=\"25\" height=\"25\" align=\"middle\"> " ;
           
            if(trim(News_description) == "")
                News_description_Str = "";
            else
                News_description_Str = "<div style=\"background-color:#E4E7EB; text-align:justify; display:table-row; \">" + News_description + "</div>" ;

            shareLink = "<SH><a href=\"../Html/Join_Socion.html\" class=\"link\"> Share </SH>  </a>";

            var Serial_number = 0 ;
            
            html = html + "<tr style=\"font-size:12px;\" align=\"center\">" + "<td colspan=\"7\"> <b> " + News_title +  "</td></tr>" + 
            
            "<tr align=\"center\"><td colspan=\"7\" style=\"font-size:10px;\">" + News_description_Str + "</td></tr>" +
            "<tr align=\"center\" style=\"font-size:9px;\" class=\"menulable\">" +
            photoColumn +
            "<a href=\"../Html/index.html?username=" + news_Submitter_Username + "&fullname=" + News_Submitter +  "\" class=\"link\">" + "<b> " + News_Submitter + "</b></td>" +
            "<td align=\"center\"> Votes: <TV>" + News_total_votes + "</TV></td>" +
            "<td align=\"center\"> Avg Rating: <AvgRate>" + News_Avg_Rating + "</AvgRate></td>" +
            "<td align=\"center\">" +
                    
            "<img id=\"rating_0.5" + "_" + Serial_number + "\"style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(0.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(0.5," + Serial_number + ");\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_1.0" + "_" + Serial_number + "\"style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(1," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(1," + Serial_number + ");\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
            <img id=\"rating_1.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(1.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(1.5," + Serial_number + ");\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_2.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(2," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(2," + Serial_number + ");\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
            <img id=\"rating_2.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(2.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(2.5," + Serial_number + ");\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_3.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(3," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(3," + Serial_number + ");\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
            <img id=\"rating_3.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(3.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(3.5," + Serial_number + ");\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_4.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(4," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(4," + Serial_number + ");\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
            <img id=\"rating_4.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(4.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(4.5," + Serial_number + ");\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_5.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px;\"  onclick=\"document.location = '../Html/Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(5," + Serial_number + ");\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\">" + "</td>" +


            "<td align=\"center\"> " + "<a href=\"../Html/Join_Socion.html"  + "\" class=\"link\" > Comments (" + StoryCommentsCount + ")</a>" + "</td>" +
            "<td align=\"center\"> " + shareLink + "</td>" +
            "<td align=\"center\"> Date Posted: " + localDate + "</td></tr>" ;

            document.getElementById("newsdetailsTablewrapper").innerHTML = "<table border=\"0\" id=\"newsdetailsTable\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"> <tr><td>" + html + "</td></tr></table>";
            
            
            document.getElementById("closebutton").innerHTML = "<img style=\"margin-left:5px;margin-right:1px;\" src=\"../images/actual_link.jpg\" border=\"0\" title=\"Go to original link\">";
            
            var reloadImageIdSrc = document.getElementById("newsposterimageid").src;

            if(reloadImageIdSrc.indexOf("no_photo.jpg") == -1)
            {
                var pngImageName = news_Submitter_Username.replace(/\./g,"dot")
                var profileImage = "../images/"  + pngImageName.toLowerCase() + ".png";
                reloadImg("newsposterimageid",profileImage) ;
            }

        }
    };

    if(xhttp != null)
    {

        xhttp.onreadystatechange = funct;
        xhttp.open("GET",url,false);
        xhttp.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");
}
