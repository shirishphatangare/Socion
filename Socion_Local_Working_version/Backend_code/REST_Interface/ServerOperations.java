
package REST_Interface;

import Data_access_layer.AuthenticationService;
import Util.StartServer;
import Util.StopServer;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.core.Context;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;

// URI
@Path("/server")

public class ServerOperations
{
    @Context HttpHeaders h;

    // HTTP GET
    @GET
    @Path("/start")

    // Representation
    @Produces("text/plain")

    // Function to get the member specific information
    public String startServer() 
    {
        
        if(!XMLUtilities.isServerRunning)
        {
            StartServer s = new StartServer();
            new Thread(s).start();
            
            
            try
            {    
                synchronized (s) 
                {
                    s.wait();
                }
            }
            catch(Exception e)
            {
                XMLUtilities.log.write("Exception: " + e.getMessage() + e.getClass());
            }    

            if(XMLUtilities.isServerRunning)
                return "0";
            else
                return "1";
        }
        
        return "0";
    }
    
    
    // HTTP GET
    @GET
    @Path("/stop")
    
    // Representation
    @Produces("text/plain")

    
    public String stopServer() 
    {
        ObjectContainer client = null;
        
        String response = null;
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
                response = new StopServer().executeServerStop(client);

            }
            else
            {
                //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                throw new WebApplicationException(401);
            }
        }

        return response;
    }


}
