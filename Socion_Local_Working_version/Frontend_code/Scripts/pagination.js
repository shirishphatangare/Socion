
// Pagination for recent stories index page view

function displayPagination(pageCount)
{

    document.getElementById('navlistPage').innerHTML = "";
    var Loggeduser = getCookie('Loggeduser');

    if(pageCount <= 1)
    {
        return;
    }
    
    var currentPage = document.getElementById('pageNumber').value; 
    
        
        if(currentPage < 5)
        {    
            pageStart = 1;
            
            if(pageCount > 10)
                pageEnd = 10;
            else
                pageEnd = pageCount;
        }
        else
        {
            var pageStart = parseInt(currentPage) - 4;
            var pageEnd = parseInt(currentPage) + 5;
        
            if(pageEnd > pageCount)
            {    
                if(pageCount > 9)
                    pageStart = pageCount - 9;
                else
                    pageStart = 1;
                
                pageEnd = pageCount;
            } 
        }    
        
        
        var listString = "<li><a href=\"#\" onclick=\"firstPage()\">" + "<<" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"previousPage()\">" + "<" +"</a></li>\n" ;
        
        for(var i=pageStart;i<=pageEnd;i++)
        {
        
            if(Loggeduser == '')
                listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"document.getElementById('pageNumber').value='" + i + "'; selectStoryType();\">" + i +"</a></li>\n" ;
            else
                listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"document.getElementById('pageNumber').value='" + i + "'; Browse_news();\">" + i +"</a></li>\n" ;
        }

        listString = listString + "<li><a href=\"#\" onclick=\"nextPage(" + pageCount + ")\">" + ">" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"lastPage(" + pageCount + ")\">" + ">>" +"</a></li>\n" ;
    
        document.getElementById('navlistPage').innerHTML = listString; 

        
        
        for(i=pageStart;i<=pageEnd;i++)
        {
            if(i==currentPage)
            {    
                var pageItemId =  "pagelistItemId" + i ;
                document.getElementById(pageItemId).style.backgroundColor='red';
            }
        }
        
}


function nextPage(pageCount)
{
    var currentPage = document.getElementById('pageNumber').value; 
    
    
    if(currentPage == pageCount)
        return;
    
    document.getElementById('pageNumber').value  = parseInt(currentPage) + 1;
    
    var Loggeduser = getCookie('Loggeduser');
    if(Loggeduser == '')
        selectStoryType();
    else
        Browse_news();
}


function previousPage()
{
    var currentPage = document.getElementById('pageNumber').value; 
    
    if(currentPage == 1)
        return;
    
    document.getElementById('pageNumber').value  = parseInt(currentPage) - 1;
    
    var Loggeduser = getCookie('Loggeduser');
    if(Loggeduser == '')
        selectStoryType();
    else
        Browse_news();
    
}


function firstPage()
{
    var currentPage = document.getElementById('pageNumber').value; 
    
    if(currentPage == 1)
        return;
    
    document.getElementById('pageNumber').value  = 1;
    
    var Loggeduser = getCookie('Loggeduser');
    if(Loggeduser == '')
        selectStoryType();
    else
        Browse_news();
    
}



function lastPage(pageCount)
{
    var currentPage = document.getElementById('pageNumber').value; 
    
    if(currentPage == pageCount)
        return;
    
    document.getElementById('pageNumber').value  = pageCount;
    
    var Loggeduser = getCookie('Loggeduser');
    if(Loggeduser == '')
        selectStoryType();
    else
        Browse_news();
    
}


// Pagination for user specific index page view

