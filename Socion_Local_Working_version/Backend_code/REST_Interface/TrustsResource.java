package REST_Interface;

import Data_access_layer.AuthenticationService;
import Data_access_layer.TrustDAO;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;

import Util.ItemNotFoundException;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;


// URI
@Path("/trusts")

// Resource class
public class TrustsResource
{

    @Context HttpHeaders h;


    // HTTP PUT
    @PUT
    @Path("/{fromto}")

    // Representations
    @Consumes("application/xml")
    @Produces("application/xml")

    // Function to update trust relationships between users after voting at the client side
    public String updateTrust(@QueryParam("trustScore") String trustScore, @PathParam("fromto") String fromto) 
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

                String tmp_arr[] = fromto.split(" ");
                String trustFrom = tmp_arr[0];
                String trustTo = tmp_arr[1];
            
                
                // Check if token-id is valid
                if(new AuthenticationService().authenticate(client,tokenId,loggedUser) && (new TrustDAO().isTrustScoreValid(trustScore)) && (loggedUser.equals(trustFrom)))
                {
                    //Update trust relationships between users after voting at the client side
                    response = new TrustDAO().updateTrust(client,trustScore,trustFrom,trustTo,loggedUser);
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        catch (ItemNotFoundException e)
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
    
    
}