
tokenID = getParameterfromURL("td");


function confirmRemoveComment()
{
    var agree = confirm("Are you sure you want to remove this comment?");
    return agree;
}

function showNewsinfoAndComments()
{
    articleid = getParameterfromURL("articleid");
    Loggeduser = getCookie('Loggeduser');
    var tokenIdentifier = getCookie('tId');
    
    news_Submitter_Username = "";

    var url = "/resources/articles/" + articleid;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
            var readnewsTitle = xmlDoc.getElementsByTagName("title");
            var readnewsUrl = xmlDoc.getElementsByTagName("url");
            var readnewsDesc = xmlDoc.getElementsByTagName("description");
            var readdateposted = xmlDoc.getElementsByTagName("datePosted");
            var readmembername = xmlDoc.getElementsByTagName("membername");
            var readname = xmlDoc.getElementsByTagName("postedBy");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            var readvotecount = xmlDoc.getElementsByTagName("votesCount");
            var readavgrating = xmlDoc.getElementsByTagName("averageRating");
            var readcommentscount = xmlDoc.getElementsByTagName("commentsCount");
            var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
            var readnewsImageUrl = xmlDoc.getElementsByTagName("imageurl");
            var readcategory = xmlDoc.getElementsByTagName("category");


            var News_Submitter = readname[0].firstChild.nodeValue;
            news_Submitter_Username = readmembername[0].firstChild.nodeValue;
            var News_title = readnewsTitle[0].firstChild.nodeValue;
            var News_url = readnewsUrl[0].firstChild.nodeValue;
            var News_description = readnewsDesc[0].firstChild.nodeValue;
            var News_date_posted = readdateposted[0].firstChild.nodeValue;
            var News_total_votes = readvotecount[0].firstChild.nodeValue;
            var StoryCommentsCount = readcommentscount[0].firstChild.nodeValue;
            var StorysharesCount = readsharescount[0].firstChild.nodeValue;
            var News_Avg_Rating = readavgrating[0].firstChild.nodeValue;
            //News_Avg_Rating = (parseFloat(News_Avg_Rating)).toFixed(1);
            News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";
            
            var News_Category = readcategory[0].childNodes[0].nodeValue;
            
            var News_Image_Url = readnewsImageUrl[0].childNodes[0].nodeValue;
            
            var localDate = getLocalDateTime(News_date_posted);
            
            var Member_Photo_Status = readphotouploadstatus[0].childNodes[0].nodeValue;

            var html = "";
            var photoColumn = "";
            var shareLink = "";
            var userSharedSrticles = getUserOutbox();


            News_title = retrieveNewsData(News_title);
            News_url = retrieveNewsData(News_url);
            News_description = retrieveNewsData(News_description);
            News_Image_Url = retrieveNewsData(News_Image_Url);
            
            
            if(trim(News_Image_Url) == "")
                News_Image_Url = getCategoryImage(News_Category);
               
                    
            document.getElementById("newsdetailsimage").src = News_Image_Url;
            document.getElementById("newsdetailsimagelink").href = "/Story/ReadArticle?aid=" + articleid;
            
            if(Member_Photo_Status == "true")
            {    
               photoColumn = "<td align=\"left\"> Posted By:"  + "<img id=\"newsposterimageid\" src=\"\" width=\"25\" height=\"25\" align=\"middle\"> " ;
            }
            else
               photoColumn = "<td align=\"left\"> Posted By:"  + "<img id=\"newsposterimageid\" src=\"../images/no_photo.jpg\" width=\"25\" height=\"25\" align=\"middle\"> " ;
           
            if(userSharedSrticles.indexOf(articleid) != -1)
                shareLink = "<SH>Shares(" + StorysharesCount + ")</SH>";
            else
                shareLink = "<SH><a href=\"#\" class=\"link\" onclick=\"shareStoryForReadNews('"+articleid+"',"+StorysharesCount+")\"> Share </SH>  </a>";

           
           if(trim(News_description) == "")
                News_description_Str = "";
           else
                News_description_Str = "<h6 style=\"background-color:#E4E7EB; text-align:justify; display:table-row; \">" + News_description + "</h6>" ;


            var Serial_number = 0 ;
            
            html = html + "<tr style=\"font-size:15px;height:10px\" align=\"center\">" + "<td colspan=\"7\"> <b> <a href=\"" + "/Story/ReadArticle?aid=" + articleid  + "\"target=\"_blank\" class=\"link\">" + News_title + "</a>" + "</td></tr>" + 
            
            "<tr align=\"center\"><td colspan=\"7\">" + News_description_Str + "</td></tr>" +

            "<tr style=\"font-size:10px;height:10px\" class=\"menulable\">" +
            photoColumn +
            "<a href=\"./Specific_User.html?username=" + news_Submitter_Username + "&td=" + tokenIdentifier +  "\" class=\"link\">" + "<b> " + News_Submitter + "</b></td>" +
            
            "<td align=\"center\"> Votes: <TV>" + News_total_votes + "</TV></td>" +
            "<td align=\"center\"> Avg Rating: <AvgRate>" + News_Avg_Rating + "</AvgRate></td>" +
            "<td align=\"center\">" +
                    
            "<img id=\"rating_0.5" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_1.0" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_1.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_2.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_2.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_3.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_3.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_4.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_4.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_5.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\">" + "</td>" +

            "<td align=\"center\"> Comments (" + StoryCommentsCount + ")" + "</td>" +
            "<td align=\"center\"> " + shareLink + "</td>" +
            "<td align=\"center\"> Date Posted: " + localDate + "</td></tr>" ;

            document.getElementById("newsdetailsTable").innerHTML = html ;
            
            getratingsForReadStory(tokenIdentifier, articleid);
           
            var reloadImageIdSrc = document.getElementById("newsposterimageid").src;

            if(reloadImageIdSrc.indexOf("no_photo.jpg") == -1)
            {
                var pngImageName = news_Submitter_Username.replace(/\./g,"dot")
                var profileImage = "../images/"  + pngImageName.toLowerCase() + ".png";
                reloadImg("newsposterimageid",profileImage) ;
                
            }

            showComments();
        }
    };

    if(xhttp != null)
    {

        xhttp.onreadystatechange = funct;
        xhttp.open("GET",url,true);

        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenIdentifier + ";loggedUser=" + Loggeduser); 
        xhttp.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");

}