function displayIndexPaginationForUser(fullname, username, currentPage,pageCount)
{

    document.getElementById('navlistPage').innerHTML = "";

    if(pageCount <= 1)
    {
        return;
    }
    
        if(currentPage < 5)
        {    
            pageStart = 1;
            
            if(pageCount > 10)
                pageEnd = 10;
            else
                pageEnd = pageCount;
        }
        else
        {
            var pageStart = parseInt(currentPage) - 4;
            var pageEnd = parseInt(currentPage) + 5;
        
            if(pageEnd > pageCount)
            {    
                if(pageCount > 9)
                    pageStart = pageCount - 9;
                else
                    pageStart = 1;
                
                pageEnd = pageCount;
            } 
        }    
        
        
        var listString = "<li><a href=\"#\" onclick=\"firstIndexPageForUser('" + fullname + "','" + username + "','" + currentPage + "')\">" + "<<" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"previousIndexPageForUser('" + fullname + "','" + username + "','" + currentPage + "')\">" + "<" +"</a></li>\n" ;
        
        for(var i=pageStart;i<=pageEnd;i++)
        {
        
            listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"getarticlesIndexList('" + fullname + "','" + username + "','" + i + "');\">" + i +"</a></li>\n" ;
        
        }

        listString = listString + "<li><a href=\"#\" onclick=\"nextIndexPageForUser('" + fullname + "','" + username + "','" + currentPage + "',"+ pageCount + ");\">" + ">" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"lastIndexPageForUser('" + fullname + "','" + username + "','" + currentPage + "'," + pageCount + ")\">" + ">>" +"</a></li>\n" ;
    
        document.getElementById('navlistPage').innerHTML = listString; 

        
        
        for(i=pageStart;i<=pageEnd;i++)
        {
            if(i==currentPage)
            {    
                var pageItemId =  "pagelistItemId" + i ;
                document.getElementById(pageItemId).style.backgroundColor='red';
            }
        }
        
}


function nextIndexPageForUser(fullname, username, currentPage,pageCount)
{
    if(currentPage == pageCount)
        return;
    
    var nxtPage = parseInt(currentPage) + 1;
    
    getarticlesIndexList(fullname, username, nxtPage);
    
}


function previousIndexPageForUser(fullname, username, currentPage)
{
    if(currentPage == 1)
        return;
    
    var previousPage = parseInt(currentPage) - 1;
    
    getarticlesIndexList(fullname, username, previousPage);
    
}


function firstIndexPageForUser(fullname, username, currentPage)
{
    if(currentPage == 1)
        return;
    
    getarticlesIndexList(fullname, username, '1');
    
}



function lastIndexPageForUser(fullname, username, currentPage,pageCount)
{
    if(currentPage == pageCount)
        return;
    
    getarticlesIndexList(fullname, username, pageCount);
    
}



// Pagination for user specific page view

function displayPaginationForUser(currentPage,pageCount)
{

    document.getElementById('navlistPage').innerHTML = "";

    if(pageCount <= 1)
    {
        return;
    }
    
        if(currentPage < 5)
        {    
            pageStart = 1;
            
            if(pageCount > 10)
                pageEnd = 10;
            else
                pageEnd = pageCount;
        }
        else
        {
            var pageStart = parseInt(currentPage) - 4;
            var pageEnd = parseInt(currentPage) + 5;
        
            if(pageEnd > pageCount)
            {    
                if(pageCount > 9)
                    pageStart = pageCount - 9;
                else
                    pageStart = 1;
                
                pageEnd = pageCount;
            } 
        }    
        
        var listString = "<li><a href=\"#\" onclick=\"firstPageForUser('" + currentPage + "')\">" + "<<" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"previousPageForUser('" + currentPage + "')\">" + "<" +"</a></li>\n" ;
        
        for(var i=pageStart;i<=pageEnd;i++)
        {
        
            listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"getarticlesList('" + i + "');\">" + i +"</a></li>\n" ;
        
        }

        listString = listString + "<li><a href=\"#\" onclick=\"nextPageForUser('" + currentPage + "',"+ pageCount + ");\">" + ">" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"lastPageForUser('" + currentPage + "'," + pageCount + ")\">" + ">>" +"</a></li>\n" ;
    
        document.getElementById('navlistPage').innerHTML = listString; 

        
        
        for(i=pageStart;i<=pageEnd;i++)
        {
            if(i==currentPage)
            {    
                var pageItemId =  "pagelistItemId" + i ;
                document.getElementById(pageItemId).style.backgroundColor='red';
            }
        }
        
}


function nextPageForUser(currentPage,pageCount)
{
    if(currentPage == pageCount)
        return;
    
    var nxtPage = parseInt(currentPage) + 1;
    
    getarticlesList(nxtPage);
    
}


