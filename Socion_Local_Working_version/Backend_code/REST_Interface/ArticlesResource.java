package REST_Interface;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;

import Util.InvalidXMLException;

import Data_access_layer.ArticleDAO;
import Data_access_layer.AuthenticationService;
import Util.InvalidURLException;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import org.apache.commons.codec.binary.Base64;


// URI
@Path("/articles")

// Resource class
public class ArticlesResource
{
        @Context HttpHeaders h;

        // HTTP GET
        @GET

        // Representation
        @Produces("text/plain")

        // Function to get information of all the articles in the system
        public String getArticlesCount()
        {
            ObjectContainer client = null;
            String response = null;

            try
            {
                client = new XMLUtilities().getClient();

                if(client != null)
                {
                    response = new ArticleDAO().getArticlesCount(client);
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

        // Representations
        @Consumes("application/xml")
        @Produces("text/plain")

        // Function to create a news articles postedd by the user
        public String createArticle(String xmldata) 
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
                        // Create a news article from the XML input
                        response = new ArticleDAO().createArticlefromXml(client,xmldata,offsetMillis,loggedUser);
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
        @Path("/favourite")

        // Representation
        @Produces("application/xml")

        // Function to get information of all the articles in the system
        public String getFavouriteArticles(@QueryParam("page") String pageNumber)
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
                        int pageNo =  Integer.parseInt(pageNumber);
                        // Get XML data for all the news articles stored in the database
                        response = new ArticleDAO().getFavouriteArticles(client,loggedUser,pageNo);
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
        @Path("/top")

        // Representation
        @Produces("application/xml")

        // Function to get information of all the articles in the system
        public String getTopArticles(@QueryParam("ct") String category)
        {
            ObjectContainer client = null;
            String response = null;

            try
            {
                client = new XMLUtilities().getClient();

                if(client != null)
                {
                        response = new ArticleDAO().getSocionTopArticles(client,category);
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
        @Path("/inbox")

        // Representation
        @Produces("application/xml")

        // Function to get information of all the articles in the system
        public String getInboxXML(@QueryParam("page") String pageNumber) 
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
                        int pageNo =  Integer.parseInt(pageNumber);
                        // Get XML data for all the news articles stored in the database
                        response = new ArticleDAO().getInboxArticles(loggedUser, client, pageNo);
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
        @Path("/member/{membername}")

        // Representation
        @Produces("application/xml")

        // Get member specific article information
        public String getArticlesForMember(@PathParam("membername") String membername, @QueryParam("page") String pageNumber) 
        {
            ObjectContainer client = null;
            String response = null;

            try
            {
                client = new XMLUtilities().getClient();

                if(client != null)
                {
                    int pageNo =  Integer.parseInt(pageNumber);
                    response = new ArticleDAO().getArticlesXmlForMember(client,membername,pageNo);
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

    // Function to get the news in search query
    public String getsearchNewsResult(@QueryParam("query") String searchString , @QueryParam("page") String pageNumber) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                int pageNo =  Integer.parseInt(pageNumber);
                // Get the member specific information
                response = new ArticleDAO().searchNews(client, searchString, pageNo);
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
    @Path("/{articleId}")

    // Representation
    @Produces("application/xml")

    
    public String getArticleInfo(@PathParam("articleId") String articleId) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                    response = new ArticleDAO().getArticlesXMLForArticleId(client,articleId);
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

    
    
    // HTTP DELETE
    @DELETE
    @Path("/{articleId}")
    // Representation
    @Produces("text/plain")

    // Function to get trust score for a From user-To user pair
    public String deleteArticle(@PathParam("articleId") String articleId) 
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
                    response = new ArticleDAO().deleteStory(client, articleId,loggedUser);
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
    @Path("/bootstrap")

    // Representation
    @Produces("application/xml")

    // Get random news articles for the bootsrapping process at client side
    public String getBootstrapArticles(@QueryParam("userName") String userName,@QueryParam("ct") String category, @QueryParam("page") String pageNumber) 
    {
        ObjectContainer client = null;
        String response = null;

        try
        {
            client = new XMLUtilities().getClient();

            if(client != null)
            {
                if(!userName.isEmpty())
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
                        int pageNo =  Integer.parseInt(pageNumber);
                        
                        // Return random news articles for the bootstrapping
                        response = new ArticleDAO().getBootstrapArticles(client,userName,category, pageNo);
                    }
                    else
                    {
                        //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                        throw new WebApplicationException(401);

                    }
                }
                else
                {
                        
                        int pageNo =  Integer.parseInt(pageNumber);
                        // Return random news articles for the bootstrapping
                        response = new ArticleDAO().getContinueUnregisteredArticles(client,category, pageNo);
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
    @Path("/urlheader")

    // Representation
    @Produces("application/xml")

    // Function to get the member specific information
    public String getUrlHeader(@QueryParam("weburl") String webUrl) 
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
                        // Get the member specific information
                        response = new ArticleDAO().readArticleUrlHeaderParameters(client, webUrl);
                }
                else
                {
                    //  If token-id is NOT valid, raise HTTP error for unauthorised access !
                    throw new WebApplicationException(401);
                }
            }
        }
        catch (InvalidURLException e)
        {
            throw new WebApplicationException(400);
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
