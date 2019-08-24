tokenID = getParameterfromURL("td");


function setAllStarMouseEvents(rowSerial)
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
    i0_5.setAttribute("onclick","postRatings(0.5," + rowSerial + ");");
    i0_5.setAttribute("onmouseout","changeStarOnmouseOut(0.5," + rowSerial + ");");
    i0_5.setAttribute("onmouseover","changeStarOnmouseOver(0.5," + rowSerial + ");");
    i0_5.setAttribute("style","cursor:pointer");
    
    var i1 = document.getElementById(subRatingId1);
    i1.setAttribute("onclick","postRatings(1," + rowSerial + ");");
    i1.setAttribute("onmouseout","changeStarOnmouseOut(1," + rowSerial + ");");
    i1.setAttribute("onmouseover","changeStarOnmouseOver(1," + rowSerial + ");");
    i1.setAttribute("style","cursor:pointer");
    
    var i1_5 = document.getElementById(subRatingId1_5);
    i1_5.setAttribute("onclick","postRatings(1.5," + rowSerial + ");");
    i1_5.setAttribute("onmouseout","changeStarOnmouseOut(1.5," + rowSerial + ");");
    i1_5.setAttribute("onmouseover","changeStarOnmouseOver(1.5," + rowSerial + ");");
    i1_5.setAttribute("style","cursor:pointer");
    
    var i2 = document.getElementById(subRatingId2);
    i2.setAttribute("onclick","postRatings(2," + rowSerial + ");");
    i2.setAttribute("onmouseout","changeStarOnmouseOut(2," + rowSerial + ");");
    i2.setAttribute("onmouseover","changeStarOnmouseOver(2," + rowSerial + ");");
    i2.setAttribute("style","cursor:pointer");
    
    var i2_5 = document.getElementById(subRatingId2_5);
    i2_5.setAttribute("onclick","postRatings(2.5," + rowSerial + ");");
    i2_5.setAttribute("onmouseout","changeStarOnmouseOut(2.5," + rowSerial + ");");
    i2_5.setAttribute("onmouseover","changeStarOnmouseOver(2.5," + rowSerial + ");");
    i2_5.setAttribute("style","cursor:pointer");
    
    var i3 = document.getElementById(subRatingId3);
    i3.setAttribute("onclick","postRatings(3," + rowSerial + ");");
    i3.setAttribute("onmouseout","changeStarOnmouseOut(3," + rowSerial + ");");
    i3.setAttribute("onmouseover","changeStarOnmouseOver(3," + rowSerial + ");");
    i3.setAttribute("style","cursor:pointer");
    
    var i3_5 = document.getElementById(subRatingId3_5);
    i3_5.setAttribute("onclick","postRatings(3.5," + rowSerial + ");");
    i3_5.setAttribute("onmouseout","changeStarOnmouseOut(3.5," + rowSerial + ");");
    i3_5.setAttribute("onmouseover","changeStarOnmouseOver(3.5," + rowSerial + ");");
    i3_5.setAttribute("style","cursor:pointer");
    
    var i4 = document.getElementById(subRatingId4);
    i4.setAttribute("onclick","postRatings(4," + rowSerial + ");");
    i4.setAttribute("onmouseout","changeStarOnmouseOut(4," + rowSerial + ");");
    i4.setAttribute("onmouseover","changeStarOnmouseOver(4," + rowSerial + ");");
    i4.setAttribute("style","cursor:pointer");
    
    var i4_5 = document.getElementById(subRatingId4_5);
    i4_5.setAttribute("onclick","postRatings(4.5," + rowSerial + ");");
    i4_5.setAttribute("onmouseout","changeStarOnmouseOut(4.5," + rowSerial + ");");
    i4_5.setAttribute("onmouseover","changeStarOnmouseOver(4.5," + rowSerial + ");");
    i4_5.setAttribute("style","cursor:pointer");
    
    var i5 = document.getElementById(subRatingId5);
    i5.setAttribute("onclick","postRatings(5," + rowSerial + ");");
    i5.setAttribute("onmouseout","changeStarOnmouseOut(5," + rowSerial + ");");
    i5.setAttribute("onmouseover","changeStarOnmouseOver(5," + rowSerial + ");");
    i5.setAttribute("style","cursor:pointer");        
}



function resetAllStarOnmouseEvents(rowSerial)
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



function setStarRating(starId,rowSerial)
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


function postRatings(starScore,j)
{
    var Loggeduser = getCookie('Loggeduser');

    var aID = document.getElementsByTagName("aID");
    
    setStarRating(starScore,j);
    resetAllStarOnmouseEvents(j);
    
    var ratedto = aID[j].firstChild.value;
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
                
                currentAvgRating = parseFloat(currentAvgRating) * 2; 
                
                var newtotalvotes = parseInt(currentTotalvotes) + 1;
                tv[j].innerHTML =   newtotalvotes;
                
                var newAvgRating = ((parseFloat(currentAvgRating) * parseInt(currentTotalvotes))+ parseFloat(ratedscore)) / parseInt(newtotalvotes);
                avgRate[j].innerHTML =   (parseFloat(newAvgRating / 2)).toFixed(1) + " Star";
                
            }
        }
    };
    

    if(xhttp != null)
    {
        xhttp.onreadystatechange = funct;
        xhttp.open("POST",url,true);
        xhttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        xhttp.setRequestHeader('Cookies', "En_tokenID=" + tokenID + ";loggedUser=" + Loggeduser); 
        xhttp.send(ReqXML);
    }
    else
        alert("Ajax functionality is not supported by your browser!");

}



function getratingsList()
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
            
            var aID = document.getElementsByTagName("aID");
            var isArticleRated;

            for(var j=0; j<aID.length; j++)
            {
                isArticleRated = false;

                for (var i=0; i<responseratedto.length; i++)
                {
                    var ratedArticleId = responseratedto[i].childNodes[0].nodeValue; 
                    
                    if(ratedArticleId == aID[j].firstChild.value)
                    {
                        var ratedScore = (responseratedscore[i].childNodes[0].nodeValue / 2);
                        ratedScore = parseFloat(ratedScore.toFixed(1));
                        setStarRating(ratedScore,j);
                        isArticleRated = true;
                        break;
                    }
                }
                
                if(isArticleRated == false)
                    setAllStarMouseEvents(j);
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