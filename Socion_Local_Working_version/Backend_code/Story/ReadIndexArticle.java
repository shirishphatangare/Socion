package Story;


import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.WebApplicationException;
import model.ArticleVO;


public class ReadIndexArticle extends HttpServlet 
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
            out.println("<script type=\"text/javascript\" src=\"../Scripts/readIndexArticle.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/util.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/support.js\"></script>");
            out.println("<script type=\"text/javascript\" src=\"../Scripts/Base64.js\"></script>");
            out.println("</head>");
            out.println("<body style=\"background-image: none;\" onload=\"setIndexHomeLink(); showNewsinfo();\">");
            out.println("<div id=\"maintablewrap\">");
            out.println("<table id=\"maintable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">");
            out.println("<tbody>");
            out.println("<tr class=\"readnewsheading\" align=\"center\">");
            out.println("<td align=\"left\" width=\"10%\"><a id=\"submitLink\"><img src=\"../images/Social.jpg\" border=\"0\" width=\"75\" height=\"75\" alt=\"social media\" style=\"margin-left: 35px;\"></a></td>");
            out.println("<td align=\"center\" width=\"15%\"><a href =\"../Html/index.html\"><img src=\"../images/socionLogo.png\" border=\"0\" height=\"75\" width=\"75%\" alt=\"Socion\" ></a></td>");
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
            out.println("<li><a href=\"http://blog.oursocion.com\" class=\"link\" target=\"_blank\">Blog</a></li>");
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
