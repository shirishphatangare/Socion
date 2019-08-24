
package Data_access_layer;

import Util.CommentDateSort;
import Util.InvalidXMLException;
import Util.XMLUtilities;
import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import com.db4o.query.Query;
import javax.ws.rs.WebApplicationException;
import model.ArticleVO;
import model.CommentVO;

public class CommentDAO
{

   /* Function to create a new user in the system */

    public String createComment(ObjectContainer db,String xml,int offsetMillis, String loggedUser) throws InvalidXMLException
    {
        // Check if input xml is valid and if valid, retrieve CommentVO from input xml
        CommentVO commentVo = new XMLUtilities().getCommentVoFromXml(db,xml,offsetMillis);

        String commentBy = commentVo.getCommentBy().getmemberEmail();
        
        if(!loggedUser.equals(commentBy))
            throw new WebApplicationException(401);
        
        if (commentVo != null)
        {
               String articleId = commentVo.getArticleId();
               new ArticleDAO().updateArticleCommentsCount(db, articleId, "add");

               db.store(commentVo);
               return "0";  //Success
        }
        else
        {
            throw new InvalidXMLException();
        }
    }
    
    
    public String deleteComment(ObjectContainer db, final String commentId, String loggedUser)
    {
        ObjectSet<CommentVO> result = db.query(new Predicate<CommentVO>()
        {
            public boolean match(CommentVO commentVo)
            {
                return commentVo.getCommentId().equals(commentId);

            }
        });

        if (result.hasNext())
        {
            CommentVO commentVo =  result.next();
            final String articleId = commentVo.getArticleId();
            String commentBy = commentVo.getCommentBy().getmemberEmail();
            
            ObjectSet<ArticleVO> articleResult = db.query(new Predicate<ArticleVO>()
            {
                public boolean match(ArticleVO articleVo)
                {
                    return articleVo.getArticleId().equals(articleId);
                }
            });

            if (articleResult.hasNext())
            {
                String articlePoster = articleResult.next().getPostedBy().getmemberEmail();
            
                if(!loggedUser.equals(articlePoster) &&  !loggedUser.equals(commentBy))
                    throw new WebApplicationException(401);
            }  
            
            db.delete(commentVo);
            new ArticleDAO().updateArticleCommentsCount(db, articleId, "minus");

            return "0";  //Success
        }
        
        return "1";
    }        

    
    public void deleteCommentsForArticle(ObjectContainer db, final String articleId)
    {
        ObjectSet<CommentVO> result = db.query(new Predicate<CommentVO>()
        {
            public boolean match(CommentVO commentVo)
            {
                return commentVo.getArticleId().equals(articleId);
            }
        });

        while(result.hasNext())
        {
            CommentVO commentVo =  result.next();
            db.delete(commentVo);
        }
    
    }        


    /* Function to retrieve commets for a given articleId  */

    public String getXml(ObjectContainer db, String articleId)
    {

        StringBuilder comments = new StringBuilder();

        comments.append("<comments>");

        Query query = db.query();
        query.constrain(CommentVO.class);
        query.descend("articleId").constrain(articleId);
        
        CommentDateSort datesort = new CommentDateSort();
        query.sortBy(datesort);
        
        ObjectSet<CommentVO> result = query.execute();

        // retrieve user specific data in the form of a CommentVO Object
        comments.append("<count>").append(result.size()).append("</count>");

        while (result.hasNext())
        {
            comments.append(result.next().toXML());
        }

        comments.append("</comments>");
        return comments.toString();
    }

}
