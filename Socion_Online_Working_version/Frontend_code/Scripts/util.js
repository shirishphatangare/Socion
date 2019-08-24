tokenID = getParameterfromURL("td");
//var SESSION_TIMEOUT_MINS = 60;
//var sessionTimeout; 


function getCategoryImage(News_Category)
{
    var categoryImage;
    
    switch (News_Category)
    {
        case 'Video':
        {
            categoryImage = "../images/video_icon.png";
            break;
        }
        case 'Picture':
        {
            categoryImage = "../images/picture_icon.jpg";
            break;
        }
        case 'Blog':
        {
            categoryImage = "../images/blog_icon.jpg";
            break;
        }
        case 'Comedy':
        {
            categoryImage = "../images/comedy_icon.jpg";
            break;
        }
        case 'World News':
        {
            categoryImage = "../images/news_icon.jpg";
            break;
        }
        case 'Business':
        {
            categoryImage = "../images/business_icon.jpg";
            break;
        }
        case 'Entertainment':
        {
            categoryImage = "../images/entertainment_icon.jpg";
            break;
        }
        case 'Health':
        {
            categoryImage = "../images/health_icon.jpg";
            break;
        }
        case 'Lifestyle':
        {
            categoryImage = "../images/lifestyle_icon.jpg";
            break;
        }
        case 'Sports':
        {
            categoryImage = "../images/sports_icon.jpg";
            break;
        }
        case 'Science/Technology':
        {
            categoryImage = "../images/sci_tech_icon.jpg";
            break;
        }
        case 'Politics':
        {
            categoryImage = "../images/politics_icon.jpg";
            break;
        }
        case 'Nature':
        {
            categoryImage = "../images/nature_icon.jpg";
            break;
        }
        case 'Travel':
        {
            categoryImage = "../images/travel_icon.jpg";
            break;
        }
        case 'Culture':
        {
            categoryImage = "../images/culture_icon.jpg";
            break;
        }
        case 'Gaming':
        {
            categoryImage = "../images/gaming_icon.jpg";
            break;
        }
        case 'Other':
        {
            categoryImage = "../images/other_icon.jpg";
            break;
        }
        default:
        {
            categoryImage = "../images/no_image.jpg";
            break;

        }
    }
        
        return categoryImage;
   
}


function selectStoryType()
{
    var mainCategory = document.getElementById("mainCategory").value; 
    var subCategory = document.getElementById("subCategory").value; 
    var pageNo = document.getElementById("pageNumber").value;
    
    resetCategoryMenuBackgrounds();
    showClickedIndexMenuBlock(subCategory);
    
    switch(mainCategory)
    {
        case 'Top':
                
                document.getElementById('navlistPage').innerHTML = "";
                getSocionTopStories(subCategory, pageNo);
                document.getElementById("topCategory").style.backgroundColor='#369';
                document.getElementById("recentCategory").style.backgroundColor='#036';
                break;

        case 'Recent':
                //alert("In recent");
                Browse_news(subCategory, pageNo);
                document.getElementById("topCategory").style.backgroundColor='#036';
                document.getElementById("recentCategory").style.backgroundColor='#369';
                break;
                
        default:
               break;
         
    }
    
}


function searchIndexData()
{
    
    document.getElementById('navlistPage').innerHTML = "";
    
    //var searchtype = document.getElementById("searchtype").value;
    
    var searchtype = document.getElementById("searchtype").selectedIndex;
    
    var pageNumber = 1; 
    
   
    if(searchtype == 0)
    {    
        searchIndexNews(pageNumber);
    }
    else
        searchIndexPeople();
    
    document.getElementById("indexnewsbanner").innerHTML = "";
    document.getElementById('mainCategory').value = "Recent";

    document.getElementById("recentCategory").style.backgroundColor='#036';
    document.getElementById("topCategory").style.backgroundColor='#036';
    resetCategoryMenuBackgrounds();
}


function searchIndexPeople()
{
    
        var searchQuery = document.getElementById("Searchnews").value;
    
        if(trim(searchQuery) == "")
        {    
            return;
        }

    
            document.getElementById("indexnewsbanner").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    

            var url = "/Socion/resources/members/search" + "?query=" + searchQuery;
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
                            photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"\" width=\"75\" height=\"75\" align=\"middle\">" + "&nbsp;&nbsp; <b> " + "<a href=\"#\"" + "onclick=\"getarticlesIndexList('" + Friend_Fullname + "','" + Friend_Username + "','1')\"" + "\" class=\"link\">" +  Friend_Fullname + " </a>" + " </b> </td>" ;
                        else
                            photoColumn = "<td style=\"font-size:13px;\" nowrap=\"nowrap\" align=\"left\">"  + "<img id=\"imageId"+i+"\" src=\"../images/no_photo.jpg\" width=\"75\" height=\"75\" align=\"middle\">" + "&nbsp;&nbsp; <b> " + "<a href=\"#\"" + "onclick=\"getarticlesIndexList('" + Friend_Fullname + "','" + Friend_Username + "','1')\"" + "\" class=\"link\">" +  Friend_Fullname + " </a>" +  " </b> </td>" ;

                        var postedColumn = "<td nowrap=\"nowrap\" class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"postedhidden\" value=\""  + Friend_Username   + "\"/>" +  "</Posted>" + "</td> </tr>" ;


                        friendHeader = "<tr style=\"font-size:12px;background-color:#8D38C9;color:#FFFFFF; \" >" +
                                    "<th nowrap=\"nowrap\" colspan=\"2\">Socion members</th>" +
                                    "</tr>";


                        friendHtml = friendHtml + "<tr style=\"background-color:#FFF8C6\" align=\"center\">" +
                                     photoColumn + postedColumn + "</tr>";

                    }

                   // friendHtml = friendHtml + "<tr style=\"height:50px;\" align=\"center\">  </tr>";

                    document.getElementById("newstablecontainer").innerHTML = "<table cellpadding=\"2\" cellspacing=\"2\" border=\"0\" id=\"newslist\"><tbody>" + friendHeader + friendHtml + "</tbody></table>"  ;

                    var friendsCount = readcount[0].firstChild.nodeValue;  

                    document.getElementById("indexnewsbanner").innerHTML = "People search results for - '" + searchQuery + "' - " + friendsCount;
                    
                    for(var index=0; index<friendsCount; index++)
                    {
                        /*var Posted = document.getElementsByTagName("Posted");
                        var posterName = Posted[index].firstChild.value;*/
                        
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
            }


            if(xhttp1 != null)
            {
                xhttp1.onreadystatechange = funct1;
                xhttp1.open("GET",url,true);
                xhttp1.send();

            }
            else
                alert("Ajax functionality is not supported by your browser!");


}



