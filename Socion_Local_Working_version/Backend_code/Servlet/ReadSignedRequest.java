package Servlet;

import Util.FacebookRequest;
import Util.FacebookSignedRequest;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;

public class ReadSignedRequest extends HttpServlet 
{
    
    private static final String URI = "http://192.168.1.67:8080/resources/members/";
    private static final String CONTENT_TYPE = "application/xml";
    private static final String CHAR_ENCODING = "UTF-8";
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String signedRequest = request.getParameter("signed_request");
        PostMethod postMethod  = new PostMethod(URI);
        String xmldata = "";
        String outputMessage = "";
        boolean isSuccess = false;

        // Parse Facebook signed request to get the new User XML
        try
        {    
            FacebookRequest ret = new FacebookSignedRequest().parseSignedRequest(signedRequest);
            xmldata = ret.toXML();
            
            // Send input xml 
            postMethod.setRequestEntity(new StringRequestEntity(xmldata, CONTENT_TYPE, CHAR_ENCODING));

            HttpClient httpClient = new HttpClient();
            int statusCode = httpClient.executeMethod(postMethod);

            switch(statusCode)
            {
                case 200:
                    outputMessage =  "Success! New User Created" ;
                    isSuccess = true;
                    break;
                case 403:
                    outputMessage = "User already exists!";
                    break;
                case 500:
                    outputMessage = "Internal server error!";
                    break;
                case 400:
                    outputMessage = "Invalid input XML!";
                    break;
                default:
                    outputMessage = "HTTP Error code: " + statusCode;
            }
        }
        catch(Exception e)
        {
            outputMessage = "Exception: " + e.getMessage();
        } 

        try 
        {
            out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">");
            out.println("<html>");  
            out.println("<head>");
            out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"../CSS/Socion.css\">");
            out.println("<link rel=\"shortcut icon\" href=\"../images/favicon.ico\">");
            out.println("<title>Register via Facebook</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<div id=\"maintablewrap\">");
            out.println("<table id=\"maintable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">");
            out.println("<tbody><tr><td align=\"left\" height=\"10%\" colspan=\"2\">");
            out.println("<a href =\"../Html/index.html\"><img src=\"../images/home.gif\" border=\"0\" align=\"top\" alt=\"Socion home\" id=\"homebutton\"></a></td>");
            out.println("</td></tr>");
            if(isSuccess == true)
            {
                out.println("<tr><th align=\"center\" style=\"color:#347235;\" colspan=\"2\">" + outputMessage +  " <br> Redirecting to Login Page..</th></tr>");
                out.println("<script type=\"text/javascript\"> setTimeout(\"document.location = '../Html/index.html' \",2000); </script>");
            }  
            else
                out.println("<tr><th align=\"center\" style=\"color:#FF0000;\" colspan=\"2\">" + outputMessage + "</th></tr>");
  
            /*out.println("<tr align=\"center\" bgcolor=\"white\" id=\"copyrightmessage\">");
            out.println("<td class=\"smallmenulable\" colspan=\"2\">");
            out.println("<ul id=\"footercontainer\">");
            out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFeedbackWindow()\">Give us feedback</a></li>");
            out.println("<li>&copy; 2012 by oursocion.com All Rights Reserved</li>");
            out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFAQWindow()\">FAQ</a></li>");
            out.println("</ul></td></tr>");*/
            out.println("</tbody></table></div>");

            out.println("</body>");
            out.println("</html>");
        } 
        finally 
        {            
            if (postMethod != null)
                postMethod.releaseConnection();
        
            out.flush();
            out.close();
        }
    }
    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
        processRequest(request, response);
    }

}