function previousPageForUser(currentPage)
{
    if(currentPage == 1)
        return;
    
    var previousPage = parseInt(currentPage) - 1;
    
    getarticlesList(previousPage);
    
}


function firstPageForUser(currentPage)
{
    if(currentPage == 1)
        return;
    
    getarticlesList('1');
    
}



function lastPageForUser(currentPage,pageCount)
{
    if(currentPage == pageCount)
        return;
    
    getarticlesList(pageCount);
    
}



// Pagination for search stories page view

function displaySearchPagination(pageCount,currentPage)
{
    var Loggeduser = getCookie('Loggeduser');
    document.getElementById('navlistPage').innerHTML = "";

    if(pageCount <= 1)
    {
        return;
    }
    
        if(currentPage < 5)
        {    
            pageStart = 1;
            
            if(pageCount > 10)
                pageEnd = 10;
            else
                pageEnd = pageCount;
        }
        else
        {
            var pageStart = parseInt(currentPage) - 4;
            var pageEnd = parseInt(currentPage) + 5;
        
            if(pageEnd > pageCount)
            {    
                if(pageCount > 9)
                    pageStart = pageCount - 9;
                else
                    pageStart = 1;
                
                pageEnd = pageCount;
            } 
        }    


    var listString = "<li><a href=\"#\" onclick=\"firstSearchPage('" +currentPage+"');\">" + "<<" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"previousSearchPage('" +currentPage +"')\">" + "<" +"</a></li>\n" ;

    for(var i=pageStart;i<=pageEnd;i++)
    {

        if(Loggeduser == '')
            listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"searchIndexNews('" + i + "');\">" + i +"</a></li>\n" ;
        else
            listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"searchNews('" + i + "');\">" + i +"</a></li>\n" ;
    }

    listString = listString + "<li><a href=\"#\" onclick=\"nextSearchPage(" + pageCount + ",'"+currentPage + "')\">" + ">" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"lastSearchPage(" + pageCount + ",'"+currentPage +"')\">" + ">>" +"</a></li>\n" ;

    document.getElementById('navlistPage').innerHTML = listString; 



    for(i=pageStart;i<=pageEnd;i++)
    {
        if(i==currentPage)
        {    
            var pageItemId =  "pagelistItemId" + i ;
            document.getElementById(pageItemId).style.backgroundColor='red';
        }
    }
        
}


function nextSearchPage(pageCount,currentPage)
{
    if(currentPage == pageCount)
        return;
    
    var nxtPage = parseInt(currentPage) + 1;
    
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == '')
        searchIndexNews(nxtPage);
    else
        searchNews(nxtPage);
}


function previousSearchPage(currentPage)
{
    if(currentPage == 1)
        return;
    
    var previousPage = parseInt(currentPage) - 1;
    
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == '')
        searchIndexNews(previousPage);
    else
        searchNews(previousPage);
}


function firstSearchPage(currentPage)
{
    if(currentPage == 1)
        return;
    
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == '')
        searchIndexNews('1');
    else
        searchNews('1');
}



function lastSearchPage(pageCount,currentPage)
{
    if(currentPage == pageCount)
        return;
    
    var Loggeduser = getCookie('Loggeduser');
    
    if(Loggeduser == '')
        searchIndexNews(pageCount);
    else
        searchNews(pageCount);
}



// pagination for favourite stories page

function displayFavouriteArticlesPagination(pageCount,currentPage)
{
    document.getElementById('navlistPage').innerHTML = "";

    if(pageCount <= 1)
    {
        return;
    }
    
        if(currentPage < 5)
        {    
            pageStart = 1;
            
            if(pageCount > 10)
                pageEnd = 10;
            else
                pageEnd = pageCount;
        }
        else
        {
            var pageStart = parseInt(currentPage) - 4;
            var pageEnd = parseInt(currentPage) + 5;
        
            if(pageEnd > pageCount)
            {    
                if(pageCount > 9)
                    pageStart = pageCount - 9;
                else
                    pageStart = 1;
                
                pageEnd = pageCount;
            } 
        }    


    var listString = "<li><a href=\"#\" onclick=\"firstFavouriteArticlePage('" +currentPage+"');\">" + "<<" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"previousFavouriteArticlePage('" +currentPage +"')\">" + "<" +"</a></li>\n" ;

    for(var i=pageStart;i<=pageEnd;i++)
    {
         listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"Toprated('" + i + "');\">" + i +"</a></li>\n" ;
    }

    listString = listString + "<li><a href=\"#\" onclick=\"nextFavouriteArticlePage(" + pageCount + ",'"+currentPage + "')\">" + ">" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"lastFavouriteArticlePage(" + pageCount + ",'"+currentPage +"')\">" + ">>" +"</a></li>\n" ;

    document.getElementById('navlistPage').innerHTML = listString; 



    for(i=pageStart;i<=pageEnd;i++)
    {
        if(i==currentPage)
        {    
            var pageItemId =  "pagelistItemId" + i ;
            document.getElementById(pageItemId).style.backgroundColor='red';
        }
    }
        
}