function searchIndexNews(pageNumber)
{
    var searchQuery = document.getElementById("Searchnews").value;
    
    if(trim(searchQuery) == "")
    {    
        return;
    }
    
    document.getElementById("indexnewsbanner").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">" ;
    
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
            //var readsharescount = xmlDoc.getElementsByTagName("sharesCount");
            var readcategory = xmlDoc.getElementsByTagName("category");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isMemberPhotoUploaded");
            
            var tabHtml = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            
            var html =  "";
            var Serial_number = 0;
            var browseRowCounter = 0;
            
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
                    "<th nowrap=\"nowrap\">Posted By</th>" +
                    "</tr>";

                    headerDisplayedFlag = true;
                }
                            

                var photoColumn = "";
                Serial_number = browseRowCounter++ ;
                var News_title = readnewsTitle[i].childNodes[0].nodeValue;
                //var News_description = readnewsDesc[i].childNodes[0].nodeValue;
                var News_url = readnewsUrl[i].childNodes[0].nodeValue;
                var News_date_posted = readdateposted[i].childNodes[0].nodeValue;
                //var News_Image_Url = readnewsImageUrl[i].childNodes[0].nodeValue;
                
                var News_Image_Url = "";

                if(readnewsImageUrl[i].childNodes[0] != null)
                    News_Image_Url = readnewsImageUrl[i].childNodes[0].nodeValue;


                var News_description = "" ;

                if(readnewsDesc[i].childNodes[0] != null)
                    News_description = readnewsDesc[i].childNodes[0].nodeValue;

                
                
                var localDate = getLocalDateTime(News_date_posted);
                var dateInTimeUnit = convertDateToTimeUnit(localDate);

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
                var News_article_id =  readarticleID[i].childNodes[0].nodeValue;
                var News_Category = readcategory[i].childNodes[0].nodeValue;
                var Member_Photo_Status = readphotouploadstatus[i].childNodes[0].nodeValue;
                var News_Avg_Rating = readavgrating[i].childNodes[0].nodeValue;
                News_Avg_Rating = (parseFloat(News_Avg_Rating / 2)).toFixed(1) + " Star";
                
                shareLink = tabHtml + "<SH><a href=\"./Join_Socion.html\" class=\"link\"> <small>Share</small> </SH>  </a>";

                
                if(Member_Photo_Status == "true")
                {
                    photoColumn = "<td style=\"font-size:10px;\" align=\"right\" nowrap=\"nowrap\">"  + "<b>"  + News_Submitter + "</b>" + "<img id=\"imageId"+Serial_number+"\" src=\"\" width=\"50\" height=\"50\" align=\"middle\">" + "</td>";
                }    
                else
                    photoColumn = "<td style=\"font-size:10px;\" align=\"right\" nowrap=\"nowrap\">"  + "<b>"  + News_Submitter + "</b>" + "<img id=\"imageId"+Serial_number+"\" src=\"../images/no_photo.jpg\" width=\"50\" height=\"50\" align=\"middle\">" + "</td>";



                if(trim(News_description) == "")
                    News_description_Str = "";
                else
                    News_description_Str = "<h5 style=\"background-color:#E4E7EB; text-align:justify; display:table-row; \">" + News_description + "</h5>" ;
                
                
                if(trim(News_Image_Url) == "")
                        News_Image_Url_Str = "<td width=\"60px\">" + "<a href=\"" + "/Socion/Story/ReadIndexArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\">" + "<img src=\"../images/no_image.jpg\" width=\"50\" height=\"50\" align=\"center\" border=\"0\" onmouseover=\"this.style.border='medium solid #0000FF';\" onmouseout=\"this.style.border='none'\">  </a></td>";
                else
                        News_Image_Url_Str = "<td width=\"60px\">" + "<a href=\"" + "/Socion/Story/ReadIndexArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\">" + "<img src=\"" + News_Image_Url + "\" width=\"50\" height=\"50\" align=\"center\" border=\"0\" onmouseover=\"this.style.border='medium solid #0000FF';\" onmouseout=\"this.style.border='none'\">  </a></td>";


                
                html = html + "<tr style=\"background-color:#FFF8C6; height:50px\" align=\"center\">" +
                getCategoryColumn(News_Category) + "</td>" +
                
                "<td style=\"font-size:12px;\" align=\"left\"> <b> <a href=\"" + "/Socion/Story/ReadIndexArticle?aid=" + News_article_id  +  "\" class=\"link\" target=\"_blank\" >" + News_title + "</a>" + "</b><br/>" + "<font size=\"1\" color=\"green\">" + News_url.substring(0,100) + "<br/></font>" + News_description_Str +
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
                "<td class=\"hidetablecolumn\">" + "<Posted>" + "<input type=\"hidden\" name=\"postedhidden\" value=\""  + readnewsSubmitter[i].childNodes[0].nodeValue  + "\"/>" +  "</Posted>" + "</td> </tr>" ;

            }
            
            
            document.getElementById("indexnewsbanner").innerHTML= "Story search results for - '" + searchQuery + "' - " + browseRowCounter + " of " + News_count ;
            //document.getElementById("newslist").innerHTML = html ;
            document.getElementById("newstablecontainer").innerHTML = "<table cellpadding=\"2\" cellspacing=\"2\" border=\"0\" id=\"newslist\"><tbody>" + html + "</tbody></table>" ;

            
            
            displaySearchPagination(pageCount,pageNumber);
            
            for(var index=0; index<browseRowCounter; index++)
            {
                /*var Posted = document.getElementsByTagName("Posted");
                var posterName = Posted[index].firstChild.value;*/
                
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


function setIndexPage()
{
    //document.getElementById("maintable").style.right="0px";
    
    verifyBrowserSession();
    document.getElementById("Loggeduser").focus();
    getArticlesCount();
    
    var username = getParameterfromURL("username");
    var fullname = getParameterfromURL("fullname");
    
    if(username == "")
    {
        document.getElementById("mainCategory").value = "Recent";
        document.getElementById("subCategory").value = "All";
        document.getElementById("pageNumber").value = "1";
        selectStoryType();
    }
    else
        getarticlesIndexList(fullname, username,'1');
        
    
    document.getElementById("Searchnews").value = '';

}

function getArticlesCount()
{
    var url = "/Socion/resources/articles";
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4)
        {
            if(xhttp.status == 200)
            {
                var response = xhttp.responseText;
                document.getElementById("storyCount").innerHTML = "<b>Stories aggregated: " + response + "</b>";
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



function verifyBrowserSession()
{
        var Loggeduser = getCookie('Loggeduser');
        
        if(Loggeduser != "")
        {
            var En_tokenID = getCookie('tId');
            setMenuAdFrameset(En_tokenID,Loggeduser);
        }    
}

function setForgotPasswordPage()
{
    document.getElementById("userIdentity").focus();
    
}

function setJoinPage()
{
    document.getElementById("Fullname").focus();
}

function setPostPage()
{
    document.getElementById("Newsurl").focus();
}


function changeStarOnmouseOver(starId,rowSerial)
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


function changeStarOnmouseOut(starId,rowSerial)
{
    var subRatingId0_5,subRatingId1_5,subRatingId2_5,subRatingId3_5,subRatingId4_5,subRatingId1,subRatingId2,subRatingId3,subRatingId4,subRatingId5;
    
    switch(starId)
    {
                
        case 5.0:
        {
            subRatingId5 = "rating_5.0" + "_" + rowSerial;
            document.getElementById(subRatingId5).src="../images/rating_off_right.gif";
            
        }    
        case 4.5:
        {
            subRatingId4_5 = "rating_4.5" + "_" + rowSerial;
            document.getElementById(subRatingId4_5).src="../images/rating_off_left.gif";
            
        }
        case 4.0:
        {
            subRatingId4 = "rating_4.0" + "_" + rowSerial;
            document.getElementById(subRatingId4).src="../images/rating_off_right.gif";
            
        }
        case 3.5:
        {
            subRatingId3_5 = "rating_3.5" + "_" + rowSerial;
            document.getElementById(subRatingId3_5).src="../images/rating_off_left.gif";
            
        }
        case 3.0:
        {
            subRatingId3 = "rating_3.0" + "_" + rowSerial;
            document.getElementById(subRatingId3).src="../images/rating_off_right.gif";
        }
        case 2.5:
        {
            subRatingId2_5 = "rating_2.5" + "_" + rowSerial;
            document.getElementById(subRatingId2_5).src="../images/rating_off_left.gif";
            
        }
        case 2.0:
        {
            subRatingId2 = "rating_2.0" + "_" + rowSerial;
            document.getElementById(subRatingId2).src="../images/rating_off_right.gif";
            
        }
        case 1.5:
        {
            subRatingId1_5 = "rating_1.5" + "_" + rowSerial;
            document.getElementById(subRatingId1_5).src="../images/rating_off_left.gif";
            
        }
        case 1.0:
        {
            subRatingId1 = "rating_1.0" + "_" + rowSerial;
            document.getElementById(subRatingId1).src="../images/rating_off_right.gif";
            
        }
        case 0.5:
        {
            subRatingId0_5 = "rating_0.5" + "_" + rowSerial;
            document.getElementById(subRatingId0_5).src="../images/rating_off_left.gif";
            
        }
        
    }
}


function verifyPhotoFile()
{
    var photofileName = document.getElementById("photofile").value;
    
    if(photofileName == "")
    {    
        document.getElementById("picturesubmitForm").action = "#";
    }
    else
        show_busy_icon();
}


function show_busy_icon()
{
    document.getElementById("outputmessage").innerHTML = "<img src=\"../images/wait.gif\" alt=\"\">";
}


function openFeedbackWindow()
{
    var tokenIdentifier = getCookie('tId');
    var feedbackLink = "../Html/Feedback.html?td=" + tokenIdentifier ;
    window.open(feedbackLink,"_blank"," left=350, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=700, height=210");
}

/*function openFAQWindow()
{
    var FAQLink = "../Html/FAQ.html" ;
    window.open(FAQLink,"_blank"," left=350, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=500, height=410");
    
}*/



function loadMenu()
{
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == 'oursocion@gmail.com')
    {    
        loadAdminMenu();
        return;
    }
    
    var facebookStatus = getCookie('ifbc');
    var uploadPhotoLink;
    
    if((facebookStatus == "false"))
    {
        uploadPhotoLink = "<tr><td  align=\"center\"><a id=\"uploadimageLink\" class=\"link\"  > <font  id=\"uploadphoto\" >Upload Photo</font></a></td></tr>" ;
    }
    else
    {
        uploadPhotoLink = "";
    }    
        
    
    document.getElementById("logindiv").innerHTML = 
               "<tbody>" + uploadPhotoLink +
               "<tr><td  align=\"center\" id=\"profile_picture\"></td></tr> \
               <tr><td  align=\"center\" nowrap=\"nowrap\"><font id=\"indexmessage\"></font></td></tr> \
               <tr><td nowrap=\"nowrap\"> \
                 <a id=\"inboxLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font  class=\"menuleftmargin\" >Inbox</font> \
              </a></td></tr> \
               <tr><td nowrap=\"nowrap\"> \
                    <a id=\"mynewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\"  >Postbox</font> \
            </a></td></tr> \
               <tr><td nowrap=\"nowrap\"><a id=\"topnewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\"  >Favourite Stories</font> \
            </a></td></tr> \
               <tr><td nowrap=\"nowrap\"><a id=\"sociontopnewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\"  >Top Stories</font> \
            </a></td></tr> \
               <tr><td nowrap=\"nowrap\"><a id=\"browsenewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\" >Browse Stories</font> \
            </a></td></tr> \
               <tr><td nowrap=\"nowrap\"><a id=\"postnewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\" >Submit Story</font> \
            </a></td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"socionbuddiesLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\" >Socion Buddies</font> \
            </a></td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"changePasswordLink\"  class=\"link1\" onmouseover=\"this.style.backgroundColor='#FF66FF';\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                <font class=\"menuleftmargin\">Change Password</font> \
            </a></td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"introLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\" >Logout</font> \
            </a></td></tr> \
            </tbody>";
    setFromIndexPageLinks(); 
    setWelcomeMessage();
    
}

function loadIndexMenu(Page_type)
{
        document.getElementById("logindiv").innerHTML = 
            "<tbody>" +
            
            "<tr><td nowrap=\"nowrap\" align=\"center\"><a href =\"./index.html\"> \
            <img src=\"../images/home.gif\" border=\"0\" alt=\"Socion home\" > \
            </a> </td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"sociontopnewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\"  >Top Stories</font> \
            </a></td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"browsenewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\" >Recent Stories</font> \
            </a></td></tr> \
            </tbody>";

            document.getElementById("sociontopnewsLink").href = "Continue_Unregistered_Top.html" + "?ct=All";
            document.getElementById("browsenewsLink").href = "Continue_Unregistered.html" + "?ct=All";

            if(Page_type == 'Browse' || Page_type == 'Top')
                setPageLinks(Page_type); 
    
}

function setPageLinks(Page_type)
{
    
    document.getElementById("Searchnews").focus();
    
    if(Page_type == 'Browse')
    {    
    
        document.getElementById("allCategory").href = "Continue_Unregistered.html" + "?ct=All";
        document.getElementById("videoCategory").href = "Continue_Unregistered.html" + "?ct=Video";
        document.getElementById("pictureCategory").href = "Continue_Unregistered.html" + "?ct=Picture";
        document.getElementById("blogCategory").href = "Continue_Unregistered.html" + "?ct=Blog";
        document.getElementById("comedyCategory").href = "Continue_Unregistered.html" + "?ct=Comedy";
        document.getElementById("worldNewsCategory").href = "Continue_Unregistered.html" + "?ct=World News";
        document.getElementById("businessCategory").href = "Continue_Unregistered.html"  + "?ct=Business";
        document.getElementById("techCategory").href = "Continue_Unregistered.html" + "?ct=Science/Technology";
        document.getElementById("healthCategory").href = "Continue_Unregistered.html" + "?ct=Health";
        document.getElementById("styleCategory").href = "Continue_Unregistered.html"  + "?ct=Lifestyle";
        document.getElementById("politicsCategory").href = "Continue_Unregistered.html"  + "?ct=Politics";
        document.getElementById("entertainmentCategory").href = "Continue_Unregistered.html" + "?ct=Entertainment";
        document.getElementById("natureCategory").href = "Continue_Unregistered.html" + "?ct=Nature";
        document.getElementById("gamingCategory").href = "Continue_Unregistered.html" + "?ct=Gaming";
        document.getElementById("cultureCategory").href = "Continue_Unregistered.html" + "?ct=Culture";
        document.getElementById("travelCategory").href = "Continue_Unregistered.html"  + "?ct=Travel";
        document.getElementById("sportsCategory").href = "Continue_Unregistered.html"  + "?ct=Sports";
        document.getElementById("otherCategory").href = "Continue_Unregistered.html"  + "?ct=Other";
    }
    
    if(Page_type == 'Top')
    {
        document.getElementById("allCategory").href = "Continue_Unregistered_Top.html" + "?ct=All";
        document.getElementById("videoCategory").href = "Continue_Unregistered_Top.html" + "?ct=Video";
        document.getElementById("pictureCategory").href = "Continue_Unregistered_Top.html" + "?ct=Picture";
        document.getElementById("blogCategory").href = "Continue_Unregistered_Top.html" + "?ct=Blog";
        document.getElementById("comedyCategory").href = "Continue_Unregistered_Top.html" + "?ct=Comedy";
        document.getElementById("worldNewsCategory").href = "Continue_Unregistered_Top.html" + "?ct=World News";
        document.getElementById("businessCategory").href = "Continue_Unregistered_Top.html"  + "?ct=Business";
        document.getElementById("techCategory").href = "Continue_Unregistered_Top.html" + "?ct=Science/Technology";
        document.getElementById("healthCategory").href = "Continue_Unregistered_Top.html" + "?ct=Health";
        document.getElementById("styleCategory").href = "Continue_Unregistered_Top.html"  + "?ct=Lifestyle";
        document.getElementById("politicsCategory").href = "Continue_Unregistered_Top.html"  + "?ct=Politics";
        document.getElementById("entertainmentCategory").href = "Continue_Unregistered_Top.html" + "?ct=Entertainment";
        document.getElementById("natureCategory").href = "Continue_Unregistered_Top.html" + "?ct=Nature";
        document.getElementById("gamingCategory").href = "Continue_Unregistered_Top.html" + "?ct=Gaming";
        document.getElementById("cultureCategory").href = "Continue_Unregistered_Top.html" + "?ct=Culture";
        document.getElementById("travelCategory").href = "Continue_Unregistered_Top.html"  + "?ct=Travel";
        document.getElementById("sportsCategory").href = "Continue_Unregistered_Top.html"  + "?ct=Sports";
        document.getElementById("otherCategory").href = "Continue_Unregistered_Top.html"  + "?ct=Other";
    
    }    
}



function loadAdminMenu()
{
       document.getElementById("logindiv").innerHTML = 
               "<tbody> \
                <tr><td nowrap=\"nowrap\"> \
                 <a id=\"inboxLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font  class=\"menuleftmargin\">View Members</font> \
              </a></td></tr> \
               <tr><td nowrap=\"nowrap\"> \
                    <a id=\"mynewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\">Start DB server</font> \
            </a></td></tr> \
               <tr><td nowrap=\"nowrap\"><a id=\"topnewsLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\">Stop DB server</font> \
            </a></td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"changePasswordLink\"  class=\"link1\" onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                <font class=\"menuleftmargin\">Change Password</font> \
            </a></td></tr> \
            <tr><td nowrap=\"nowrap\"><a id=\"introLink\" class=\"link1\"  onmouseover=\"this.style.backgroundColor='#FF66FF'\" onmouseout=\"this.style.backgroundColor='#e6bfff'\"> \
                    <font class=\"menuleftmargin\" >Logout</font> \
            </a></td></tr> \
            </tbody>";

            setAdminPageLinks();
    
}



function loadBrowseNewsCategoryMenu()
{
    
    document.getElementById("Searchnews").focus();
    
    document.getElementById("allCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=All";
    document.getElementById("videoCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Video";
    document.getElementById("pictureCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Picture";
    document.getElementById("blogCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Blog";
    document.getElementById("comedyCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Comedy";
    document.getElementById("worldNewsCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=World News";
    document.getElementById("businessCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Business";
    document.getElementById("techCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Science/Technology";
    document.getElementById("healthCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Health";
    document.getElementById("styleCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Lifestyle";
    document.getElementById("politicsCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Politics";
    document.getElementById("entertainmentCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Entertainment";
    document.getElementById("natureCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Nature";
    document.getElementById("gamingCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Gaming";
    document.getElementById("cultureCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Culture";
    document.getElementById("travelCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Travel";
    document.getElementById("sportsCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Sports";
    document.getElementById("otherCategory").href = "Browse_News.html?td=" +  tokenID + "&ct=Other";
}


function loadTopNewsCategoryMenu()
{
    document.getElementById("allCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=All";
    document.getElementById("videoCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Video";
    document.getElementById("pictureCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Picture";
    document.getElementById("blogCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Blog";
    document.getElementById("comedyCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Comedy";
    document.getElementById("worldNewsCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=World News";
    document.getElementById("businessCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Business";
    document.getElementById("techCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Science/Technology";
    document.getElementById("healthCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Health";
    document.getElementById("styleCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Lifestyle";
    document.getElementById("politicsCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Politics";
    document.getElementById("entertainmentCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Entertainment";
    document.getElementById("natureCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Nature";
    document.getElementById("gamingCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Gaming";
    document.getElementById("cultureCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Culture";
    document.getElementById("travelCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Travel";
    document.getElementById("sportsCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Sports";
    document.getElementById("otherCategory").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=Other";
}




function retrieveNewsData(data)
{
    var ampersandindex = data.indexOf("AMPERSAND");
    var lessthanindex = data.indexOf("LESSTHAN");

    if(ampersandindex != -1)
        data = data.replace(/AMPERSAND/g,"&amp;") ;

    if(lessthanindex != -1)
        data = data.replace(/LESSTHAN/g,"&lt;");

    return data;
}




function setNewsData(data)
{
    
    var ampersandindex = data.indexOf("&");
    var lessthanindex = data.indexOf("<");

    if(ampersandindex != -1)
        data = data.replace(/&/g, "AMPERSAND") ;

    if(lessthanindex != -1)
        data = data.replace(/</g,"LESSTHAN");

    return data;

}



function trim(stringToTrim)
{
    if(stringToTrim != null)
        return stringToTrim.replace(/^\s+|\s+$/g,"");
    else
        return stringToTrim;
}


function reloadImg(id,src) 
{
   var obj = document.getElementById(id);
   var pos = src.indexOf('?');
   
   if (pos >= 0) 
   {
      src = src.substr(0, pos);
   }
   var date = new Date();
   obj.src = src + '?v=' + date.getTime();
   return false;
}



var resetMouseOutEventi1 = function()
{
    document.getElementById("topnewsLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi2 = function()
{
    document.getElementById("browsenewsLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi3 = function()
{
    document.getElementById("postnewsLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi4 = function()
{
    document.getElementById("socionbuddiesLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi5 = function()
{
    document.getElementById("changePasswordLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi6 = function()
{
    document.getElementById("introLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi7 = function()
{
    document.getElementById("mynewsLink").style.backgroundColor='#e6bfff';

};


var resetMouseOutEventi8 = function()
{
    document.getElementById("inboxLink").style.backgroundColor='#e6bfff';

};

var resetMouseOutEventi9 = function()
{
    document.getElementById("sociontopnewsLink").style.backgroundColor='#e6bfff';

};





function resetAllMenuBackgrounds()
{
    document.getElementById("topnewsLink").style.backgroundColor='#e6bfff';
    document.getElementById("sociontopnewsLink").style.backgroundColor='#e6bfff';
    document.getElementById("browsenewsLink").style.backgroundColor='#e6bfff';
    document.getElementById("postnewsLink").style.backgroundColor='#e6bfff';
    document.getElementById("socionbuddiesLink").style.backgroundColor='#e6bfff';
    document.getElementById("changePasswordLink").style.backgroundColor='#e6bfff';
    document.getElementById("introLink").style.backgroundColor='#e6bfff';
    document.getElementById("mynewsLink").style.backgroundColor='#e6bfff';
    document.getElementById("inboxLink").style.backgroundColor='#e6bfff';
}


function resetCategoryMenuBackgrounds()
{
    document.getElementById("allCategory").style.backgroundColor='#036';
    document.getElementById("videoCategory").style.backgroundColor='#036';
    document.getElementById("pictureCategory").style.backgroundColor='#036';
    document.getElementById("blogCategory").style.backgroundColor='#036';
    document.getElementById("comedyCategory").style.backgroundColor='#036';
    document.getElementById("worldNewsCategory").style.backgroundColor='#036';
    document.getElementById("businessCategory").style.backgroundColor='#036';
    document.getElementById("techCategory").style.backgroundColor='#036';
    document.getElementById("healthCategory").style.backgroundColor='#036';
    document.getElementById("styleCategory").style.backgroundColor='#036';
    document.getElementById("politicsCategory").style.backgroundColor='#036';
    document.getElementById("entertainmentCategory").style.backgroundColor='#036';
    document.getElementById("natureCategory").style.backgroundColor='#036';
    document.getElementById("gamingCategory").style.backgroundColor='#036';
    document.getElementById("cultureCategory").style.backgroundColor='#036';
    document.getElementById("travelCategory").style.backgroundColor='#036';
    document.getElementById("sportsCategory").style.backgroundColor='#036';
    document.getElementById("otherCategory").style.backgroundColor='#036';
}


function resetAllMenuonmouseEvents()
{
    var i1 = document.getElementById("topnewsLink");
    i1.setAttribute("onmouseout","javascript:resetMouseOutEventi1();");

    var i2 = document.getElementById("browsenewsLink");
    i2.setAttribute("onmouseout","javascript:resetMouseOutEventi2();");

    var i3 = document.getElementById("postnewsLink");
    i3.setAttribute("onmouseout","javascript:resetMouseOutEventi3();");

    var i4 = document.getElementById("socionbuddiesLink");
    i4.setAttribute("onmouseout","javascript:resetMouseOutEventi4();");

    var i5 = document.getElementById("changePasswordLink");
    i5.setAttribute("onmouseout","javascript:resetMouseOutEventi5();");

    var i6 = document.getElementById("introLink");
    i6.setAttribute("onmouseout","javascript:resetMouseOutEventi6();");

    var i7 = document.getElementById("mynewsLink");
    i7.setAttribute("onmouseout","javascript:resetMouseOutEventi7();");

    var i8 = document.getElementById("inboxLink");
    i8.setAttribute("onmouseout","javascript:resetMouseOutEventi8();");

    var i9 = document.getElementById("sociontopnewsLink");
    i9.setAttribute("onmouseout","javascript:resetMouseOutEventi9();");

}



function resetMenuBksAndEvents()
{
    resetAllMenuBackgrounds();
    resetAllMenuonmouseEvents()

}


function showClickedIndexMenuBlock(subCategory)
{
        switch(subCategory)
        {
            case 'All':
            {    
                document.getElementById("allCategory").style.backgroundColor='#369';
                break;
            }
            case 'Video':
            {    
                document.getElementById("videoCategory").style.backgroundColor='#369';
                break;
            }
            case 'Picture':
            {
                document.getElementById("pictureCategory").style.backgroundColor='#369';
                break;
            }
            case 'Blog':
            {
                document.getElementById("blogCategory").style.backgroundColor='#369';
                break;
            }
            case 'Comedy':
            {
                document.getElementById("comedyCategory").style.backgroundColor='#369';
                break;
            }
            case 'World News':
            {
                document.getElementById("worldNewsCategory").style.backgroundColor='#369';
                break;
            }    
            case 'Business':
            {
                document.getElementById("businessCategory").style.backgroundColor='#369';
                break;
            }
            case 'Science/Technology':
            {
                document.getElementById("techCategory").style.backgroundColor='#369';
                break;
            }    
            case 'Health':
            {
                document.getElementById("healthCategory").style.backgroundColor='#369';
                break;
            }
            case 'Lifestyle':
            {
                document.getElementById("styleCategory").style.backgroundColor='#369';
                break;
            }
            case 'Politics':
            {
                document.getElementById("politicsCategory").style.backgroundColor='#369';
                break;
            }
            case 'Entertainment':
            {
                document.getElementById("entertainmentCategory").style.backgroundColor='#369';
                break;
            }   
            case 'Nature':
            {
                document.getElementById("natureCategory").style.backgroundColor='#369';
                break;
            }
            case 'Gaming':
            {
                document.getElementById("gamingCategory").style.backgroundColor='#369';
                break;
            }
            case 'Culture':
            {
                document.getElementById("cultureCategory").style.backgroundColor='#369';
                break;
            }
            case 'Travel':
            {
                document.getElementById("travelCategory").style.backgroundColor='#369';
                break;
            }
            case 'Sports':
            {
                document.getElementById("sportsCategory").style.backgroundColor='#369';
                break;
            }
            case 'Other':
            {
                document.getElementById("otherCategory").style.backgroundColor='#369';
                break;
            }    

        }
    
}


function showClickedMenuBlock(id)
{
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == "oursocion@gmail.com")
        return;
    
    resetAllMenuBackgrounds();

    document.getElementById(id).style.backgroundColor='#FF66FF';

    resetAllMenuonmouseEvents();

    var i9 = document.getElementById(id);
    i9.setAttribute("onmouseout","");
    
    
    if((id=='browsenewsLink') || (id=='sociontopnewsLink'))
    {    
        var category = getParameterfromURL("ct");
        
        switch(category)
        {
            case 'All':
            {    
                document.getElementById("allCategory").style.backgroundColor='#369';
                break;
            }
            case 'Video':
            {    
                document.getElementById("videoCategory").style.backgroundColor='#369';
                break;
            }
            case 'Picture':
            {
                document.getElementById("pictureCategory").style.backgroundColor='#369';
                break;
            }
            case 'Blog':
            {
                document.getElementById("blogCategory").style.backgroundColor='#369';
                break;
            }
            case 'Comedy':
            {
                document.getElementById("comedyCategory").style.backgroundColor='#369';
                break;
            }
            case 'World News':
            {
                document.getElementById("worldNewsCategory").style.backgroundColor='#369';
                break;
            }    
            case 'Business':
            {
                document.getElementById("businessCategory").style.backgroundColor='#369';
                break;
            }
            case 'Science/Technology':
            {
                document.getElementById("techCategory").style.backgroundColor='#369';
                break;
            }    
            case 'Health':
            {
                document.getElementById("healthCategory").style.backgroundColor='#369';
                break;
            }
            case 'Lifestyle':
            {
                document.getElementById("styleCategory").style.backgroundColor='#369';
                break;
            }
            case 'Politics':
            {
                document.getElementById("politicsCategory").style.backgroundColor='#369';
                break;
            }
            case 'Entertainment':
            {
                document.getElementById("entertainmentCategory").style.backgroundColor='#369';
                break;
            }   
            case 'Nature':
            {
                document.getElementById("natureCategory").style.backgroundColor='#369';
                break;
            }
            case 'Gaming':
            {
                document.getElementById("gamingCategory").style.backgroundColor='#369';
                break;
            }
            case 'Culture':
            {
                document.getElementById("cultureCategory").style.backgroundColor='#369';
                break;
            }
            case 'Travel':
            {
                document.getElementById("travelCategory").style.backgroundColor='#369';
                break;
            }
            case 'Sports':
            {
                document.getElementById("sportsCategory").style.backgroundColor='#369';
                break;
            }
            case 'Other':
            {
                document.getElementById("otherCategory").style.backgroundColor='#369';
                break;
            }    

        }
    }    
}



function setMenuAdFrameset(tokenIdentifier,Loggeduser)
{
    //clearTimeout(sessionTimeout);
    //sessionTimeout = setTimeout("timedLogout();",(60000 * SESSION_TIMEOUT_MINS));

    if(Loggeduser == 'oursocion@gmail.com')
    {
        document.location = "Admin_main.html?td=" + tokenIdentifier ;
    }
    else
    {
        var readnews = getCookie('readnews');
        
        if(readnews == "false")
            document.location  = "Post_News.html?td=" + tokenIdentifier ;
    }
    
}


function timedLogout()
{
    alert("Current session is expired.. Please re-login to continue");
    javascript:logitout();
}



function getXMLHttpRequestObject()
{
    var xhttp;
    
    //clearTimeout(sessionTimeout);
    //sessionTimeout = setTimeout("timedLogout();",(60000 * SESSION_TIMEOUT_MINS));
    
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}


var logitout = function Logout()
{
    var Loggeduser = getCookie('Loggeduser');
    var facebookStatus = getCookie('ifbc');
    
    if((Loggeduser != "") && (facebookStatus == "false"))
    {    
        var url = "/Socion/resources/token";
        var xhttp = getXMLHttpRequestObject();

        var funct = function ()
        {
            if (xhttp.readyState==4)
            {
                if(xhttp.status == 200)
                {
                    var response = xhttp.responseText;

                    if( response == "0")
                    {
                        deleteAllCookies(Loggeduser);
                        //clearTimeout(sessionTimeout);
                        document.location = "index.html";
                    }
                }
            }
        };

        if(xhttp != null)
        {
            xhttp.onreadystatechange = funct;
            xhttp.open("PUT",url,false);
            xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
            xhttp.send();
        }
        else
            alert("Ajax functionality is not supported by your browser!");
    }
    else
    {  
        FB.logout();
    }
    
};


function deleteAllCookies(Loggeduser)
{
    if(Loggeduser == "oursocion@gmail.com")
        deleteCookie('dbServerStatus');

    deleteCookie('Loggeduser');
    deleteCookie('ifbc');
    deleteCookie('tId');
    deleteCookie('U_F');
    deleteCookie('M_P_S');
    deleteCookie('readnews');
}


function setAdminPageLinks()
{
    document.getElementById("inboxLink").href = "View_Members.html?td=" +  tokenID;
    document.getElementById("mynewsLink").href = "Admin_main.html?td=" + tokenID + "&op=start";
    document.getElementById("topnewsLink").href = "Admin_main.html?td=" + tokenID + "&op=stop";
    document.getElementById("changePasswordLink").href = "Change_Password.html?td=" +  tokenID;

    var foo = document.getElementById("introLink");
    
    foo.href = "#";
    foo.setAttribute("onclick","javascript:logitout();");
}


function setFromIndexPageLinks()
{
    var Loggeduser = getCookie('Loggeduser');
    var facebookStatus = getCookie('ifbc');
    
    if((facebookStatus == "false"))
    {
        document.getElementById("uploadimageLink").href = "Upload_Image.html?td=" +  tokenID;
    }
    
    document.getElementById("inboxLink").href = "View_News.html?td=" +  tokenID;
    document.getElementById("mynewsLink").href = "Specific_User.html?username=" + Loggeduser + "&td=" + tokenID;
    document.getElementById("topnewsLink").href = "Top_News.html?td=" +  tokenID;
    document.getElementById("sociontopnewsLink").href = "Socion_Top_News.html?td=" +  tokenID + "&ct=All";
    document.getElementById("browsenewsLink").href = "Browse_News.html?td=" +  tokenID + "&ct=All";
    document.getElementById("postnewsLink").href = "Post_News.html?td=" +  tokenID;
    document.getElementById("changePasswordLink").href = "Change_Password.html?td=" +  tokenID;
    document.getElementById("socionbuddiesLink").href = "Socion_Buddies.html?td=" +  tokenID;
    
    var foo = document.getElementById("introLink");

    foo.href = "#";
    foo.setAttribute("onclick","javascript:logitout();");

}





function goBack()
{
    window.history.back()
}


function setFromUploadPhotoHomeLink()
{
    var tokenIdentifier = getCookie('tId');
    document.getElementById("inboxLink").href = "../Html/View_News.html?td=" +  tokenIdentifier;
    
}


function setHomeLink()
{
    var tokenIdentifier = getCookie('tId');
    document.getElementById("submitLink").href = "../Html/Post_News.html?td=" +  tokenIdentifier;
    document.getElementById("submitLink1").href = "../Html/Post_News.html?td=" +  tokenIdentifier;
}

function setIndexHomeLink()
{
    document.getElementById("submitLink").href = "../Html/index.html";
    
}



function setFromUploadImageLinks()
{
    document.getElementById("picturesubmitForm").action = "../Servlet/UploadImage?td=" +  tokenID;
}

function getWelcomeMessageParameters(En_tokenID, Loggeduser)
{
    var url = "/Socion/resources/members/membername/" + Loggeduser;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            var xmlDoc = xhttp.responseXML;
            
            var readfirstName = xmlDoc.getElementsByTagName("firstName");
            var readphotouploadstatus = xmlDoc.getElementsByTagName("isImageUploaded");

            var Main_Submitter_FirstName = readfirstName[0].childNodes[0].nodeValue;
            var Member_Photo_Status = readphotouploadstatus[0].childNodes[0].nodeValue;
            
            setCookie('U_F',Main_Submitter_FirstName,1);
            setCookie('M_P_S',Member_Photo_Status,1);
        }
    };

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("GET",url,false);
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + En_tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is NOT supported by your browser!");
}


function setWelcomeMessage()
{
    var Loggeduser = getCookie('Loggeduser');
    var pngImageName = Loggeduser.replace(/\./g,"dot");
    
    document.getElementById("profile_picture").innerHTML = "<img id=\"profilepicid\" src=\"\" width=\"100\" height=\"100\" align=\"top\">";
    
    var Member_Photo_Status = getCookie('M_P_S');
    var Main_Submitter_FirstName = getCookie('U_F');
    
    if(Member_Photo_Status == "true")
    {    
        var profileImage = "../images/"  + pngImageName.toLowerCase() + ".png";
            
        reloadImg("profilepicid",profileImage) ;    
        
    }    
    else
        document.getElementById("profilepicid").src = "../images/no_photo.jpg" ;

    document.getElementById("profilepicid").border="2";
    document.getElementById("indexmessage").innerHTML =  "<b>Welcome " + Main_Submitter_FirstName + "<b>"; 
}


function SetPasswordPage()
{
    document.getElementById("username").value = getCookie('Loggeduser');
    document.getElementById("Curpasswd").focus();
}

function setFeedbackPage()
{
    document.getElementById("subject").focus();
}


function setContactusPage()
{
    
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactSubject").value = "";
    document.getElementById("contactMessage").value = "";
    
    document.getElementById("contactName").focus();
    
    var Loggeduser = getCookie('Loggeduser');
    document.getElementById("contactEmail").value = Loggeduser;
}


function SetconfigPage()
{
    var Loggeduser = getCookie('Loggeduser');
    
    var url = "/Socion/resources/members/" + Loggeduser;
    var xhttp = getXMLHttpRequestObject();

    var funct = function ()
    {
        if (xhttp.readyState==4 && xhttp.status == 200)
        {
            var xmlDoc = xhttp.responseXML;
            
            var responseagecoeff = xmlDoc.getElementsByTagName("ageCoefficient");
            var responseinboxCategoryList = xmlDoc.getElementsByTagName("inboxCategoryList");
            var responsenuminbox = xmlDoc.getElementsByTagName("inboxCount");
            var responsedatesetting = xmlDoc.getElementsByTagName("daysCount");

            document.getElementById("coeff").value = responseagecoeff[0].firstChild.nodeValue;

            if (responseinboxCategoryList[0].firstChild != null)
            {
                var inboxCategoryListArrayString =  responseinboxCategoryList[0].firstChild.nodeValue;
                var inboxCategoryListArray = new Array();

                inboxCategoryListArray = inboxCategoryListArrayString.split(",");

                for(var m=0 ; m < inboxCategoryListArray.length ; m++)
                {
                    var inboxCategoryListOption = inboxCategoryListArray[m];
                    addToinboxCategoryList(inboxCategoryListOption);

                }
            }

            document.getElementById("inbox").value = responsenuminbox[0].firstChild.nodeValue;
            document.getElementById("lastdays").value = responsedatesetting[0].firstChild.nodeValue;
            
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


function getStoryCategoryOptions()
{
    var x=document.getElementById("inboxCategoryList");
    var txt = "";

    for (var i=0;i<x.length;i++)
    {
        txt = txt + x.options[i].text + "," ;
    }

    return txt
}



function removeFrominboxCategoryList()
{
    var x = document.getElementById("inboxCategoryList");
    
    if(x.length == 1)
    {
        document.getElementById("outputmessage").innerHTML = "<b> Error! Category list should have at least one item.</b>";
        return;
    }
     
    x.remove(x.selectedIndex);
    document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! Category removed from Inbox </b>";

}


function textToinboxCategoryList()
{
    var inboxCategoryListOption =  document.getElementById("addinboxCategoryList").value;

    if(isValidOption(inboxCategoryListOption))
    {    
        addToinboxCategoryList(inboxCategoryListOption);
        document.getElementById("outputmessage").innerHTML = "<font color=\"#347235\">" + "<b> Success! Category added to Inbox </b>";

    }    
}


function addToinboxCategoryList(inboxCategoryListOption)
{
    var x = document.getElementById("inboxCategoryList");
    var option = document.createElement("option");
    option.text = inboxCategoryListOption;

    try
    {
        x.add(option,x.options[null]);

    }
    catch (e)
    {
        x.add(option,null);
    }
}


function isValidOption(inboxCategoryListOption)
{
    var x=document.getElementById("inboxCategoryList");

    for (var i=0;i<x.length;i++)
    {
        if(inboxCategoryListOption == x.options[i].text)
        {
            document.getElementById("outputmessage").innerHTML = "<b> Error! category already present in Inbox. </b>";
            return false;
        }    
    }

    return true;
}


function getCategoryColumn(News_Category)
{
    var categoryColumn = "";

    switch (News_Category)
    {
        case 'Video':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/video_icon.png\" title=\"Video\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Picture':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/picture_icon.jpg\" title=\"Picture\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Blog':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/blog_icon.jpg\" title=\"Blog\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Comedy':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/comedy_icon.jpg\" title=\"Comedy\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'World News':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/news_icon.jpg\" title=\"World News\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Business':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/business_icon.jpg\" title=\"Business\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Entertainment':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/entertainment_icon.jpg\" title=\"Entertainment\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Health':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/health_icon.jpg\" title=\"Health\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Lifestyle':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/lifestyle_icon.jpg\" title=\"Lifestyle\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Sports':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/sports_icon.jpg\" title=\"Sports\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Science/Technology':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/sci_tech_icon.jpg\" title=\"Science/Technology\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Politics':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/politics_icon.jpg\" title=\"Politics\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Nature':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/nature_icon.jpg\" title=\"Nature\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Travel':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/travel_icon.jpg\" title=\"Travel\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Culture':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/culture_icon.jpg\" title=\"Culture\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Gaming':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/gaming_icon.jpg\" title=\"Gaming\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        case 'Other':
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/other_icon.jpg\" title=\"Other\" width=\"50\" height=\"50\" align=\"center\">";
            break;
        }
        default:
        {
            categoryColumn = "<td width=\"50px\">" + "<img src=\"../images/no_image.jpg\" width=\"50\" height=\"50\" align=\"center\">";
            break;

        }
    }
    return categoryColumn;

}





/*function trim(stringToTrim)
{
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}*/



function getParameterfromURL(name)
{
    var start = location.search.indexOf("?"+name+"=");
    if (start < 0)
        start = location.search.indexOf("&"+name+"=");
    if (start < 0)
        return '';

    start += name.length+2;

    var end = location.search.indexOf("&",start)-1;

    if (end < 0)
        end = location.search.length;

    var result = '';

    for(var i=start; i<=end; i++)
    {

        var c = location.search.charAt(i);
        result = result + (c=='+'?' ':c);

    }
    return unescape(result);
}




Array.prototype.unique = function ()
{
    var r = new Array();
    o:for(var i = 0, n = this.length; i < n; i++)
    {
        for(var x = 0, y = r.length; x < y; x++)
        {
            if(r[x]==this[i])
            {
                continue o;
            }
        }
        r[r.length] = this[i];
    }
    return r;
}



function getLocalDateTime(dateposted)
{
    var day1 = dateposted.substring (0, dateposted.indexOf ("/"));
    var month1 = dateposted.substring (dateposted.indexOf ("/")+1, dateposted.lastIndexOf ("/"));
    var year1 = dateposted.substring (dateposted.lastIndexOf ("/")+1, dateposted.indexOf (" "));
    var hour1 = dateposted.substring (dateposted.indexOf (" ")+1,dateposted.indexOf (":"));
    var min1 = dateposted.substring (dateposted.indexOf (":")+1,dateposted.lastIndexOf (":"));
    var sec1 = dateposted.substring (dateposted.lastIndexOf (":")+1,dateposted.length );

    var date1 = year1+"/"+month1+"/"+day1+" "+hour1+":"+min1+":"+sec1;
    
    
    var serverDateMilliSecs = Date.parse(date1);

    var d = new Date()
    var offsetMillis = d.getTimezoneOffset() * 60 * 1000;

    var localDateMillisecs =  serverDateMilliSecs + (offsetMillis * -1);

    d = new Date();
    d.setTime(localDateMillisecs);
    
    var day   = d.getDate();
    var month = d.getMonth();
    var year  = d.getYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    
    month = month + 1;
    if(year < 2000) {year = year + 1900;}
    
    var localDateTime = day+"/"+month+"/"+year+" "+hour+":"+min+":"+sec;
    
    return localDateTime; 
}



function datediffsecs(dateposted)
{
    var day1, day2;
    var month1, month2;
    var year1, year2;
    var hour1, hour2;
    var min1, min2;
    var sec1, sec2;

    var now  = new Date();

    day2   = now.getDate();
    month2 = now.getMonth();
    year2  = now.getYear();
    hour2 = now.getHours();
    min2 = now.getMinutes();
    sec2 = now.getSeconds();

    month2 = month2 + 1;
    if(year2 < 2000) {year2 = year2 + 1900;}


    day1 = dateposted.substring (0, dateposted.indexOf ("/"));
    month1 = dateposted.substring (dateposted.indexOf ("/")+1, dateposted.lastIndexOf ("/"));
    year1 = dateposted.substring (dateposted.lastIndexOf ("/")+1, dateposted.indexOf (" "));
    hour1 = dateposted.substring (dateposted.indexOf (" ")+1,dateposted.indexOf (":"));
    min1 = dateposted.substring (dateposted.indexOf (":")+1,dateposted.lastIndexOf (":"));
    sec1 = dateposted.substring (dateposted.lastIndexOf (":")+1,dateposted.length );

    var date1 = year1+"/"+month1+"/"+day1+" "+hour1+":"+min1+":"+sec1;
    var date2 = year2+"/"+month2+"/"+day2+" "+hour2+":"+min2+":"+sec2;

    var firstDate = Date.parse(date1);
    var secondDate= Date.parse(date2);

    var msPerSec = 1000;
    var dbd = Math.round((secondDate.valueOf() - firstDate.valueOf())/ msPerSec);

    return dbd ;
}


function convertDateToTimeUnit(datePosted)
{
    
    var dateInTimeUnit;
    var datePostedSecs = datediffsecs(datePosted);
    
    if(datePostedSecs < 60)
        dateInTimeUnit = datePostedSecs + " seconds ago";
    else if(datePostedSecs < 3600)
    {
            var datePostedMins = datePostedSecs/60;
            datePostedMins = Math.floor(datePostedMins);
            
            if(datePostedMins == 1)
                dateInTimeUnit = datePostedMins + " minute ago";
            else
                dateInTimeUnit = datePostedMins + " minutes ago";
    }
    else if(datePostedSecs < 86400)
    {        
            var datePostedHours = datePostedSecs/3600;
            datePostedHours = Math.floor(datePostedHours);
            
            if(datePostedHours == 1)
                dateInTimeUnit = "about an hour ago";
            else
                dateInTimeUnit = datePostedHours + " hours ago ";
    }       
    else
        dateInTimeUnit = extractDate(datePosted);
    
    return dateInTimeUnit;
    
}



function extractDate(datePosted)
{
   var day = datePosted.substring (0, datePosted.indexOf ("/"));
   var month = datePosted.substring (datePosted.indexOf ("/")+1, datePosted.lastIndexOf ("/"));
   var monthString;
   
   month = parseInt(month, 10);
   
   switch(month)
   {
       case 1:
       {    
           monthString = "January"
           break;
       }
       case 2:
       {    
           monthString = "February"
           break;
       }
       case 3:
       {    
           monthString = "March"
           break;
       }
       case 4:
       {    
           monthString = "April"
           break;
       }
       case 5:
       {    
           monthString = "May"
           break;
       }
       case 6:
       {    
           monthString = "June"
           break;
       }
       case 7:
       {    
           monthString = "July"
           break;
       }
       case 8:
       {    
           monthString = "August"
           break;
       }
       case 9:
       {    
           monthString = "September"
           break;
       }
       case 10:
       {    
           monthString = "October"
           break;
       }
       case 11:
       {    
           monthString = "November"
           break;
       }
       case 12:
       {    
           monthString = "December"
           break;
       }

   }
   
   var year = datePosted.substring (datePosted.lastIndexOf ("/")+1, datePosted.indexOf (" ")); 
   
   var datePart = day+" "+monthString+" "+year;
   
   return datePart;
    
}



function datediffdays(dateposted,datesetting)
{
    var day1, day2;
    var month1, month2;
    var year1, year2;
    var hour1, hour2;
    var min1, min2;
    var sec1, sec2;


    var now  = new Date();

    day1 = dateposted.substring (0, dateposted.indexOf ("/"));
    month1 = dateposted.substring (dateposted.indexOf ("/")+1, dateposted.lastIndexOf ("/"));
    year1 = dateposted.substring (dateposted.lastIndexOf ("/")+1, dateposted.indexOf (" "));
    hour1 = dateposted.substring (dateposted.indexOf (" ")+1,dateposted.indexOf (":"));
    min1 = dateposted.substring (dateposted.indexOf (":")+1,dateposted.lastIndexOf (":"));
    sec1 = dateposted.substring (dateposted.lastIndexOf (":")+1,dateposted.length );


    day2 = datesetting.substring (0, datesetting.indexOf ("/"));
    month2 = datesetting.substring (datesetting.indexOf ("/")+1, datesetting.lastIndexOf ("/"));
    year2 = datesetting.substring (datesetting.lastIndexOf ("/")+1, datesetting.indexOf (" "));
    hour2 = datesetting.substring (datesetting.indexOf (" ")+1,datesetting.indexOf (":"));
    min2 = datesetting.substring (datesetting.indexOf (":")+1,datesetting.lastIndexOf (":"));
    sec2 = datesetting.substring (datesetting.lastIndexOf (":")+1,datesetting.length );

    var date1 = year1+"/"+month1+"/"+day1+" "+hour1+":"+min1+":"+sec1;
    var date2 = year2+"/"+month2+"/"+day2+" "+hour2+":"+min2+":"+sec2;

    var firstDate = Date.parse(date1);
    var secondDate= Date.parse(date2);

    var msPerDay = 24 * 60 * 60 * 1000;
    var dbd = (secondDate.valueOf()-firstDate.valueOf()) / msPerDay;

    return dbd ;
}


function getPreviousDate(days)
{
    var diff_dat = new Date();

    diff_dat.setDate(diff_dat.getDate()- days);

    
    var dateString = diff_dat.getDate() +"/" + (diff_dat.getMonth()+1) + "/" + diff_dat.getFullYear()+ " " + diff_dat.getHours() + ":" + diff_dat.getMinutes() + ":" + diff_dat.getSeconds();
 
    return dateString ;

}




function setCookie(c_name,value,expiredays)
{
    //var exdate=new Date();
    //exdate.setDate(exdate.getDate() + expiredays);
    //var expvar = (expiredays==null) ? "" : "; expires=" + exdate.toGMTString();
    
    // Do not set cookie expiry date to automatically delete cookies on browser close
    
    var expvar = "";
    document.cookie=c_name + "=" + escape(value) + expvar + "; path=/";
}




function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(c_name + "=");

        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);

            if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}



function deleteCookie(name)
{
    if(getCookie(name))
    {
        setCookie(name, '', -30);
    }
}



function getCurrentDateTime()
{
    var now = new Date();

    var monthnumber = now.getMonth();
    var monthday = now.getDate();
    var year = now.getYear();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    monthnumber = monthnumber + 1;

    if(year < 2000) {year = year + 1900;}

    if (monthnumber < 10)
        monthnumber = "0" + monthnumber;

    if (monthday < 10)
        monthday = "0" + monthday;

    if (hour < 10)
        hour = "0" + hour;

    if (min < 10)
        min = "0" + min;

    if (sec < 10)
        sec = "0" + sec;


    var currentDateTime = monthday + "/" + monthnumber + "/" + year + " " + hour + ":" + min + ":" + sec ;

    return currentDateTime;

}


function updateOutboxforLoggeduser(articleID)
{
    
    var Loggeduser = getCookie('Loggeduser');
    var tokenIdentifier = getCookie('tId');

    var xhttp = getXMLHttpRequestObject();
    var url = "/Socion/resources/outbox/" + Loggeduser + "?ds=OutboxInbox" ;

    var newarticleid = articleID.toString();

    if(xhttp != null)
    {
        xhttp.open("PUT",url,false);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenIdentifier + ";loggedUser=" + Loggeduser); 
        
        xhttp.send(newarticleid);

    }
    else
        alert("Ajax functionality is not supported by your browser!");
    
}


function shareStory(clicked_row,StorysharesCount)
{

    var aID = document.getElementsByTagName("aID");
    var articleId = aID[clicked_row].firstChild.value;

    updateOutboxforLoggeduser(articleId);

    StorysharesCount = StorysharesCount + 1;
    SH = document.getElementsByTagName("SH");
    SH[clicked_row].innerHTML = "<small>Shares(" + StorysharesCount + ")</small>";

}


function getUserOutbox()
{
    var Loggeduser = getCookie('Loggeduser');
    var tokenIdentifier = getCookie('tId');
    var xhttp = getXMLHttpRequestObject();

    var url = "/Socion/resources/outbox/" + Loggeduser;

    if(xhttp != null)
    {
        xhttp.open("GET",url,false);
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenIdentifier + ";loggedUser=" + Loggeduser); 
        xhttp.send();
    }
    else
        alert("Ajax functionality is not supported by your browser!");

    var xmlDoc = xhttp.responseXML;

    var readinboxoutboxarticleids = xmlDoc.getElementsByTagName("outboxInbox");
    var userOutboxInboxArray = new Array();

    if(readinboxoutboxarticleids[0].firstChild != null )
    {
        var userOutboxInbox = readinboxoutboxarticleids[0].firstChild.nodeValue;
        userOutboxInboxArray =  userOutboxInbox.split(",");
    }

    return userOutboxInboxArray;

}



function checkPageValidity()
{
    var membername = getCookie('Loggeduser');
    
    if((membername == "") || (tokenID == ""))
    {
        document.location = "index.html";
    }
    else
    {
        if(tokenID != "")
        {
            var url = "/Socion/resources/token/pageValidity?td=" + tokenID;
            var xhttp = getXMLHttpRequestObject();

            var funct = function ()
            {
                if (xhttp.readyState==4)
                {
                    if(xhttp.status == 200)
                    {
                        var response = xhttp.responseText;

                        if( response == "1")
                        {
                            deleteAllCookies(membername);
                            
                            document.location = "index.html";
                        }
                    }
                }
            };


            if(xhttp != null)
            {
                xhttp.onreadystatechange = funct;
                
                xhttp.open("GET",url,true);
                xhttp.send();
            }
            else
                alert("Ajax functionality is not supported by your browser!");

        }
    }
}

