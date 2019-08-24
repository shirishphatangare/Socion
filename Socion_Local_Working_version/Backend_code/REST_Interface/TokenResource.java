package REST_Interface;

import Data_access_layer.AuthenticationService;
import Data_access_layer.MemberDAO;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;

import javax.ws.rs.core.HttpHeaders;

import model.MemberVO;
import org.apache.commons.codec.binary.Base64;


// URI
@Path("/token")

// Resource class
public class TokenResource
{
    @Context HttpHeaders h;

    // HTTP GET
    @GET

    // Representation
    @Produces("text/plain")

    // Function to get the unique token-id for the username-password pair
    public String getToken() 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                // Retrieve encrypted username and password in the HTTP header
                String auth = h.getRequestHeaders().getFirst("Authorization");

                String output = new String(auth);

                // Separate username and password strings
                String clientCredentials [] = output.split(":");

                final String clientUsername = clientCredentials[0];
                String clientPasscode = clientCredentials[1];

                ObjectSet<MemberVO> result = client.query(new Predicate<MemberVO>()
                {
                    public boolean match(MemberVO memberVo)
                    {
                        return memberVo.getMembername().getmemberEmail().equals(clientUsername);
                    }
                });


                String serverPassword = null;

                if (result.hasNext())
                {
                    serverPassword = result.next().getPassword();

                    String serverPasscode = Util.MyMD5.string2md5HMA(clientUsername, serverPassword);
                    String encodedServerPasscodestring = serverPasscode;

                    if(encodedServerPasscodestring.equals(clientPasscode))
                    {
                        // retrieve the token-id for the username and password pair
                        String tokenId = new AuthenticationService().getTokenId(client,clientUsername,serverPassword);

                        if (tokenId != null)
                        {
                            String responseTokenId = new String(Base64.encodeBase64(tokenId.getBytes()));

                            // If login credentials are valid, return token-id
                            response = responseTokenId;
                        }
                        else
                        {
                            System.out.println("Reason 1.." + tokenId );

                            
                            // If login credentials are NOT valid, raise HTTP error for unauthorised access !
                            throw new WebApplicationException(401);
                        }
                    }
                    else
                    {
                        System.out.println("Reason 2.." + encodedServerPasscodestring + "-" + clientPasscode );
                        
                        // If login credentials are NOT valid, raise HTTP error for unauthorised access !
                        throw new WebApplicationException(401);
                    }
                }
                else
                {
                    System.out.println("Reason 3.." + clientUsername);
                    
                    // If login credentials are NOT valid, raise HTTP error for unauthorised access !
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

    public String updateToken() 
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
                    //Update member data i.e. change password
                    response = new MemberDAO().updateTokenId(client,loggedUser);
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
    
    
    // HTTP PUT
    @PUT
    @Path("/facebook/{loggedUser}")

    public String updateFacebookToken(@QueryParam ("accessToken") String accessToken, @PathParam ("loggedUser") String loggedUser) 
    {
        ObjectContainer client = null;
        String response = null;
        
        System.out.println("In updateFacebookToken");
        
        try
        {
            client = new XMLUtilities().getClient();
             
            if(client != null)
            {
                byte[] decodedTokenId = Base64.decodeBase64(accessToken.getBytes());

                String tokenId = new String(decodedTokenId);

                //Update member data i.e. change password
                response = new MemberDAO().updateFacebookTokenId(client, tokenId, loggedUser);
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
    
    
    // HTTP GET
    @GET
    @Path("/pageValidity")

    // Representation
    @Produces("text/plain")

    // Function to get the unique token-id for the username-password pair
    public String verifyPage(@QueryParam("td") String td) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                System.out.println("client TokenId: " + td);
                
                byte[] decodedTokenId = Base64.decodeBase64(td.getBytes());

                String tokenId = new String(decodedTokenId);
                
                System.out.println("decodedTokenId: " + tokenId);

                response = new AuthenticationService().verifyPageTokenId(client,tokenId);
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