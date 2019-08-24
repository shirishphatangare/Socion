

function Browse_news(category, pageNumber)
{
    //alert("In Browse_news");
    //document.getElementById("newslist").innerHTML = "";
    document.getElementById("newstablecontainer").innerHTML = "" ;
    document.getElementById("indexnewsbanner").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    
    var Username = "";
    var url = "/Socion/resources/articles/bootstrap" + "?userName=" + Username + "&ct=" + category + "&page=" + pageNumber;
    var xhttp = getXMLHttpRequestObject();
    
    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
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
            //var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
            var readcategory = xmlDoc.getElementsByTagName("category");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            
            if(readarticleID.length > 0)
            {
                var tabHtml = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                var shareLink = "";
                var html =  "";
                var Serial_number = 0;
                var displayHeaderFlag = false;
                var headerDisplayedFlag = false;

                var browseRowCounter = 0;
                
                for (var i=0; i < readnewsTitle.length; i++)
                {
                    var News_date_posted = readdateposted[i].childNodes[0].nodeValue;
                    var localDate = getLocalDateTime(News_date_posted);
                    var dateInTimeUnit = convertDateToTimeUnit(localDate);
                    var News_url = readnewsUrl[i].childNodes[0].nodeValue;
                    var News_title = readnewsTitle[i].childNodes[0].nodeValue;
                    
                    
                    var News_Image_Url = "";
                    
                    if(readnewsImageUrl[i].childNodes[0] != null)
                        News_Image_Url = readnewsImageUrl[i].childNodes[0].nodeValue;
                    
                        
                    var News_description = "" ;
                    
                    if(readnewsDesc[i].childNodes[0] != null)
                        News_description = readnewsDesc[i].childNodes[0].nodeValue;


                    
                    displayHeaderFlag = true;

                    if((displayHeaderFlag == true) && (headerDisplayedFlag == false))
                    {    
                        html = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF;\">" +
                        "<th nowrap=\"nowrap\">Type</th>" +
                        "<th nowrap=\"nowrap\" colspan=\"2\">Story</th>" +
                        "<th nowrap=\"nowrap\">Posted By</th>" +
                        "</tr>";

                        headerDisplayedFlag = true;
                    }

                    var photoColumn = "";
                    Serial_number = browseRowCounter++ ;
                    
                    
                    if(News_title != null)
                        News_title = retrieveNewsData(News_title);
                    
                    if(News_url != null)
                        News_url = retrieveNewsData(News_url);
                    
                    if(News_description != null)
                        News_description = retrieveNewsData(News_description);
                    
                    if(News_Image_Url != null)
                        News_Image_Url = retrieveNewsData(News_Image_Url);
                    
                    
                    
                    var News_Submitter_name = readnewsSubmitter_name[i].childNodes[0].nodeValue;
                    var News_Submitter = "<a href=\"#\"" + "onclick=\"getarticlesIndexList('" + News_Submitter_name + "','" + readnewsSubmitter[i].childNodes[0].nodeValue + "','1')\"" + "\" class=\"link\">" +  News_Submitter_name + " </a>";
                    var News_total_votes = readvotecount[i].childNodes[0].nodeValue;
                    var StoryCommentsCount = readcommentscount[i].childNodes[0].nodeValue;
                    //var StorysharesCount = readsharescount[i].childNodes[0].nodeValue;
                    var News_article_id =  readarticleID[i].childNodes[0].nodeValue;
                    var News_Category = readcategory[i].childNodes[0].nodeValue;
                    var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;
                    var News_Avg_Rating = readavgrating[i].childNodes[0].nodeValue;
                    News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";


                    shareLink = tabHtml + "<SH><a href=\"./Join_Socion.html\" class=\"link\"> <small>Share</small> </SH>  </a>";

                    if(Member_Photo_Status == "true")
                    {    
                        photoColumn = "<td style=\"font-size:10px;\" align=\"right\" nowrap=\"nowrap\">"  +  "<b>"  + News_Submitter + "</b>" + "<img id=\"imageId"+Serial_number + "\" src=\"\" width=\"50\" height=\"50\" align=\"middle\">" + "</td>";
                    }
                    else
                        photoColumn = "<td style=\"font-size:10px;\" align=\"right\" nowrap=\"nowrap\">"   + "<b>"  + News_Submitter + "</b>" + "<img id=\"imageId"+Serial_number + "\" src=\"../images/no_photo.jpg\" width=\"50\" height=\"50\" align=\"middle\">" + "</td>";
                    

                    if(trim(News_description) == "")
                        News_description_Str = "";
                    else
                        News_description_Str = "<h5 style=\"background-color:#E4E7EB; text-align:justify; display:table-row;  \">" + News_description + "</h5>" ;

                    
                    if(trim(News_Image_Url) == "")
                        News_Image_Url_Str = "<td width=\"60px\">" + "<a href=\"" + "/Socion/Story/ReadIndexArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\">" + "<img src=\"../images/no_image.jpg\" width=\"50\" height=\"50\" align=\"center\" border=\"0\" onmouseover=\"this.style.border='medium solid #0000FF';\" onmouseout=\"this.style.border='none'\">  </a></td>";
                    else
                        News_Image_Url_Str = "<td width=\"60px\">" + "<a href=\"" + "/Socion/Story/ReadIndexArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\">" + "<img src=\"" + News_Image_Url + "\" width=\"50\" height=\"50\" align=\"center\" border=\"0\" onmouseover=\"this.style.border='medium solid #0000FF';\" onmouseout=\"this.style.border='none'\">  </a></td>";
                    
                    
                    html = html + "<tr style=\"background-color:#FFF8C6; height:50px\" align=\"center\">" +
                    getCategoryColumn(News_Category) + "</td>" +
                    "<td style=\"font-size:12px;\" align=\"left\"> <b> <a href=\"" + "/Socion/Story/ReadIndexArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\"  >" + News_title + "</a>" + "</b><br/>" + "<font size=\"1\" color=\"green\">" + News_url.substring(0,100) + "<br/></font>" + News_description_Str +
                    "<small> Avg. Rating: <AvgRate>" + News_Avg_Rating + "</AvgRate> </small>" + tabHtml + tabHtml +  "<small> Date Posted: " + dateInTimeUnit + "</small>" + tabHtml +  tabHtml +   
                    
                    "<img id=\"rating_0.5" + "_" + Serial_number + "\"style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(0.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(0.5," + Serial_number + ");\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_1.0" + "_" + Serial_number + "\"style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(1," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(1," + Serial_number + ");\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_1.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(1.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(1.5," + Serial_number + ");\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_2.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(2," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(2," + Serial_number + ");\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_2.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(2.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(2.5," + Serial_number + ");\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_3.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(3," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(3," + Serial_number + ");\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_3.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(3.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(3.5," + Serial_number + ");\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_4.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(4," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(4," + Serial_number + ");\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                    <img id=\"rating_4.5" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(4.5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(4.5," + Serial_number + ");\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_5.0" + "_" + Serial_number + "\" style=\"cursor: pointer; border: 0px; vertical-align: middle;\"  onclick=\"document.location = './Join_Socion.html';\" onmouseout=\"changeStarOnmouseOut(5," + Serial_number + ");\" onmouseover=\"changeStarOnmouseOver(5," + Serial_number + ");\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\">"  + "<br/>"+ 
                    
                    "<small> Votes (<TV>"  + News_total_votes + "</TV>)</small>" + tabHtml + "<a href=\"./Join_Socion.html"  + "\" class=\"link\" > <small>Comments (" + StoryCommentsCount + ")</small> </a>" +  shareLink + "</td>" +
                    News_Image_Url_Str +
                    photoColumn +
                    "<td class=\"hidetablecolumn\">" + "<aID>" + "<input type=\"hidden\" name=\"hidden\" value=\"" + News_article_id  + "\"/>" + "</aID>"  + "</td>" +
                    "<td class=\"hidetablecolumn\">" + " <Posted> " + "<input type=\"hidden\" name=\"postedhidden\" value=\""  + readnewsSubmitter[i].childNodes[0].nodeValue  + "\"></input> " +  "</Posted>" + "</td> </tr>" ;
                }

                document.getElementById("indexnewsbanner").innerHTML = "Recent Stories <small>(" + category + ")</small> <a id=\"refreshicon\" style=\"cursor:pointer; margin:2px; float: left\" onclick=\"document.getElementById('pageNumber').value='1'; Browse_news('" + category + "','1" + "');\"><img src=\"../images/refresh.jpg\" alt=\"\" height=\"20\" title=\"Refresh\"></a>";    
                document.getElementById("refreshicon").style.display="block";
                //document.getElementById("newslist").innerHTML = html ;
                document.getElementById("newstablecontainer").innerHTML = "<table cellpadding=\"2\" cellspacing=\"2\" border=\"0\" id=\"newslist\"><tbody>" + html + "</tbody></table>" ;

                
                
                displayPagination(pageCount);

                 
                for(var index=0; index<browseRowCounter; index++)
                {
                    var posterName = document.getElementsByName("postedhidden")[index].value;
                    
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
                document.getElementById("indexnewsbanner").innerHTML = "Not enough posts to show";
            }
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("GET",url,true);
        //alert("Sending");
        xhttp.send();
    }
    else
        alert("Ajax functionality is NOT supported by your browser!");

}


