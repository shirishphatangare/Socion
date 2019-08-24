function showNewsinfo()
{
    
    var articleid = getParameterfromURL("aid");
    Loggeduser = getCookie('Loggeduser');
    var tokenIdentifier = getCookie('tId');
    
    var url = "/resources/articles/" + articleid;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
            var readnewsTitle = xmlDoc.getElementsByTagName("title");
            //var readnewsUrl = xmlDoc.getElementsByTagName("url");
            var readnewsImageUrl = xmlDoc.getElementsByTagName("imageurl");
            var readdateposted = xmlDoc.getElementsByTagName("datePosted");
            var readnewsDesc = xmlDoc.getElementsByTagName("description");
            var readmembername = xmlDoc.getElementsByTagName("membername");
            var readname = xmlDoc.getElementsByTagName("postedBy");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            var readvotecount = xmlDoc.getElementsByTagName("votesCount");
            var readavgrating = xmlDoc.getElementsByTagName("averageRating");
            var readcommentscount = xmlDoc.getElementsByTagName("commentsCount");
            var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
            var readcategory = xmlDoc.getElementsByTagName("category");


            var News_Submitter = readname[0].firstChild.nodeValue;
            var news_Submitter_Username = readmembername[0].firstChild.nodeValue;
            //var News_description = readnewsDesc[0].firstChild.nodeValue;
            var News_title = readnewsTitle[0].firstChild.nodeValue;
            //var News_url = readnewsUrl[0].firstChild.nodeValue;
            var News_date_posted = readdateposted[0].firstChild.nodeValue;
            var News_total_votes = readvotecount[0].firstChild.nodeValue;
            var StoryCommentsCount = readcommentscount[0].firstChild.nodeValue;
            var StorysharesCount = readsharescount[0].firstChild.nodeValue;
            var News_Avg_Rating = readavgrating[0].firstChild.nodeValue;
            //News_Avg_Rating = (parseFloat(News_Avg_Rating)).toFixed(1);
            News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";
            
            var News_description = "" ;

            if(readnewsDesc[0].firstChild != null)
                News_description = readnewsDesc[0].firstChild.nodeValue;
            
            var News_Category = readcategory[0].childNodes[0].nodeValue;
            
            var News_Image_Url = readnewsImageUrl[0].childNodes[0].nodeValue;
            News_Image_Url = retrieveNewsData(News_Image_Url);
            News_title = retrieveNewsData(News_title);
            News_description = retrieveNewsData(News_description);

            
            postToFeed(articleid,News_title,News_Category,News_Image_Url,News_description);
            
            var localDate = getLocalDateTime(News_date_posted);
            var shareLink = "";
            var userSharedSrticles = getUserOutbox();
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

           
           if(userSharedSrticles.indexOf(articleid) != -1)
                shareLink = "<SH>Shares(" + StorysharesCount + ")</SH>";
            else
                shareLink = "<SH><a href=\"#\" class=\"link\" onclick=\"shareStoryForReadNews('"+articleid+"',"+StorysharesCount+")\"> Share </SH>  </a>";

            var Serial_number = 0 ;
            
            html = html + "<tr style=\"font-size:12px;height:10px\" align=\"center\">" + "<td colspan=\"7\"> <b> " + News_title +  "</td></tr>" + 
            
            "<tr align=\"center\" style=\"font-size:10px;\"><td colspan=\"7\">" + News_description_Str + "</td></tr>" +
            "<tr style=\"font-size:10px;height:9px\" class=\"menulable\">" +
            photoColumn +
            "<a href=\"../Html/Specific_User.html?username=" + news_Submitter_Username + "&td=" + tokenIdentifier +  "\" class=\"link\">" + "<b> " + News_Submitter + "</b></td>" +
            "<td align=\"center\"> Votes: <TV>" + News_total_votes + "</TV></td>" +
            "<td align=\"center\"> Avg Rating: <AvgRate>" + News_Avg_Rating + "</AvgRate></td>" +
            "<td align=\"center\">" +
                    
            "<img id=\"rating_0.5" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_1.0" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_1.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_2.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_2.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_3.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_3.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_4.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\"> \
            <img id=\"rating_4.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\" align=\"middle\"><img id=\"rating_5.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\" align=\"middle\">" + "</td>" +

            "<td align=\"center\"> " + "<a href=\"../Html/Comments.html?articleid=" + articleid + "&td=" + tokenIdentifier + "\" class=\"link\" > Comments (" + StoryCommentsCount + ")</a>" + "</td>" +
            "<td align=\"center\"> " + shareLink + "</td>" +
            "<td align=\"center\"> Date Posted: " + localDate + "</td></tr>" ;

            //document.getElementById("newsdetailsTable").innerHTML = html ;
            document.getElementById("newsdetailsTablewrapper").innerHTML = "<table border=\"0\" id=\"newsdetailsTable\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"> <tr><td>" + html + "</td></tr></table>";

            document.getElementById("closebutton").innerHTML = "<img style=\"margin-left:5px;margin-right:1px;\" src=\"../images/actual_link.jpg\" border=\"0\" title=\"Go to original link\">";

            
            getratingsForReadStory(tokenIdentifier, articleid);
           
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
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenIdentifier + ";loggedUser=" + Loggeduser); 
        xhttp.send();

    }
    else
        alert("Ajax functionality is not supported by your browser!");


    
}


