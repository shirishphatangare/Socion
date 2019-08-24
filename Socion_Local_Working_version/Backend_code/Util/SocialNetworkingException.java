
package Util;


public class SocialNetworkingException extends Exception
{
    String message;
    
    public SocialNetworkingException(String message)
    {
        this.message = message;
    }   
    
    @Override
    public String getMessage()
    {
        return message;
    } 
    
}