function nextFavouriteArticlePage(pageCount,currentPage)
{
    if(currentPage == pageCount)
        return;
    
    var nxtPage = parseInt(currentPage) + 1;
    
    Toprated(nxtPage);
}


function previousFavouriteArticlePage(currentPage)
{
    if(currentPage == 1)
        return;
    
    var previousPage = parseInt(currentPage) - 1;
    
    Toprated(previousPage);
}


function firstFavouriteArticlePage(currentPage)
{
    if(currentPage == 1)
        return;
    
    Toprated('1');
}



function lastFavouriteArticlePage(pageCount,currentPage)
{
    if(currentPage == pageCount)
        return;
    
    Toprated(pageCount);
}



//Pagination for Inbox Page

function displayInboxPagination(pageCount,currentPage)
{
    document.getElementById('navlistPage').innerHTML = "";

    if(pageCount <= 1)
    {
        return;
    }
    
        if(currentPage < 5)
        {    
            pageStart = 1;
            
            if(pageCount > 10)
                pageEnd = 10;
            else
                pageEnd = pageCount;
        }
        else
        {
            var pageStart = parseInt(currentPage) - 4;
            var pageEnd = parseInt(currentPage) + 5;
        
            if(pageEnd > pageCount)
            {    
                if(pageCount > 9)
                    pageStart = pageCount - 9;
                else
                    pageStart = 1;
                
                pageEnd = pageCount;
            } 
        }    


    var listString = "<li><a href=\"#\" onclick=\"firstInboxArticlePage('" +currentPage+"');\">" + "<<" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"previousInboxArticlePage('" +currentPage +"')\">" + "<" +"</a></li>\n" ;

    for(var i=pageStart;i<=pageEnd;i++)
    {

         listString = listString + "<li><a id=\"pagelistItemId" + i + "\" href=\"#\" onclick=\"DisplayfreshInbox('" + i + "');\">" + i +"</a></li>\n" ;
    }

    listString = listString + "<li><a href=\"#\" onclick=\"nextInboxArticlePage(" + pageCount + ",'"+currentPage + "')\">" + ">" +"</a></li>\n" + "<li><a href=\"#\" onclick=\"lastInboxArticlePage(" + pageCount + ",'"+currentPage +"')\">" + ">>" +"</a></li>\n" ;

    document.getElementById('navlistPage').innerHTML = listString; 



    for(i=pageStart;i<=pageEnd;i++)
    {
        if(i==currentPage)
        {    
            var pageItemId =  "pagelistItemId" + i ;
            document.getElementById(pageItemId).style.backgroundColor='red';
        }
    }
        
}


function nextInboxArticlePage(pageCount,currentPage)
{
    if(currentPage == pageCount)
        return;
    
    var nxtPage = parseInt(currentPage) + 1;
    
    DisplayfreshInbox(nxtPage);
}


function previousInboxArticlePage(currentPage)
{
    if(currentPage == 1)
        return;
    
    var previousPage = parseInt(currentPage) - 1;
    
    DisplayfreshInbox(previousPage);
}


function firstInboxArticlePage(currentPage)
{
    if(currentPage == 1)
        return;
    
    DisplayfreshInbox('1');
}



function lastInboxArticlePage(pageCount,currentPage)
{
    if(currentPage == pageCount)
        return;
    
    DisplayfreshInbox(pageCount);
}