function getratingsForReadStory(tokenIdentifier,articleid)
{
    var Loggeduser = getCookie('Loggeduser');
    var url = "/resources/ratings/" + Loggeduser ;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
            var responseratedto = xmlDoc.getElementsByTagName("ratedArticleId");
            var responseratedscore = xmlDoc.getElementsByTagName("ratedScore");
            
            var isArticleRated;

                isArticleRated = false;

                for (var i=0; i<responseratedto.length; i++)
                {
                    var ratedArticleId = responseratedto[i].childNodes[0].nodeValue; 
                    
                    if(ratedArticleId == articleid)
                    {
                        var ratedScore = (responseratedscore[i].childNodes[0].nodeValue / 2);
                        ratedScore = parseFloat(ratedScore.toFixed(1));
                        setStarRatingForReadNews(ratedScore,0);
                        isArticleRated = true;
                        break;
                    }
                }
                
                if(isArticleRated == false)
                    setAllStarMouseEventsForReadNews(0,articleid);
        }
    };
    

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;

        xhttp.open("GET",url,false);
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenIdentifier + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}


function setAllStarMouseEventsForReadNews(rowSerial,articleid)
{
    var subRatingId0_5,subRatingId1_5,subRatingId2_5,subRatingId3_5,subRatingId4_5,subRatingId1,subRatingId2,subRatingId3,subRatingId4,subRatingId5;

    subRatingId0_5 = "rating_0.5" + "_" + rowSerial;
    subRatingId1 = "rating_1.0" + "_" + rowSerial;
    subRatingId1_5 = "rating_1.5" + "_" + rowSerial;
    subRatingId2 = "rating_2.0" + "_" + rowSerial;
    subRatingId2_5 = "rating_2.5" + "_" + rowSerial;
    subRatingId3 = "rating_3.0" + "_" + rowSerial;
    subRatingId3_5 = "rating_3.5" + "_" + rowSerial;
    subRatingId4 = "rating_4.0" + "_" + rowSerial;
    subRatingId4_5 = "rating_4.5" + "_" + rowSerial;
    subRatingId5 = "rating_5.0" + "_" + rowSerial;
    
    
    var i0_5 = document.getElementById(subRatingId0_5);
    i0_5.setAttribute("onclick","postRatingsForReadNews(0.5," + rowSerial + ",\"" + articleid+ "\");");
    i0_5.setAttribute("onmouseout","changeStarOnmouseOut(0.5," + rowSerial + ");");
    i0_5.setAttribute("onmouseover","changeStarOnmouseOver(0.5," + rowSerial + ");");
    i0_5.setAttribute("style","cursor:pointer");
    
    var i1 = document.getElementById(subRatingId1);
    i1.setAttribute("onclick","postRatingsForReadNews(1," + rowSerial + ",\"" + articleid+ "\");");
    i1.setAttribute("onmouseout","changeStarOnmouseOut(1," + rowSerial + ");");
    i1.setAttribute("onmouseover","changeStarOnmouseOver(1," + rowSerial + ");");
    i1.setAttribute("style","cursor:pointer");
    
    var i1_5 = document.getElementById(subRatingId1_5);
    i1_5.setAttribute("onclick","postRatingsForReadNews(1.5," + rowSerial + ",\"" + articleid+ "\");");
    i1_5.setAttribute("onmouseout","changeStarOnmouseOut(1.5," + rowSerial + ");");
    i1_5.setAttribute("onmouseover","changeStarOnmouseOver(1.5," + rowSerial + ");");
    i1_5.setAttribute("style","cursor:pointer");
    
    var i2 = document.getElementById(subRatingId2);
    i2.setAttribute("onclick","postRatingsForReadNews(2," + rowSerial + ",\"" + articleid+ "\");");
    i2.setAttribute("onmouseout","changeStarOnmouseOut(2," + rowSerial + ");");
    i2.setAttribute("onmouseover","changeStarOnmouseOver(2," + rowSerial + ");");
    i2.setAttribute("style","cursor:pointer");
    
    var i2_5 = document.getElementById(subRatingId2_5);
    i2_5.setAttribute("onclick","postRatingsForReadNews(2.5," + rowSerial + ",\"" + articleid+ "\");");
    i2_5.setAttribute("onmouseout","changeStarOnmouseOut(2.5," + rowSerial + ");");
    i2_5.setAttribute("onmouseover","changeStarOnmouseOver(2.5," + rowSerial + ");");
    i2_5.setAttribute("style","cursor:pointer");
    
    var i3 = document.getElementById(subRatingId3);
    i3.setAttribute("onclick","postRatingsForReadNews(3," + rowSerial + ",\"" + articleid+ "\");");
    i3.setAttribute("onmouseout","changeStarOnmouseOut(3," + rowSerial + ");");
    i3.setAttribute("onmouseover","changeStarOnmouseOver(3," + rowSerial + ");");
    i3.setAttribute("style","cursor:pointer");
    
    var i3_5 = document.getElementById(subRatingId3_5);
    i3_5.setAttribute("onclick","postRatingsForReadNews(3.5," + rowSerial + ",\"" + articleid+ "\");");
    i3_5.setAttribute("onmouseout","changeStarOnmouseOut(3.5," + rowSerial + ");");
    i3_5.setAttribute("onmouseover","changeStarOnmouseOver(3.5," + rowSerial + ");");
    i3_5.setAttribute("style","cursor:pointer");
    
    var i4 = document.getElementById(subRatingId4);
    i4.setAttribute("onclick","postRatingsForReadNews(4," + rowSerial + ",\"" + articleid+ "\");");
    i4.setAttribute("onmouseout","changeStarOnmouseOut(4," + rowSerial + ");");
    i4.setAttribute("onmouseover","changeStarOnmouseOver(4," + rowSerial + ");");
    i4.setAttribute("style","cursor:pointer");
    
    var i4_5 = document.getElementById(subRatingId4_5);
    i4_5.setAttribute("onclick","postRatingsForReadNews(4.5," + rowSerial + ",\"" + articleid+ "\");");
    i4_5.setAttribute("onmouseout","changeStarOnmouseOut(4.5," + rowSerial + ");");
    i4_5.setAttribute("onmouseover","changeStarOnmouseOver(4.5," + rowSerial + ");");
    i4_5.setAttribute("style","cursor:pointer");
    
    var i5 = document.getElementById(subRatingId5);
    i5.setAttribute("onclick","postRatingsForReadNews(5," + rowSerial + ",\"" + articleid+ "\");");
    i5.setAttribute("onmouseout","changeStarOnmouseOut(5," + rowSerial + ");");
    i5.setAttribute("onmouseover","changeStarOnmouseOver(5," + rowSerial + ");");
    i5.setAttribute("style","cursor:pointer");        
}



