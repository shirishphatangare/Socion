package REST_Interface;

import Data_access_layer.AuthenticationService;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;

import Util.InvalidXMLException;
import Util.MemberAlreadyExistsException;

import Data_access_layer.MemberDAO;
import Data_access_layer.TrustDAO;
import Util.MemberNotFoundException;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;

// URI
@Path("/members")

// Resource class
public class MembersResource
{
    @Context HttpHeaders h;
    

    //HTTP POST
    @POST

    // Representations
    @Consumes("application/xml")
    @Produces("text/plain")

    // Function  to create a new member in the system
    public String createMember(String representation) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
               // Create a new member in the database from the XML input and return a unique token-id ( For Login )
               response = new MemberDAO().createMember(client, representation);
            }
           
        }
        catch (InvalidXMLException e)
        {
            throw new WebApplicationException(400);
        }
        catch (MemberAlreadyExistsException e)
        {
            throw new WebApplicationException(403);
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Exception: " + e.getMessage() + e.getClass());
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;

    }
    
    
    
    //HTTP POST
    @POST
    @Path("/facebook")

    // Representations
    @Consumes("application/xml")
    @Produces("text/plain")

    // Function  to create a new member in the system
    public String createFacebookMember(String representation) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
               // Create a new member in the database from the XML input and return a unique token-id ( For Login )
               response = new MemberDAO().createFacebookMember(client, representation);
            }
           
        }
        catch (InvalidXMLException e)
        {
            throw new WebApplicationException(400);
        }
        catch (MemberAlreadyExistsException e)
        {
            throw new WebApplicationException(403);
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Exception: " + e.getMessage() + e.getClass());
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;

    }
    
    
    // HTTP GET
    @GET
    @Path("/friends/{operation}")

    // Representation
    @Produces("application/xml")

    // Function to get friends information for the given member
    public String getBuddiesfromXml(@PathParam("operation") String operation) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get encrypted token-id from the HTTP request
                String cookieString = h.getRequestHeaders().getFirst("Cookies");

                String tokenId = "";
                String loggedUser = "";
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    String encodedTokenId = cookieArray[0].replace("En_tokenID=","");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                    // Decrypt toekn-id with Base64 decoding
                    byte[] decodedTokenId = Base64.decodeBase64(encodedTokenId.getBytes());

                     tokenId = new String(decodedTokenId);
                }

                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser))
                {
                    // Get information of articles for thr given articleid from the database
                    response = new TrustDAO().getFriendsXml(client,loggedUser,operation);
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
   }


    
    
    // HTTP GET
    @GET
    @Path("/search")

    // Representation
    @Produces("application/xml")

    // Function to get the member specific information
    public String searchMember(@QueryParam("query") String searchString) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
           client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get the member specific information
                response = new MemberDAO().searchMember(client, searchString);
            }
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }
    
    
    
    // HTTP GET
    @GET
    @Path("/{memberName}")

    // Representation
    @Produces("application/xml")

    // Function to get the member specific information
    public String getMemberSpecificInfo(@PathParam("memberName") String userName) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get encrypted token-id from the HTTP request
                String cookieString = h.getRequestHeaders().getFirst("Cookies");
                
                String tokenId = "";
                String loggedUser = "";
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    String encodedTokenId = cookieArray[0].replace("En_tokenID=","");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                    // Decrypt toekn-id with Base64 decoding
                    byte[] decodedTokenId = Base64.decodeBase64(encodedTokenId.getBytes());

                     tokenId = new String(decodedTokenId);
                }

                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (loggedUser.equals(userName)))
                {
                        // Get the member specific information
                        response = new MemberDAO().getMemberSpecificInfo(client, userName);
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;

    }



    // HTTP PUT
    @PUT
    @Path("/{memberName}")

    // Representations
    @Consumes("application/xml")
    @Produces("application/xml")
    
    // Function to update member specific information .i.e password change
    public String updateMember(@QueryParam("passwordQuery") String passwordQuery, @PathParam("memberName") String userName) 
    {
        ObjectContainer client = null;
        String response = null;
        
        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get encrypted token-id from the HTTP request
                String cookieString = h.getRequestHeaders().getFirst("Cookies");
                
                String tokenId = "";
                String loggedUser = "";
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    String encodedTokenId = cookieArray[0].replace("En_tokenID=","");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                    // Decrypt toekn-id with Base64 decoding
                    byte[] decodedTokenId = Base64.decodeBase64(encodedTokenId.getBytes());

                     tokenId = new String(decodedTokenId);
                }

                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (loggedUser.equals(userName)))
                {
                    //Update member data i.e. change password
                    return new MemberDAO().updateMemberFromXml(client,passwordQuery,loggedUser);
                }
                else
                {
                    // If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        catch (MemberNotFoundException e)
        {
            throw new WebApplicationException(404);
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Exception: " + e.getMessage() + e.getClass());
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;

    }
    
    
    // HTTP PUT
    @PUT
    @Path("/config")

    // Representations

    @Consumes("application/xml")
    @Produces("application/xml")

    // Function to update the member's algorithm configuration
    public String updateMemberConfiguration(String representation) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get encrypted token-id from the HTTP request
                String cookieString = h.getRequestHeaders().getFirst("Cookies");

                String tokenId = "";
                String loggedUser = "";
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    String encodedTokenId = cookieArray[0].replace("En_tokenID=","");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                    // Decrypt toekn-id with Base64 decoding
                    byte[] decodedTokenId = Base64.decodeBase64(encodedTokenId.getBytes());

                     tokenId = new String(decodedTokenId);
                }

                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser))
                {
                    //Update member data i.e algorithm configuration)
                    response = new MemberDAO().updateMemberConfigfromXml(client,representation, loggedUser);
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        catch (InvalidXMLException e)
        {
            throw new WebApplicationException(400);
        }
        catch (MemberNotFoundException e)
        {
            throw new WebApplicationException(404);
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }
    
    
    // HTTP GET
    @GET
    @Path("/membername/{member}")

    // Representation
    @Produces("application/xml")

    // Function to get the member specific information
    public String getMemberNameInfo(@PathParam("member") String memberName) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get the member specific information
                response = new MemberDAO().getMemberName(client, memberName);
            }
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }
    
    // HTTP POST
    @POST
    @Path("/feedback" )
    
    // Representations
    @Consumes("application/xml")
    @Produces("text/plain")


    // Function to send feedback
    public String sendFeedbackEmail(String xmldata) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                 // Get encrypted token-id from the HTTP request
                String cookieString = h.getRequestHeaders().getFirst("Cookies");

                String loggedUser = "";
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                }
                response = new MemberDAO().sendFeedbackEmail(client,loggedUser,xmldata);
            }    
        }
        catch (MemberNotFoundException e)
        {
            throw new WebApplicationException(404);
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }

    
    // HTTP POST
    @POST
    @Path("/contactus" )
    
    // Representations
    @Consumes("application/xml")
    @Produces("text/plain")


    // Function to send feedback
    public String sendContactEmail(String xmldata) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            //client = new XMLUtilities().getClient();

            //if(client != null)
            //{
                 // Get encrypted token-id from the HTTP request
                //String cookieString = h.getRequestHeaders().getFirst("Cookies");

                //String loggedUser = "";
                        
                /*if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                }*/
                response = new MemberDAO().sendContactEmail(xmldata);
            //}    
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }

    
    
    
    // HTTP GET
    @GET
    @Path("/email/{userIdentity}")

    // Function to get the member specific information
    public String sendPasswordRetrieveEmail(@PathParam("userIdentity") String userIdentity) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                response = new MemberDAO().sendEmail(client, userIdentity);
            }

        }
        catch (MemberNotFoundException e)
        {
            throw new WebApplicationException(404);
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }
    
    

    // HTTP GET
    @GET
    @Path("/allmembernames")

    // Representation
    @Produces("application/xml")

    // Function to get the member specific information
    public String getAllMemberNames() 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Get encrypted token-id from the HTTP request
                String cookieString = h.getRequestHeaders().getFirst("Cookies");
                String tokenId = "";
                String loggedUser = "";
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    String encodedTokenId = cookieArray[0].replace("En_tokenID=","");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                    }
                
                    // Decrypt toekn-id with Base64 decoding
                    byte[] decodedTokenId = Base64.decodeBase64(encodedTokenId.getBytes());

                     tokenId = new String(decodedTokenId);
                }

                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (loggedUser.equals("oursocion@gmail.com")))
                {
                        // Get the member specific information
                        response = new MemberDAO().getAllMemberNames(client);
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        return response;
    }

}

