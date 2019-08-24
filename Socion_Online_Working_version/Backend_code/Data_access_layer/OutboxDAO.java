
package Data_access_layer;

import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import java.util.ArrayList;
import java.util.List;
import model.MemberNameVO;
import model.OutboxVO;


public class OutboxDAO
{

    /* Function to create an outbox for the new user */

    public String createOutbox(ObjectContainer db, final String outboxFor)
    {
        MemberNameVO membernameVo = new MemberNameVO();

        ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
        {
            public boolean match(MemberNameVO membernameVo)
            {
                return membernameVo.getmemberEmail().equals(outboxFor);
            }
        });

        if(result.hasNext())
            membernameVo = result.next();

        
        if(!isOutboxForUserAlreadyExists(db, outboxFor))
        {    
            OutboxVO outboxVo = new OutboxVO(membernameVo,new ArrayList<String>(),new ArrayList<String>());

            // If new outboxVO is created successfully
            if (outboxVo != null)
            {
                // Store created outboxVO Object
                db.store(outboxVo);
                
                XMLUtilities.log.write("Success! Outbox created for user " + outboxFor);
                
                return "0";
            }
            else
                return "1";
        }
        else
                return "1";
    }
    
    
    public boolean isOutboxForUserAlreadyExists(ObjectContainer db, final String outboxFor)
    {
        if(getOutboxXml(db,outboxFor) == null)
            return false;
        else
            return true;
    }        


    /* Function to retrieve an outbox for the user */

    public String getOutboxXml(ObjectContainer db,final String outboxFor)
    {
        //Retrieve an outbox for the username passed as a parameter

        ObjectSet<OutboxVO> result = db.query(new Predicate<OutboxVO>()
        {
            public boolean match(OutboxVO outboxVo)
            {
                return outboxVo.getOutboxFor().getmemberEmail().equals(outboxFor);
            }
        });


        // If outbox Object exists, build an output xml
        if(result.hasNext())
        {
            return result.next().toXML();
        }
        else
            return null;
        
    }


    /* Function to update an outbox for the username passed as a parameter */

    public  String updateOutbox(ObjectContainer db,final String outboxFor,String articleid,String ds)
    {
        // Retrieve an outbox Object for the username
        ObjectSet<OutboxVO> result = db.query(new Predicate<OutboxVO>()
        {
            public boolean match(OutboxVO outboxVo)
            {
                return outboxVo.getOutboxFor().getmemberEmail().equals(outboxFor);
            }
        });

        List<String> new_outboxarticles;

        // If outbox Object exists
        if(result.hasNext())
        {
            OutboxVO tmpOutbox = (OutboxVO)result.next();

            // If data structure to be updated is "OutboxInbox"
            if(ds.equals("OutboxInbox") )
            {
                new_outboxarticles = tmpOutbox.getOutboxInbox();
                
                if(!new_outboxarticles.contains(articleid))
                {
                    new_outboxarticles.add(articleid);
                    new ArticleDAO().updateArticleSharesCount(db, articleid);
                    
                    // Update outbox articles for Submitted
                    tmpOutbox.setOutboxInbox(new_outboxarticles);
                }
                
            }
            else // If data structure to be updated is "OutboxSubmitted"
            {
                new_outboxarticles = tmpOutbox.getOutboxSubmitted();

                if(!new_outboxarticles.contains(articleid))
                {
                    // Get current outbox articles for OutboxSubmitted
                    new_outboxarticles.add(articleid);

                    // Update outbox articles for Submitted
                    tmpOutbox.setOutboxSubmitted(new_outboxarticles);
                }
            }

            // Store updated Outbox in the DB
            db.store(tmpOutbox);
            
            return tmpOutbox.toXML();
        }
        else
        {
            return null;
        }
    }
    
    
    public void removeOutboxReferencesForArticle(ObjectContainer db, String articleId)
    {
        ObjectSet<OutboxVO> result = db.query(new Predicate<OutboxVO>()
        {
            public boolean match(OutboxVO outboxVo)
            {
                return true;
            }
        });

        while(result.hasNext())
        {
            OutboxVO outboxVo = result.next();
            
            List<String> OutboxInboxList = outboxVo.getOutboxInbox(); 
            boolean removeResultOutboxInbox = OutboxInboxList.remove(articleId);
            
            if(removeResultOutboxInbox == true)
                outboxVo.setOutboxInbox(OutboxInboxList);
            
            List<String> OutboxSubmittedList = outboxVo.getOutboxSubmitted(); 
            boolean removeResultOutboxSubmitted = OutboxSubmittedList.remove(articleId);
            
            if(removeResultOutboxSubmitted == true)
                outboxVo.setOutboxSubmitted(OutboxSubmittedList);
            
            if(removeResultOutboxSubmitted == true || removeResultOutboxInbox == true)
                db.store(outboxVo);
                
        }
    }        
}