function resetAllStarOnmouseEventsForReadNews(rowSerial)
{
    var subRatingId0_5,subRatingId1_5,subRatingId2_5,subRatingId3_5,subRatingId4_5,subRatingId1,subRatingId2,subRatingId3,subRatingId4,subRatingId5;

    subRatingId0_5 = "rating_0.5" + "_" + rowSerial;
    subRatingId1 = "rating_1.0" + "_" + rowSerial;
    subRatingId1_5 = "rating_1.5" + "_" + rowSerial;
    subRatingId2 = "rating_2.0" + "_" + rowSerial;
    subRatingId2_5 = "rating_2.5" + "_" + rowSerial;
    subRatingId3 = "rating_3.0" + "_" + rowSerial;
    subRatingId3_5 = "rating_3.5" + "_" + rowSerial;
    subRatingId4 = "rating_4.0" + "_" + rowSerial;
    subRatingId4_5 = "rating_4.5" + "_" + rowSerial;
    subRatingId5 = "rating_5.0" + "_" + rowSerial;
    
    
    var i0_5 = document.getElementById(subRatingId0_5);
    i0_5.setAttribute("onclick","");
    i0_5.setAttribute("onmouseout","");
    i0_5.setAttribute("onmouseover","");
    i0_5.setAttribute("style","cursor:default");
    
    var i1 = document.getElementById(subRatingId1);
    i1.setAttribute("onclick","");
    i1.setAttribute("onmouseout","");
    i1.setAttribute("onmouseover","");
    i1.setAttribute("style","cursor:default");
    
    var i1_5 = document.getElementById(subRatingId1_5);
    i1_5.setAttribute("onclick","");
    i1_5.setAttribute("onmouseout","");
    i1_5.setAttribute("onmouseover","");
    i1_5.setAttribute("style","cursor:default");
    
    var i2 = document.getElementById(subRatingId2);
    i2.setAttribute("onclick","");
    i2.setAttribute("onmouseout","");
    i2.setAttribute("onmouseover","");
    i2.setAttribute("style","cursor:default");
    
    var i2_5 = document.getElementById(subRatingId2_5);
    i2_5.setAttribute("onclick","");
    i2_5.setAttribute("onmouseout","");
    i2_5.setAttribute("onmouseover","");
    i2_5.setAttribute("style","cursor:default");
    
    var i3 = document.getElementById(subRatingId3);
    i3.setAttribute("onclick","");
    i3.setAttribute("onmouseout","");
    i3.setAttribute("onmouseover","");
    i3.setAttribute("style","cursor:default");
    
    var i3_5 = document.getElementById(subRatingId3_5);
    i3_5.setAttribute("onclick","");
    i3_5.setAttribute("onmouseout","");
    i3_5.setAttribute("onmouseover","");
    i3_5.setAttribute("style","cursor:default");
    
    var i4 = document.getElementById(subRatingId4);
    i4.setAttribute("onclick","");
    i4.setAttribute("onmouseout","");
    i4.setAttribute("onmouseover","");
    i4.setAttribute("style","cursor:default");
    
    var i4_5 = document.getElementById(subRatingId4_5);
    i4_5.setAttribute("onclick","");
    i4_5.setAttribute("onmouseout","");
    i4_5.setAttribute("onmouseover","");
    i4_5.setAttribute("style","cursor:default");
    
    var i5 = document.getElementById(subRatingId5);
    i5.setAttribute("onclick","");
    i5.setAttribute("onmouseout","");
    i5.setAttribute("onmouseover","");
    i5.setAttribute("style","cursor:default");
}



