
package Util;


public class InvalidInputNameException extends Exception
{
    String message;
    
    public InvalidInputNameException(String message)
    {
        this.message = message;
    }  
    
    @Override
    public String getMessage()
    {
        return message;
    }        
    
}
