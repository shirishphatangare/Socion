package Data_access_layer;

import model.RatingVO;
import Util.XMLUtilities;

import com.db4o.ObjectContainer;

import Util.InvalidXMLException;
import Util.ItemNotFoundException;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import javax.ws.rs.WebApplicationException;

public class RatingDAO
{
    /* Function to create new rating for a news item */
    public  String createRating(ObjectContainer db,String xml, String loggedUser) throws InvalidXMLException, ItemNotFoundException
    {
        // Check if input xml is valid and if valid, retrieve RatingVO from it
        RatingVO ratingVo = new XMLUtilities().getRatingVoFromXml(db,xml);

        String ratedBy = ratingVo.getRatedByMember().getmemberEmail();
        Float ratedScore = ratingVo.getRatedScore();
        String ratedArticleId = ratingVo.getRatedArticleId();
        
        ArticleDAO articledao = new ArticleDAO();
        
        if(!loggedUser.equals(ratedBy) || (!articledao.isRatedScoreValid(ratedScore)) || (articledao.isThisArticleRatedByLoggedUser(db, ratedArticleId, ratedBy)))
            throw new WebApplicationException(401);
        
        String articlePoster = articledao.getArticlePosterUsername(db, ratedArticleId);
        
        if (ratingVo != null)
        {
            db.store(ratingVo);
            articledao.updateArticleRatings(db, ratedArticleId, ratedScore, loggedUser);
            new TrustDAO().updateTrustByRating(db,ratedScore,ratedBy,articlePoster,loggedUser);
            return ratingVo.toXML();
        }
        else
        {
            throw new InvalidXMLException();
        }
    }
    
    
    /* Function to create new rating for a news item */
    public  String createInitialRating(ObjectContainer db,String xml, String loggedUser) throws InvalidXMLException, ItemNotFoundException
    {
        // Check if input xml is valid and if valid, retrieve RatingVO from it
        RatingVO ratingVo = new XMLUtilities().getRatingVoFromXml(db,xml);

        String ratedBy = ratingVo.getRatedByMember().getmemberEmail();
        Float ratedScore = ratingVo.getRatedScore();
        String ratedArticleId = ratingVo.getRatedArticleId();
        
        ArticleDAO articledao = new ArticleDAO();
        
        if(!loggedUser.equals(ratedBy) || (!articledao.isRatedScoreValid(ratedScore)) || (articledao.isThisArticleRatedByLoggedUser(db, ratedArticleId, ratedBy)))
            throw new WebApplicationException(401);
        
        
        if (ratingVo != null)
        {
            db.store(ratingVo);
            return ratingVo.toXML();
        }
        else
        {
            throw new InvalidXMLException();
        }
    }



    /* Function to get all the ratings by a member passed as a parameter */

    public  String getRatingsByMember(ObjectContainer db, final String ratedby)
    {
        StringBuilder ratings = new StringBuilder();

        //For an output xml for the ratings list
        ratings.append("<ratings>");

        ObjectSet<RatingVO> result = db.query(new Predicate<RatingVO>()
        {
            public boolean match(RatingVO ratingVo)
            {
                return ratingVo.getRatedByMember().getmemberEmail().equals(ratedby);
            }
        });

        if (result.hasNext())
        {
            // Traverse through the list of ratings Objects and form an output XML
            while (result.hasNext())
            {
                ratings.append(result.next().toXML());
            }
        }
            ratings.append("</ratings>");
            return ratings.toString();
    }
    
    
    public void deleteRatingsForArticle(ObjectContainer db, final String articleId)
    {
        ObjectSet<RatingVO> result = db.query(new Predicate<RatingVO>()
        {
            public boolean match(RatingVO ratingVo)
            {
                return ratingVo.getRatedArticleId().equals(articleId);
            }
        });

        while(result.hasNext())
        {
            RatingVO ratingVo = result.next();
            db.delete(ratingVo);   
        }
    }        

}