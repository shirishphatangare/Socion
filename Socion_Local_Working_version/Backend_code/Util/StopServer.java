
package Util;

import com.db4o.*;
import com.db4o.messaging.*;

public class StopServer
{

    //public static void main(String[] args) 
    public String executeServerStop(ObjectContainer objectContainer)
    {
            // get the messageSender for the ObjectContainer
            MessageSender messageSender = objectContainer.ext().configure().clientServer().getMessageSender();
            // send an instance of a StopServer object
            messageSender.send(new StopServer());
            
            XMLUtilities.isServerRunning = false;
            
            return "0";
    }
    
    
}