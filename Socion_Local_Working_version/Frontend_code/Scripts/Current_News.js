
tokenID = getParameterfromURL("td");

function getarticlesList(pageNumber)
{
    
    document.getElementById("pageNumber").value = pageNumber;

    var username = getParameterfromURL("username");
    var Loggeduser = getCookie('Loggeduser');
    var Main_Submitter_Username;

    var url = "/resources/members/membername/" + username;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;

            var readusername = xmlDoc.getElementsByTagName("username");
            var readfullname = xmlDoc.getElementsByTagName("fullname");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isImageUploaded");

            Main_Submitter_Username = readusername[0].childNodes[0].nodeValue;
            var Main_Submitter_Fullname = readfullname[0].childNodes[0].nodeValue;
            var Member_Photo_Status = readphotouploadstatus[0].childNodes[0].nodeValue;


            if(Member_Photo_Status == "true")
            {    
                var pngImageName = Main_Submitter_Username.replace(/\./g,"dot")
                var profileImage = "../images/"  + pngImageName.toLowerCase() + ".png";
                reloadImg("postboxfor",profileImage) ;
            }    
            else
                document.getElementById("postboxfor").src = "../images/no_photo.jpg" ;

            document.getElementById("username").innerHTML = "<b>" + Main_Submitter_Fullname + "</b>";
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

    
    url = "/resources/articles/member/" + username + "?page=" + pageNumber;
    var xhttp1 = getXMLHttpRequestObject();

    var funct1 = function ()
    {
        if (xhttp1.readyState==4 && xhttp1.status==200)
        {
                var xmlDoc = xhttp1.responseXML;

                var readpagecount = xmlDoc.getElementsByTagName("pagecount");
                var pageCount = readpagecount[0].childNodes[0].nodeValue;
                pageCount = Math.ceil(pageCount);
                
                var readarticleID = xmlDoc.getElementsByTagName("articleId");


                var html = "";

                if(readarticleID.length > 0)
                {
                    var ratingColumn = "";
                    var shareLink = "";
                    var closeButtonColumn = "";
                    
                    var readnewsTitle = xmlDoc.getElementsByTagName("title");
                    var readnewsDesc = xmlDoc.getElementsByTagName("description");
                    var readnewsUrl = xmlDoc.getElementsByTagName("url");
                    var readnewsImageUrl = xmlDoc.getElementsByTagName("imageurl");
                    var readdateposted = xmlDoc.getElementsByTagName("datePosted");
                    var readvotecount = xmlDoc.getElementsByTagName("votesCount");
                    var readavgrating = xmlDoc.getElementsByTagName("averageRating");
                    var readcommentscount = xmlDoc.getElementsByTagName("commentsCount");
                    var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
                    var readcategory = xmlDoc.getElementsByTagName("category");
                    var readnewsSubmitter = xmlDoc.getElementsByTagName("membername");
                    
                    Main_Submitter_Username = readnewsSubmitter[0].childNodes[0].nodeValue;

                    var tabHtml = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

                    if(Loggeduser == Main_Submitter_Username)
                    {    
                        html =
                            "<tr style=\"font-size:12px;;background-color:#8D38C9;color:#FFFFFF; \" >" +
                            "<th nowrap=\"nowrap\">Type</th>" +
                            "<th nowrap=\"nowrap\" colspan=\"2\">Story</th>" +
                            "<th nowrap=\"nowrap\">Avg Rating</th>" +
                            "<th nowrap=\"nowrap\">Date Posted</th>" +
                            "<th> </th>"    +
                            "</tr>";
                    }
                    else
                    {
                            html =
                            "<tr style=\"font-size:12px;;background-color:#8D38C9;color:#FFFFFF; \" >" +
                            "<th nowrap=\"nowrap\">Type</th>" +
                            "<th nowrap=\"nowrap\" colspan=\"2\">Story</th>" +
                            "<th nowrap=\"nowrap\">Avg Rating</th>" +
                            "<th nowrap=\"nowrap\">Rating</th>" +
                            "<th nowrap=\"nowrap\">Date Posted</th>" +
                            "</tr>";
                    }    
                    var userSharedArticles = getUserOutbox();

                    for (var i=0; i < readarticleID.length; i++)
                    {
                        var News_title = readnewsTitle[i].childNodes[0].nodeValue;
                        var News_description = readnewsDesc[i].childNodes[0].nodeValue;
                        var News_url = readnewsUrl[i].childNodes[0].nodeValue;
                        var News_Category = readcategory[i].childNodes[0].nodeValue;
                        var News_Image_Url = readnewsImageUrl[i].childNodes[0].nodeValue;

                        News_title = retrieveNewsData(News_title);
                        News_url = retrieveNewsData(News_url);
                        News_description = retrieveNewsData(News_description);
                        News_Image_Url = retrieveNewsData(News_Image_Url);

                        var News_date_posted = readdateposted[i].childNodes[0].nodeValue;
                        
                        var localDate = getLocalDateTime(News_date_posted);
                        var dateInTimeUnit = convertDateToTimeUnit(localDate);
                        
                        var News_total_votes = readvotecount[i].childNodes[0].nodeValue;
                        var StoryCommentsCount = readcommentscount[i].childNodes[0].nodeValue;
                        var StorysharesCount = readsharescount[i].childNodes[0].nodeValue;
                        var News_article_id = readarticleID[i].childNodes[0].nodeValue;
                        var News_Avg_Rating = readavgrating[i].childNodes[0].nodeValue;
                        //News_Avg_Rating = (parseFloat(News_Avg_Rating)).toFixed(1);
                        News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";
                        
                        
                        if(Loggeduser == Main_Submitter_Username)
                        {
                            ratingColumn = "";
                            shareLink = tabHtml + "<SH><small>Shares(" + StorysharesCount + ")</small></SH>";
                            closeButtonColumn =  "<td nowrap=\"nowrap\">" + "<img style=\"cursor:pointer;\" src=\"../images/close_button.jpg\" title=\"Delete Story\" onclick=\"deleteStory(" + i + ")\">" + "</td>" ;
                        }
                        else
                        {
                            ratingColumn = "<td style=\"font-size:10px;\" nowrap=\"nowrap\">" + 
                            "<img id=\"rating_0.5" + "_" + i + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"0.5 Star\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_1.0" + "_" + i + "\"style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1 Star\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                            <img id=\"rating_1.5" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"1.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_2.0" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                            <img id=\"rating_2.5" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"2.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_3.0" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                            <img id=\"rating_3.5" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"3.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_4.0" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\"> \
                            <img id=\"rating_4.5" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"4.5 Stars\" alt=\"\" src=\"../images/rating_off_left.gif\"><img id=\"rating_5.0" + "_" + i + "\" style=\"cursor: default; border: 0px;\"  onclick=\"\" onmouseout=\"\" onmouseover=\"\" title=\"5 Stars\" alt=\"\" src=\"../images/rating_off_right.gif\">" + "</td>" ;
    
                            closeButtonColumn = "";
                            
                            if(userSharedArticles.indexOf(News_article_id) != -1)
                                shareLink = tabHtml + "<SH><small>Shares(" + StorysharesCount + ")</small></SH>";
                            else
                                shareLink = tabHtml + "<SH><a href=\"#\" class=\"link\" onclick=\"shareStory("+i+","+StorysharesCount+")\"> <small> Share </small></SH>  </a>";
                        }
                        
                        if(trim(News_description) == "")
                            News_description_Str = "";
                        else
                            News_description_Str = "<h5 style=\"background-color:#E4E7EB; text-align:justify; display:table-row; \">" + News_description + "</h5>" ;
                        
                        
                        if(trim(News_Image_Url) == "")
                            News_Image_Url_Str = "<td width=\"50px\"> </td>";
                        else
                            News_Image_Url_Str = "<td width=\"50px\">" + "<img src=\"" + News_Image_Url + "\" width=\"50\" height=\"50\" align=\"center\"> </td>";

                        
                        html = html + "<tr style=\"background-color:#FFF8C6;height:50px;\" align=\"center\">" + 
                        getCategoryColumn(News_Category) + "</td>" +
                        
                        "<td style=\"font-size:12px;\" align=\"left\"> <b> <a href=\"" + "/Story/ReadArticle?aid=" + News_article_id  +  "\" class=\"link\"  target=\"_blank\">" + News_title + "</a>" + "</b><br/>" + "<font size=\"1\" color=\"green\">" + News_url.substring(0,100) + "<br/></font>" + News_description_Str +
                        "<small> Votes (<TV>"  + News_total_votes + "</TV>)</small>" + tabHtml + "<a href=\"../Html/Comments.html?articleid=" + News_article_id + "&td=" + tokenID + "\" class=\"link\" > <small>Comments (" + StoryCommentsCount + ")</small> </a>" +  shareLink + "</td>" +
                        News_Image_Url_Str +
                        "<td style=\"font-size:10px;\" nowrap=\"nowrap\"><AvgRate>" + News_Avg_Rating + "</AvgRate></td>" +
                         ratingColumn +
                        "<td style=\"font-size:10px;\" nowrap=\"nowrap\">" + dateInTimeUnit + "</td>" +
                        closeButtonColumn + 
                        "<td class=\"hidetablecolumn\">" + "<aID>" + "<input type=\"hidden\" name=\"hidden\" value=\"" + News_article_id  + "\"/>" + "</aID>"  + "</td>" +
                        "<td class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"hidden\" value=\""  + readnewsSubmitter[i].childNodes[0].nodeValue  + "\"/>" +  "</Posted>" + "</td> </tr>" ;
                    }
                }
                document.getElementById("newslist").innerHTML = html;
                displayPaginationForUser(pageNumber,pageCount);
                
                document.getElementById("newsCount").innerHTML= "";
                getratingsList();
        }
    };


    if(xhttp1 != null)
    {
        xhttp1.onreadystatechange = funct1;
        
        xhttp1.open("GET",url,true);
        xhttp1.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
        xhttp1.send();
    }
    else
        alert("Ajax functionality is NOT supported by your browser!");

}


function confirmRemoveStory()
{
    var agree = confirm("Are you sure you want to remove this story?");
    return agree;
}


function deleteStory(clicked_row)
{
    if(!confirmRemoveStory())
        return;
    
    var Loggeduser = getCookie('Loggeduser');
    
    var aID = document.getElementsByTagName("aID");
    var articleId = aID[clicked_row].firstChild.value;
    
    var url =  "/resources/articles/" + articleId;
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
                    document.getElementById("newsCount").innerHTML = "<font color=\"#347235\">" + "<b> Success! Story Deleted </b></font>" ;
                    var pageNumber = document.getElementById("pageNumber").value;
                    getarticlesList(pageNumber);
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

                document.getElementById("newsCount").innerHTML = "<font color=\"#FF0000\">" + "<b> Error! Story NOT deleted " + Errortext + "</b></font>" ;

            }

        }
    };

    
    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("DELETE",url,true);
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        document.getElementById("newsCount").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");
}