function setStarRatingForReadNews(starId,rowSerial)
{
    var subRatingId0_5,subRatingId1_5,subRatingId2_5,subRatingId3_5,subRatingId4_5,subRatingId1,subRatingId2,subRatingId3,subRatingId4,subRatingId5;
    
    switch(starId)
    {
                
        case 5.0:
        {
            subRatingId5 = "rating_5.0" + "_" + rowSerial;
            document.getElementById(subRatingId5).src="../images/rating_on_right.gif";
            
        }    
        case 4.5:
        {
            subRatingId4_5 = "rating_4.5" + "_" + rowSerial;
            document.getElementById(subRatingId4_5).src="../images/rating_on_left.gif";
            
        }
        case 4.0:
        {
            subRatingId4 = "rating_4.0" + "_" + rowSerial;
            document.getElementById(subRatingId4).src="../images/rating_on_right.gif";
            
        }
        case 3.5:
        {
            subRatingId3_5 = "rating_3.5" + "_" + rowSerial;
            document.getElementById(subRatingId3_5).src="../images/rating_on_left.gif";
            
        }
        case 3.0:
        {
            subRatingId3 = "rating_3.0" + "_" + rowSerial;
            document.getElementById(subRatingId3).src="../images/rating_on_right.gif";
        }
        case 2.5:
        {
            subRatingId2_5 = "rating_2.5" + "_" + rowSerial;
            document.getElementById(subRatingId2_5).src="../images/rating_on_left.gif";
            
        }
        case 2.0:
        {
            subRatingId2 = "rating_2.0" + "_" + rowSerial;
            document.getElementById(subRatingId2).src="../images/rating_on_right.gif";
            
        }
        case 1.5:
        {
            subRatingId1_5 = "rating_1.5" + "_" + rowSerial;
            document.getElementById(subRatingId1_5).src="../images/rating_on_left.gif";
            
        }
        case 1.0:
        {
            subRatingId1 = "rating_1.0" + "_" + rowSerial;
            document.getElementById(subRatingId1).src="../images/rating_on_right.gif";
            
        }
        case 0.5:
        {
            subRatingId0_5 = "rating_0.5" + "_" + rowSerial;
            document.getElementById(subRatingId0_5).src="../images/rating_on_left.gif";
            
        }
        
    }
    
}


