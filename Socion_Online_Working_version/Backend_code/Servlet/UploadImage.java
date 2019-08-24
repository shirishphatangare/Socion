package Servlet;

import Util.ImageResize;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import com.db4o.ObjectServer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;
import javax.imageio.ImageIO;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.*;

import javax.servlet.*;
import javax.servlet.http.*;
import model.MemberNameVO;

public class UploadImage extends HttpServlet
{
    @Override
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");
        
        PrintWriter out = response.getWriter();
        String error = "";
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        
        String username = null;
        
        Cookie[] cookies = request.getCookies();
        
        if (cookies != null) 
        {
            for (int i = 0; i < cookies.length; i++) 
            {
                if (cookies[i].getName().equals("Loggeduser"))
                {
                  username = cookies[i].getValue();
                  break;
                }
            }
        }
 

        if (!isMultipart)
        {
            error = "Photo Not Uploaded";
            XMLUtilities.log.write(error);
        }
        else
        {
            FileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload upload = new ServletFileUpload(factory);
            List items = null;

            try
            {
                items = upload.parseRequest(request);
            }
            catch (FileUploadException e)
            {
                error = "Photo Not Uploaded. " + e.getMessage();
                e.printStackTrace();
            }

            Iterator itr = items.iterator();
            
            while (itr.hasNext())
            {
                FileItem item = (FileItem) itr.next();
                String resizedImageName = "";


                if (!item.isFormField())
                {
                    try
                    {
                        String applicationDirectory  = XMLUtilities.getProperty("APPPATH");
                        String uri = applicationDirectory + "/images/";

                        String finalimage = username.replaceAll("\\.", "dot") + ".jpg";
                        File savedFile = new File(uri + finalimage.toLowerCase());
                        item.write(savedFile);
                        
                        resizedImageName = username.replaceAll("\\.", "dot") + ".png";
                        File resizedFile = new File(uri + resizedImageName.toLowerCase());

                        try
                        {    
                            BufferedImage image = ImageIO.read(savedFile); 
                            BufferedImage resizedImage = ImageResize.resizeTrick(image, 100, 100); 
                            ImageIO.write(resizedImage, "png", resizedFile); 
                        }
                        catch(IOException e)
                        {
                            XMLUtilities.log.write("Error: " + e.getMessage());
                        }    

                        if(!savedFile.exists())
                            XMLUtilities.log.write("Photo File "+ savedFile.getAbsolutePath() + " does not exist.");

                        updateImageUploadStatus(username);
                        savedFile.delete();
                    } 
                    catch (Exception e)
                    {
                        error = "Photo Not Uploaded. " + e.getMessage();
                        e.printStackTrace();
                    }
                    finally
                    {
                        out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">");
                        out.println("<html>");
                        out.println("<head>");
                        out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"../CSS/Socion.css\">");
                        out.println("<link rel=\"shortcut icon\" href=\"../images/favicon.ico\">");
                        out.println("<script type=\"text/javascript\" src=\"../Scripts/util.js\"></script>");
                        out.println("</head>");
                        out.println("<body onload=\"setFromUploadPhotoHomeLink();\">");
                        out.println("<div id=\"maintablewrap\">");
                        out.println("<table id=\"maintable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">");
                        out.println("<tbody><tr><td align=\"left\" height=\"10%\" colspan=\"2\">");
                        out.println("<a id=\"inboxLink\"><img src=\"../images/home.gif\" border=\"0\" align=\"top\" alt=\"\"></a>");
                        out.println("</td></tr>");
                        out.println("<tr><td align=\"center\" colspan=\"2\">");
                        out.println("<img id=\"imageid\" src=\"\" width=\"100\" height=\"100\">");
                        out.println("</td></tr>");
                        if(error.isEmpty())
                        {
                            out.println("<tr><th align=\"center\" style=\"color:#347235;\" colspan=\"2\">Photo inserted successfully.</th></tr>");
                            String profileImage = "../images/" + resizedImageName.toLowerCase();
                            out.println("<script type=\"text/javascript\"> reloadImg(\"imageid\",\"" + profileImage + "\") ; setCookie('M_P_S','true',1);</script>");
                        }
                        else
                            out.println("<tr><th align=\"center\" style=\"color:#FF0000;\" colspan=\"2\">" + error + "</th></tr>");
                        
                        /*out.println("<tr align=\"center\" bgcolor=\"white\" id=\"copyrightmessage\">");
                        out.println("<td class=\"smallmenulable\" colspan=\"2\">");
                        out.println("<ul id=\"footercontainer\">");
                        out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFeedbackWindow()\">Give us feedback</a></li>");
                        out.println("<li>&copy; 2012 by oursocion.com All Rights Reserved</li>");
                        out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFAQWindow()\">FAQ</a></li>");
                        out.println("</ul></td></tr>");*/
                        
                        out.println("<tr align=\"center\" bgcolor=\"white\" id=\"copyrightmessage\">");
                        out.println("<td class=\"smallmenulable\" colspan=\"3\">");
                        out.println("<ul id=\"footercontainer\">");
                        out.println("<li>&copy; 2012 by oursocion.com All Rights Reserved</li>");
                        //out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFAQWindow()\">FAQ</a></li>");
                        out.println("<li><a href=\"../Html/FAQ.html\" class=\"link\">FAQ</a></li>");
                        out.println("<li><a href=\"../Html/About_us.html\" class=\"link\">About Socion</a></li>");
                        out.println("<li><a href=\"http://blog.oursocion.com\" class=\"link\">Blog</a></li>");
                        out.println("<li><a href=\"#\" class=\"link\" onclick=\"openFeedbackWindow()\">Give us feedback</a></li>");
                        out.println("<li><a href=\"Privacy_policy.html\" class=\"link\">Privacy</a></li> ");
                        out.println("<li><a href=\"../Html/Contact_us.html\" class=\"link\">Contact us</a></li>");
                        out.println("</ul></td></tr>");
                        
                        out.println("</tbody></table></div>");
                        out.println("</body>");
                        out.println("</html>");
                        out.flush();
                        out.close();
                    }
                }
            }
        }
    }


    private void updateImageUploadStatus(final String username) 
    {

        ObjectContainer client = null;
        //ObjectServer server = null;

        try
        {
            client = new XMLUtilities().getClient();

            ObjectSet<MemberNameVO> result = client.query(new Predicate<MemberNameVO>()
            {
                public boolean match(MemberNameVO membernameVo)
                {
                    return membernameVo.getmemberEmail().equals(username);
                }
            });

            if(result.hasNext())
            {
                MemberNameVO membernameVo = result.next();
                membernameVo.setIsImageUploaded(Boolean.TRUE);
                client.store(membernameVo);
            }

        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
    }
}