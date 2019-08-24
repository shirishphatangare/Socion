package REST_Interface;

import Data_access_layer.ArticleDAO;
import Data_access_layer.AuthenticationService;
import Data_access_layer.OutboxDAO;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;


// URI
@Path("/outbox")

// Resource class
public class OutboxResource
{
    @Context HttpHeaders h;
    
    // HTTP GET
    @GET
    @Path("/{membername}")

    // Representation
    @Produces("application/xml")

    // Function to get the member specific Outbox
    public String getMemberOutbox(@PathParam("membername") String membername) 
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
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (loggedUser.equals(membername)))
                {
                    // Get XML data for the Outbox of a member
                    response = new OutboxDAO().getOutboxXml(client,membername);
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
    @Path("/{membername}")
    
    
    // Representations
    @Consumes("application/xml")
    @Produces("application/xml")

    // Function to update an Outbox of the memeber
    public String updateOutboxArticles(@PathParam("membername") String membername, @QueryParam("ds") String ds, String articleId) 
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
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (loggedUser.equals(membername)) && (new ArticleDAO().isArticleIdValid(client,articleId)))
                {
                    // Update the Outbox ( ds indicates Data Structure to update i.e. Submitted or Inbox inside Outbox )
                    response = new OutboxDAO().updateOutbox(client,membername,articleId,ds);
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
}