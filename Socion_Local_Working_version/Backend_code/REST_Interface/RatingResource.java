package REST_Interface;

import Data_access_layer.AuthenticationService;
import Data_access_layer.RatingDAO;
import Util.InvalidXMLException;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;

// URI
@Path("/ratings")


// Resource class
public class RatingResource
{
    @Context HttpHeaders h;
    
    // HTTP POST
    @POST

    // Representations
    @Consumes("application/xml")
    @Produces("application/xml")


    // Function to create a new rating for the news article
    public String createRating(String representation) 
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
                    // Create a new rating for the news article in the database from the XML input
                    response = new RatingDAO().createRating(client,representation,loggedUser);

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
    @Path("/{ratedby}")

    // Representation
    @Produces("application/xml")


    // Function to get a memeber specific ratings
    public String getRatingsByMember(@PathParam("ratedby") String ratedby) 
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
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (loggedUser.equals(ratedby)))
                {
                    // Function to get member specific ratings in XML format
                    response =  new RatingDAO().getRatingsByMember(client,ratedby);
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