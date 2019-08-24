package Story;


import Util.XMLUtilities;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ReadArticle extends HttpServlet 
{
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String articleId = request.getParameter("aid");
        
        try 
        {
            out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Socion Read Article</title>");   
            out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"../CSS/Socion.css\">");
            out.println("<link rel=\"shortcut icon\" href=\"../images/favicon.ico\">");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/readArticle.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/util.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/support.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/Base64.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/facebookUser.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/facebookLogout.js\"></script>");
            out.println("</head>");
            out.println("<body style=\"background-image: none;\" onload=\"setHomeLink();\">");
            out.println("<div id=\"fb-root\"></div>");
            
            
            out.println("<script type=\"text/javascript\" language=\"javascript\">");
            out.println("window.fbAsyncInit = function() {");
            out.println("var uid ;    var accessToken;    var userEmail;    var userName;");
            out.println("FB.init({appId : '348144888569229',status: true,cookie: true,xfbml: true, oauth: true });");
            out.println("FB.getLoginStatus(function(loginResponse) {");
            out.println("if (loginResponse.status === 'connected') {");
            out.println("var Loggeduser = getCookie('Loggeduser')");
            out.println("if (Loggeduser == \"\") {");
            out.println("uid = loginResponse.authResponse.userID;");
            out.println("accessToken = loginResponse.authResponse.accessToken;");
            out.println("var ismeeventfired = false;");
            out.println("FB.api('/me', function(apiresponse) { ");
            out.println("userEmail = apiresponse.email;");
            out.println("userName = apiresponse.name;");
            out.println("if(ismeeventfired == false) {");
            out.println("ismeeventfired = true;");
            out.println(" setCookie('readnews',\"true\",1); createFacebookUser(uid,userName,userEmail,accessToken); showNewsinfo();}});} else showNewsinfo();}");
            out.println("else if (loginResponse.status === 'not_authorized') {  ");
            out.println("var articleId = getParameterfromURL(\"aid\")");
            out.println("document.location  = \"https://www.facebook.com/dialog/oauth/?client_id=348144888569229&redirect_uri=http://192.168.1.67:8080/Story/ReadArticle?aid=\" + articleId + \"&scope=email,publish_actions\" ");
            out.println("} else {if (Loggeduser != \"\") showNewsinfo();}});};");
            out.println("(function(d){ var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;} js = d.createElement('script'); js.id = id; js.async = true;");
            out.println("js.src = \"//connect.facebook.net/en_US/all.js\";    d.getElementsByTagName('head')[0].appendChild(js);     }(document)); </script>");
            
            out.println("<div id=\"maintablewrap\">");
            out.println("<table id=\"maintable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">");
            out.println("<tbody>");
            out.println("<tr class=\"readnewsheading\" align=\"center\">");
            out.println("<td align=\"left\" width=\"10%\"><a id=\"submitLink\"><img src=\"../images/Social.jpg\" border=\"0\" width=\"75\" height=\"75\" alt=\"social media\" style=\"margin-left: 35px;\"></a></td>");
            out.println("<td align=\"center\" width=\"15%\"><a id=\"submitLink1\"><img src=\"../images/socionLogo.png\" height=\"75\" width=\"75%\" border=\"0\" alt=\"Socion\" ></a></td>");
            //out.println("<td><table border=\"0\" id=\"newsdetailsTable\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"> <tr><td></td></tr></table></td>");
            out.println("<td><div id=\"newsdetailsTablewrapper\"></div></td>");
            out.println("<td valign=\"top\"><a href =\"" + XMLUtilities.getUrlForArticleId(articleId) +"\" id=\"closebutton\"></a></td></tr>");

            out.println("<tr>");
            out.println("<td align=\"center\" width=\"100%\" colspan=\"4\" height=\"88%\">" + XMLUtilities.getIframeForArticle(articleId) + "</td></tr>");

            /*out.println("<tr align=\"center\" bgcolor=\"white\" id=\"copyrightmessage\">");
            out.println("<td class=\"smallmenulable\" colspan=\"3\">");
            out.println("<ul id=\"footercontainer\">");
            out.println("<li>&copy; 2012 by oursocion.com All Rights Reserved</li>");
            out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFAQWindow()\">FAQ</a></li>");
            out.println("<li><a href=\"../Html/About_us.html\" class=\"link\">About Socion</a></li>");
            out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFeedbackWindow()\">Give us feedback</a></li>");
            out.println("</ul></td></tr>");*/
            out.println("</tbody></table></div>");
            out.println("</body>");
            out.println("</html>");
        } 
        finally 
        {            
            out.close();
        }
    }

 
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
        processRequest(request, response);
    }
    
    
    

}
