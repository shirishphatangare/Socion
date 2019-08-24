
package Util;

import com.db4o.*;
import com.db4o.cs.*;
import com.db4o.cs.config.*;
import com.db4o.messaging.*;
import model.MemberVO;
import model.OutboxVO;

public class StartServer implements MessageRecipient, Runnable
{
    private boolean stop = false;
    
    
    public void run() 
    {
        synchronized (this) 
        {
            ServerConfiguration config = Db4oClientServer.newServerConfiguration();
            
            config.networking().messageRecipient(this);
            config.common().objectClass(MemberVO.class).cascadeOnUpdate(true);
            config.common().objectClass(OutboxVO.class).cascadeOnUpdate(true);

            
            ObjectServer db4oServer = Db4oClientServer.openServer(config, Socion_Constants.DB4OFILENAME, Socion_Constants.DBPORT);
            db4oServer.grantAccess(Socion_Constants.DBUSER, Socion_Constants.DBPASS);
            
            // to identify the thread in a debugger
            Thread.currentThread().setName(this.getClass().getName());
            // We only need low priority since the db4o server has
            // it's own thread.
            Thread.currentThread().setPriority(Thread.MIN_PRIORITY);
            
            try 
            {
                if (!stop) 
                {
                    
                    XMLUtilities.isServerRunning = true;
                    this.notify();
                    // wait forever for notify() from close()
                    this.wait(Long.MAX_VALUE);
                }
            } 
            catch (Exception e) 
            {
                XMLUtilities.log.write("Exception: " + e.getMessage() + e.getClass());
            }
            db4oServer.close();
        }
    }
    
    /**
     * messaging callback
     *
     * @see com.db4o.messaging.MessageRecipient#processMessage(MessageContext,
     *      Object)
     */
    public void processMessage(MessageContext con, Object message) 
    {
        if (message instanceof StopServer) 
        {
            close();
        }
    }
    
    /**
     * closes this server.
     */
    public void close() 
    {
        synchronized (this) 
        {
            stop = true;
            this.notify();
        }
    }
}