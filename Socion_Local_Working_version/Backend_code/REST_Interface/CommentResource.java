package REST_Interface;

import Data_access_layer.AuthenticationService;
import Data_access_layer.CommentDAO;
import Util.InvalidXMLException;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;

// URI
@Path("/comments")

// Resource class
public class CommentResource
{

    @Context HttpHeaders h;

    // HTTP GET
    @GET
    @Path("/{articleId}")

    // Representation
    @Produces("application/xml")

    // Function to get trust score for a From user-To user pair
    public String getXml(@PathParam("articleId") String articleId) 
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
                    // Get trust score for a From user-To user pair
                    response = new CommentDAO().getXml(client, articleId);
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


    // HTTP POST
    @POST

    // Representation
    @Consumes("application/xml")
    @Produces("text/plain")

    // Function to create default trust relationships for a new user
    public String createComment(String representation) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();


            if(client != null)
            {
                String cookieString = h.getRequestHeaders().getFirst("Cookies");

                String tokenId = "";
                String loggedUser = "";
                int offsetMillis = 0;
                        
                if(cookieString != null)
                {    
                    String[] cookieArray = cookieString.split(";");

                    String encodedTokenId = cookieArray[0].replace("En_tokenID=","");

                    if(cookieArray.length > 1)
                    {    
                        loggedUser = cookieArray[1].replace("loggedUser=","");
                        offsetMillis = Integer.parseInt(cookieArray[2].replace("TimeZoneOffset=",""));
                    }
                
                    // Decrypt toekn-id with Base64 decoding
                    byte[] decodedTokenId = Base64.decodeBase64(encodedTokenId.getBytes());

                     tokenId = new String(decodedTokenId);
                }

                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser))
                {
                    try
                    {
                        // Create default trust relationships for a new user
                        response = new CommentDAO().createComment(client,representation,offsetMillis,loggedUser);
                    }
                    catch (InvalidXMLException e)
                    {
                        throw new WebApplicationException(400);
                    }
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Exception: " + e.getMessage());
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
    
    
     // HTTP DELETE
    @DELETE
    //@Path("/{articleId}")

    // Representation
    @Produces("text/plain")

    // Function to get trust score for a From user-To user pair
    public String deleteComment(@QueryParam("commentId") String commentId) 
    {
        ObjectContainer client = null;
        //ObjectServer server = null;
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
                    // Get trust score for a From user-To user pair
                    response = new CommentDAO().deleteComment(client, commentId, loggedUser);
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