function postRatingsForReadNews(starScore,j,articleId)
{
    var Loggeduser = getCookie('Loggeduser');
    var tokenIdentifier = getCookie('tId');

    setStarRatingForReadNews(starScore,j);
    resetAllStarOnmouseEventsForReadNews(j);
    
    var ratedto = articleId;
    var ratedscore = starScore * 2;
    ratedscore = ratedscore.toFixed(1);

    var ReqXML = "";

    ReqXML = ReqXML + "<rating>";
    ReqXML = ReqXML + "<ratedArticleId>" + ratedto + "</ratedArticleId>";
    ReqXML = ReqXML + "<ratedByMember>" + Loggeduser + "</ratedByMember>";
    ReqXML = ReqXML + "<ratedScore>" + ratedscore + "</ratedScore>";
    ReqXML = ReqXML + "</rating>";

    var url = "/resources/ratings";
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var tv = document.getElementsByTagName("TV");
                var currentTotalvotes = tv[j].firstChild.nodeValue ;
                
                var avgRate = document.getElementsByTagName("AvgRate");
                var currentAvgRating = avgRate[j].firstChild.nodeValue ;

                var newtotalvotes = parseInt(currentTotalvotes) + 1;
                tv[j].innerHTML =   newtotalvotes;
                
                var newAvgRating = ((parseFloat(currentAvgRating) * parseInt(currentTotalvotes))+ parseFloat(ratedscore)) / parseInt(newtotalvotes);
                avgRate[j].innerHTML =   newAvgRating.toFixed(1);
            }
        }
    };
    

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("POST",url,false);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenIdentifier + ";loggedUser=" + Loggeduser); 
        xhttp.send(ReqXML);
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}


function shareStoryForReadNews(articleId,StorysharesCount)
{
    updateOutboxforLoggeduser(articleId);
    
    StorysharesCount = StorysharesCount + 1;
    SH = document.getElementsByTagName("SH");
    SH[0].innerHTML = "Shares(" + StorysharesCount + ")";

}