function showComments()
{
    document.getElementById("comments").value = "Write Comment Here";
    
    var url = "/resources/comments/" + articleid;
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if (xhttp1.readyState==4 && xhttp1.status==200)
        {
            var xmlDoc = xhttp1.responseXML;

            var readcount = xmlDoc.getElementsByTagName("count");
            var readcommentId = xmlDoc.getElementsByTagName("commentId");
            var readcommentText = xmlDoc.getElementsByTagName("commentText");
            var readcommentBy = xmlDoc.getElementsByTagName("commentBy");
            var readfullname = xmlDoc.getElementsByTagName("fullname");
            var readdateposted = xmlDoc.getElementsByTagName("datePosted");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");

            var commentHtml = "";
            var commentHeader = "";
            var commentphotoColumn = "";

            for(var i=0; i < readcommentText.length;i++)
            {
                //var Serial_number = parseInt(i + 1);
                var News_comment_id = readcommentId[i].firstChild.nodeValue;
                var Comment_Text = readcommentText[i].firstChild.nodeValue;
                var comment_Submitter = readcommentBy[i].firstChild.nodeValue;
                var Comment_date = readdateposted[i].firstChild.nodeValue;
                
                var localDate = getLocalDateTime(Comment_date);
                var dateInTimeUnit = convertDateToTimeUnit(localDate);
                
                var Full_name = readfullname[i].firstChild.nodeValue;
                var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;

                if(Member_Photo_Status == "true")
                {    
                    commentphotoColumn = "<td style=\"font-size:11px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\"  src=\"\" width=\"50\" height=\"50\" align=\"middle\">" + "&nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + comment_Submitter + "&td=" + tokenID + "\" class=\"link\"> " + Full_name + "</b> </td>" ;
                }
                else
                    commentphotoColumn = "<td style=\"font-size:11px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"50\" height=\"50\" align=\"middle\">" + "&nbsp;&nbsp; <b> " + "<a href=\"./Specific_User.html?username=" + comment_Submitter + "&td=" + tokenID + "\" class=\"link\"> " + Full_name + "</b> </td>" ;

                commentHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \">" +
                            "<th nowrap=\"nowrap\">Commented By</th>" +
                            "<th nowrap=\"nowrap\">Comment</th>" +
                            "<th nowrap=\"nowrap\" colspan=\"2\">Comment Date</th>" +
                            "</tr>";

                commentHtml = commentHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">" + 
                commentphotoColumn +
                "<td style=\"font-size:11px;\" align=\"justify\">" + Comment_Text  + "</td> " +
                "<td style=\"font-size:11px;\" nowrap=\"nowrap\">" + dateInTimeUnit + "</td>" +
                "<td nowrap=\"nowrap\">" + "<img style=\"cursor:pointer;\" src=\"../images/close_button.jpg\" title=\"Delete Comment\" onclick=\"deleteComment(" + i + ")\">" + "</td>" + 
                "<td class=\"hidetablecolumn\">" + "<cID>" + "<input type=\"hidden\" name=\"hidden\" value=\"" + News_comment_id  +  "\"/>" + "</cID>"  + "</td>" +
                "<td class=\"hidetablecolumn\">" + "<CBY>" + "<input type=\"hidden\" name=\"hidden\" value=\"" + comment_Submitter  +  "\"/>" + "</CBY>"  + "</td></tr>" ;
            }

            document.getElementById("commentsTable").innerHTML = "<col width=\"22%\"><col width=\"50%\"><col width=\"25%\"><col width=\"3%\">" + commentHeader + commentHtml ;

            var commentsCount = readcount[0].firstChild.nodeValue;

            document.getElementById("commentcount").innerHTML = "Total Comments = " + commentsCount;
            
            for(var index=0; index<commentsCount; index++)
            {
                var CBY = document.getElementsByTagName("CBY");
                var commentposterName = CBY[index].firstChild.value;
                var reloadImageId =  "imageId" + index ;
                var reloadImageIdSrc = document.getElementById(reloadImageId).src;
                
                if(reloadImageIdSrc.indexOf("no_photo.jpg") == -1)
                {
                    var pngImageName = commentposterName.replace(/\./g,"dot")
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
 
 
 
function postComment()
{
    var commentText = document.getElementById("comments").value;

    if(trim(commentText) == "")
        return;

    var commentBy = Loggeduser;
    var currentDateTime = getCurrentDateTime();
    var commentXML = "";

    commentXML = commentXML + "<comment>";
    commentXML = commentXML + "<articleId>" + articleid + "</articleId>";
    commentXML = commentXML + "<commentBy>" + commentBy + "</commentBy>";
    commentXML = commentXML + "<commentText>" + commentText + "</commentText>";
    commentXML = commentXML + "<datePosted>" + currentDateTime + "</datePosted>";
    commentXML = commentXML + "</comment>"

    var url =  "/resources/comments/" ;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var responseid = xhttp.responseText;

                if(responseid == "0")
                {
                    document.getElementById("commentcount").innerHTML = "<font color=\"#347235\">" + "<b> Success! Comment Posted </b></font>" ;
                    showComments();
                }
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

                document.getElementById("commentcount").innerHTML = "<font color=\"#FF0000\">" + "<b> Error! comment NOT posted " + Errortext + "</b></font>" ;

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
        xhttp.send(commentXML);
        document.getElementById("comments").value ="Write Comment Here";
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}


function deleteComment(clicked_row)
{
    var articlePoster = news_Submitter_Username;
    
    var CBY = document.getElementsByTagName("CBY");
    var commentBy = CBY[clicked_row].firstChild.value;
    
    if((commentBy != Loggeduser) && (articlePoster != Loggeduser))
        return;
    
    if(!confirmRemoveComment())
        return;
    
    
    var cID = document.getElementsByTagName("cID");
    var commentId = cID[clicked_row].firstChild.value;
    
    var url =  "/resources/comments/" + "?commentId=" + commentId;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var responseid = xhttp.responseText;

                if(responseid == "0")
                {
                    document.getElementById("commentcount").innerHTML = "<font color=\"#347235\">" + "<b> Success! Comment Deleted </b></font>" ;
                    showComments();
                }
            }
            else
            {
                var Errortext = "";

                switch(xhttp.status)
                {
                    case 500:
                        Errortext = "Internal server error!";
                        break;
                    default:
                        Errortext = "HTTP Error code: " + xhttp.status;
                }

                document.getElementById("commentcount").innerHTML = "<font color=\"#FF0000\">" + "<b> Error! comment NOT deleted " + Errortext + "</b></font>" ;

            }

        }
    };

    
    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        
        xhttp.open("DELETE",url,true);
        
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}



