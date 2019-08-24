
tokenID = getParameterfromURL("td");

function Browse_news()
{
    document.getElementById("newslist").innerHTML = "";
    document.getElementById("newsbanner").innerHTML = "";
    document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    
    var pageNumber = document.getElementById('pageNumber').value;
    
    var Loggeduser = getCookie('Loggeduser');
    var Username = Loggeduser;
    var category = getParameterfromURL("ct");

    var url = "/Socion/resources/articles/bootstrap" + "?userName=" + Username + "&ct=" + category + "&page=" + pageNumber;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
            //alert(xhttp.responseText);
            
            var readpagecount = xmlDoc.getElementsByTagName("pagecount");
            var pageCount = readpagecount[0].childNodes[0].nodeValue;
            pageCount = Math.ceil(pageCount);

            
            var readarticleID = xmlDoc.getElementsByTagName("articleId");
            var readnewsTitle = xmlDoc.getElementsByTagName("title");
            var readnewsDesc = xmlDoc.getElementsByTagName("description");
            var readnewsUrl = xmlDoc.getElementsByTagName("url");
            var readnewsImageUrl = xmlDoc.getElementsByTagName("imageurl");
            var readnewsSubmitter = xmlDoc.getElementsByTagName("membername");
            var readnewsSubmitter_name = xmlDoc.getElementsByTagName("postedBy");
            var readdateposted = xmlDoc.getElementsByTagName("datePosted");
            var readvotecount = xmlDoc.getElementsByTagName("votesCount");
            var readavgrating = xmlDoc.getElementsByTagName("averageRating");
            var readcommentscount = xmlDoc.getElementsByTagName("commentsCount");
            var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
            var readcategory = xmlDoc.getElementsByTagName("category");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            

            if(readarticleID.length > 0)
            {
                var tabHtml = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                var shareLink = "";
                var html =  "";
                var Serial_number = 0;
                var userSharedSrticles = getUserOutbox();
                var displayHeaderFlag = false;
                var headerDisplayedFlag = false;

                var browseRowCounter = 0;

                for (var i=0; i < readnewsTitle.length; i++)
                {
                    var News_date_posted = readdateposted[i].childNodes[0].nodeValue;
                    var localDate = getLocalDateTime(News_date_posted);
                    var dateInTimeUnit = convertDateToTimeUnit(localDate);
                    var News_url = readnewsUrl[i].childNodes[0].nodeValue;
                    var News_Image_Url = readnewsImageUrl[i].childNodes[0].nodeValue;

                    displayHeaderFlag = true;

                    if((displayHeaderFlag == true) && (headerDisplayedFlag == false))
                    {    
                        html = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF;\">" +
                        "<th nowrap=\"nowrap\">Type</th>" +
                        "<th nowrap=\"nowrap\" colspan=\"2\">Story</th>" +
                        "<th nowrap=\"nowrap\">Avg Rating</th>" +
                        "<th nowrap=\"nowrap\">Rating</th>" +
                        "<th nowrap=\"nowrap\">Posted By</th>" +
                        "<th nowrap=\"nowrap\">Date Posted</th>" +
                        "</tr>";

                        headerDisplayedFlag = true;
                    }

                    var photoColumn = "";
                    Serial_number = browseRowCounter++ ;
                    var News_title = readnewsTitle[i].childNodes[0].nodeValue;
                    var News_description = readnewsDesc[i].childNodes[0].nodeValue;

                    News_title = retrieveNewsData(News_title);
                    News_url = retrieveNewsData(News_url);
                    News_description = retrieveNewsData(News_description);
                    News_Image_Url = retrieveNewsData(News_Image_Url);

                    var News_Submitter_name = readnewsSubmitter_name[i].childNodes[0].nodeValue;
                    var News_Submitter = "<a href=\"./Specific_User.html?username=" + readnewsSubmitter[i].childNodes[0].nodeValue + "&td=" + tokenID + "\" class=\"link\">" +  News_Submitter_name + " </a>";
                    var News_total_votes = readvotecount[i].childNodes[0].nodeValue;
                    var StoryCommentsCount = readcommentscount[i].childNodes[0].nodeValue;
                    var StorysharesCount = readsharescount[i].childNodes[0].nodeValue;
                    var News_article_id =  readarticleID[i].childNodes[0].nodeValue;
                    var News_Category = readcategory[i].childNodes[0].nodeValue;
                    var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;
                    var News_Avg_Rating = readavgrating[i].childNodes[0].nodeValue;
                    //News_Avg_Rating = (parseFloat(News_Avg_Rating)).toFixed(1);
                    News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";

                    if(userSharedSrticles.indexOf(News_article_id) != -1)
                        shareLink = tabHtml + "<SH><small>Shares(" + StorysharesCount + ")</small></SH>";
                    else
                        shareLink = tabHtml + "<SH><a href=\"#\" class=\"link\" onclick=\"shareStory("+Serial_number+","+StorysharesCount+")\"> <small>Share</small> </SH>  </a>";


                    if(Member_Photo_Status == "true")
                    {    
                        photoColumn = "<td style=\"font-size:10px;\" align=\"left\" nowrap=\"nowrap\">"  + "<img id=\"imageId"+Serial_number + "\" src=\"\" width=\"50\" height=\"50\" align=\"middle\">" + "&nbsp;&nbsp; <b>"  + News_Submitter + "</b></td>";
                    }
                    else
                        photoColumn = "<td style=\"font-size:10px;\" align=\"left\" nowrap=\"nowrap\">"  + "<img id=\"imageId"+Serial_number + "\" src=\"../images/no_photo.jpg\" width=\"50\" height=\"50\" align=\"middle\">" + "&nbsp;&nbsp; <b>"  + News_Submitter + "</b></td>";

                    if(trim(News_description) == "")
                        News_description_Str = "";
                    else
                        News_description_Str = "<h5 style=\"background-color:#E4E7EB; text-align:justify; display:table-row; \">" + News_description + "</h5>" ;

                    if(trim(News_Image_Url) == "")
                        News_Image_Url_Str = "<td width=\"50px\"> </td>";
                    else
                        News_Image_Url_Str = "<td width=\"50px\">" + "<img src=\"" + News_Image_Url + "\" width=\"50\" height=\"50\" align=\"center\"> </td>";



                    html = html + "<tr style=\"background-color:#FFF8C6; height:50px\" align=\"center\">" +
                    getCategoryColumn(News_Category) + "</td>" +
                    "<td style=\"font-size:12px;\" align=\"left\"> <b> <a href=\"" + "/Socion/Story/ReadArticle?aid=" + News_article_id  +  "\" class=\"link\"  target=\"_blank\">" + News_title + "</a>" + "</b><br/>" + "<font size=\"1\" color=\"green\">" + News_url.substring(0,100) + "<br/></font>" + News_description_Str +
                    "<small> Votes (<TV>"  + News_total_votes + "</TV>)</small>" + tabHtml + "<a href=\"../Html/Comments.html?articleid=" + News_article_id + "&td=" + tokenID + "\" class=\"link\" > <small>Comments (" + StoryCommentsCount + ")</small> </a>" +  shareLink + "</td>" +
                    
                    News_Image_Url_Str +
                    "<td style=\"font-size:10px;\" nowrap=\"nowrap\"><AvgRate>" + News_Avg_Rating + "</AvgRate></td>" +
                    "<td style=\"font-size:10px;\" nowrap=\"nowrap\">" +

                   "<img id=\"rating_0.5" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_1.0" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_1.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_2.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_2.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_3.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_3.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_4.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_4.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_5.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\">" + "</td>" +

                    photoColumn +
                    "<td style=\"font-size:10px;\" nowrap=\"nowrap\">"  + dateInTimeUnit + "</td>" +
                    "<td class=\"hidetablecolumn\">" + "<aID>" + "<input type=\"hidden\" name=\"hidden\" value=\"" + News_article_id  + "\"/>" + "</aID>"  + "</td>" +
                    "<td class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + readnewsSubmitter[i].childNodes[0].nodeValue  + "\"/>" +  "</Posted>" + "</td> </tr>" ;

                }

                document.getElementById("newsbanner").innerHTML = "Browse Stories <small>(" + category + ")</small>";
                document.getElementById("newsCount").innerHTML= "";
                document.getElementById("newslist").innerHTML = html ;
                
                displayPagination(pageCount);

                getratingsList();

                for(var index=0; index<browseRowCounter; index++)
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
            else
            {
                document.getElementById("newsbanner").innerHTML = "Browse Stories <small>(" + category + ")</small>";
                document.getElementById("newsCount").innerHTML= "Not Enough posts to show";
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
        alert("Ajax functionality is NOT supported by your browser!");

}



function searchNews(pageNumber)
{
    var searchQuery = document.getElementById("Searchnews").value;
    
    if(trim(searchQuery) == "")
        return;
    
    document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    resetCategoryMenuBackgrounds();
    
    var Loggeduser = getCookie('Loggeduser');
    
    var url = "/Socion/resources/articles/search" + "?query=" + searchQuery + "&page=" + pageNumber;
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if ((xhttp1.readyState==4) && (xhttp1.status == 200))
        {
            var xmlDoc = xhttp1.responseXML;
            
            var readpagecount = xmlDoc.getElementsByTagName("pagecount");
            var pageCount = readpagecount[0].childNodes[0].nodeValue;
            pageCount = Math.ceil(pageCount);
            
            var readcount = xmlDoc.getElementsByTagName("count");
            var News_count = readcount[0].childNodes[0].nodeValue;

            
            var readarticleID = xmlDoc.getElementsByTagName("articleId");
            var readnewsTitle = xmlDoc.getElementsByTagName("title");
            var readnewsDesc = xmlDoc.getElementsByTagName("description");
            var readnewsUrl = xmlDoc.getElementsByTagName("url");
            var readnewsImageUrl = xmlDoc.getElementsByTagName("imageurl");
            var readnewsSubmitter = xmlDoc.getElementsByTagName("membername");
            var readnewsSubmitter_name = xmlDoc.getElementsByTagName("postedBy");
            var readdateposted = xmlDoc.getElementsByTagName("datePosted");
            var readvotecount = xmlDoc.getElementsByTagName("votesCount");
            var readavgrating = xmlDoc.getElementsByTagName("averageRating");
            var readcommentscount = xmlDoc.getElementsByTagName("commentsCount");
            var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
            var readcategory = xmlDoc.getElementsByTagName("category");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            
            var tabHtml = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            
            var html =  "";
            var Serial_number = 0;
            var browseRowCounter = 0;
            
            var userSharedSrticles = getUserOutbox();
            var displayHeaderFlag = false;
            var headerDisplayedFlag = false;
            
            for (var i=0; i < readnewsTitle.length; i++)
            {
                var shareLink = "";
                displayHeaderFlag = true;
                            
                if((displayHeaderFlag == true) && (headerDisplayedFlag == false))
                {    
                    html = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF;\">" +
                    "<th nowrap=\"nowrap\">Type</th>" +
                    "<th nowrap=\"nowrap\" colspan=\"2\">Story</th>" +
                    "<th nowrap=\"nowrap\">Avg Rating</th>" +
                    "<th nowrap=\"nowrap\">Rating</th>" +
                    "<th nowrap=\"nowrap\">Posted By</th>" +
                    "<th nowrap=\"nowrap\">Date Posted</th>" +
                    "</tr>";

                    headerDisplayedFlag = true;
                }
                            

                var photoColumn = "";
                Serial_number = browseRowCounter++ ;
                var News_title = readnewsTitle[i].childNodes[0].nodeValue;
                var News_description = readnewsDesc[i].childNodes[0].nodeValue;
                var News_url = readnewsUrl[i].childNodes[0].nodeValue;
                var News_date_posted = readdateposted[i].childNodes[0].nodeValue;
                var News_Image_Url = readnewsImageUrl[i].childNodes[0].nodeValue;
                
                
                var localDate = getLocalDateTime(News_date_posted);
                var dateInTimeUnit = convertDateToTimeUnit(localDate);

                News_title = retrieveNewsData(News_title);
                News_url = retrieveNewsData(News_url);
                News_description = retrieveNewsData(News_description);
                News_Image_Url = retrieveNewsData(News_Image_Url);

                var News_Submitter_name = readnewsSubmitter_name[i].childNodes[0].nodeValue;
                var News_Submitter = "<a href=\"./Specific_User.html?username=" + readnewsSubmitter[i].childNodes[0].nodeValue + "&td=" + tokenID + "\" class=\"link\">" +  News_Submitter_name + " </a>";
                var News_total_votes = readvotecount[i].childNodes[0].nodeValue;
                var StoryCommentsCount = readcommentscount[i].childNodes[0].nodeValue;
                var StorysharesCount = readsharescount[i].childNodes[0].nodeValue;
                var News_article_id =  readarticleID[i].childNodes[0].nodeValue;
                var News_Category = readcategory[i].childNodes[0].nodeValue;
                var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;
                var storySubmitterUsername = readnewsSubmitter[i].childNodes[0].nodeValue;
                var News_Avg_Rating = readavgrating[i].childNodes[0].nodeValue;
                //News_Avg_Rating = (parseFloat(News_Avg_Rating)).toFixed(1);
                News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";
                
                if(Loggeduser != storySubmitterUsername)
                {    
                     if(userSharedSrticles.indexOf(News_article_id) != -1)
                        shareLink = tabHtml + "<SH><small>Shares(" + StorysharesCount + ")</small></SH>";
                     else
                        shareLink = tabHtml + "<SH><a href=\"#\" class=\"link\" onclick=\"shareStory("+Serial_number+","+StorysharesCount+")\"> <small>Share</small> </SH>  </a>";
                }    

                if(Member_Photo_Status == "true")
                {
                    photoColumn = "<td style=\"font-size:10px;\" align=\"left\" nowrap=\"nowrap\">"  + "<img id=\"imageId"+Serial_number+"\" src=\"\" width=\"50\" height=\"50\" align=\"middle\">" + "&nbsp;&nbsp; <b>"  + News_Submitter + "</b></td>";
                }    
                else
                    photoColumn = "<td style=\"font-size:10px;\" align=\"left\" nowrap=\"nowrap\">"  + "<img id=\"imageId"+Serial_number+"\" src=\"../images/no_photo.jpg\" width=\"50\" height=\"50\" align=\"middle\">" + "&nbsp;&nbsp; <b>"  + News_Submitter + "</b></td>";

                if(trim(News_description) == "")
                    News_description_Str = "";
                else
                    News_description_Str = "<h5 style=\"background-color:#E4E7EB; text-align:justify; display:table-row; \">" + News_description + "</h5>" ;

                if(trim(News_Image_Url) == "")
                        News_Image_Url_Str = "<td width=\"50px\"> </td>";
                else
                        News_Image_Url_Str = "<td width=\"50px\">" + "<img src=\"" + News_Image_Url + "\" width=\"50\" height=\"50\" align=\"center\"> </td>";


                html = html + "<tr style=\"background-color:#FFF8C6; height:50px\" align=\"center\">" +
                getCategoryColumn(News_Category) + "</td>" +
                
                "<td style=\"font-size:12px;\" align=\"left\"> <b> <a href=\"" + "/Socion/Story/ReadArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\" >" + News_title + "</a>" + "</b><br/>" + "<font size=\"1\" color=\"green\">" + News_url.substring(0,100) + "<br/></font>" + News_description_Str +
                "<small> Votes (<TV>"  + News_total_votes + "</TV>)</small>" + tabHtml + "<a href=\"../Html/Comments.html?articleid=" + News_article_id + "&td=" + tokenID + "\" class=\"link\" > <small>Comments (" + StoryCommentsCount + ")</small> </a>" +  shareLink + "</td>" +
                News_Image_Url_Str +
                "<td style=\"font-size:10px;\" nowrap=\"nowrap\"><AvgRate>" + News_Avg_Rating + "</AvgRate></td>" +
                "<td style=\"font-size:10px;\" nowrap=\"nowrap\">" +
                
                "<img id=\"rating_0.5" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_1.0" + "_" + Serial_number + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                <img id=\"rating_1.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_2.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                <img id=\"rating_2.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_3.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                <img id=\"rating_3.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_4.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                <img id=\"rating_4.5" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_5.0" + "_" + Serial_number + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\">" + "</td>" +

                photoColumn +
                "<td style=\"font-size:10px;\" nowrap=\"nowrap\">"  + dateInTimeUnit + "</td>" +
                "<td class=\"hidetablecolumn\">" + "<aID>" + "<input type=\"hidden\" name=\"hidden\" value=\"" + News_article_id  + "\"/>" + "</aID>"  + "</td>" +
                "<td class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + readnewsSubmitter[i].childNodes[0].nodeValue  + "\"/>" +  "</Posted>" + "</td> </tr>" ;

            }
            
            document.getElementById("newsCount").innerHTML = "";
            document.getElementById("newsbanner").innerHTML= "Story search results for - '" + searchQuery + "' - " + browseRowCounter + " of " + News_count ;
            document.getElementById("newslist").innerHTML = html ;
            
            
                displaySearchPagination(pageCount,pageNumber);
            
            getratingsList();

            for(var index=0; index<browseRowCounter; index++)
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

