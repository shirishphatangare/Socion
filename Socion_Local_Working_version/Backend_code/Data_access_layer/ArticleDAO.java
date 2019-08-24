package Data_access_layer;

import Util.*;
import java.util.ArrayList;
import java.util.List;

import model.ArticleVO;
import model.MemberVO;


import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;

import com.db4o.query.Constraint;
import com.db4o.query.Query;
import java.util.*;
import javax.ws.rs.WebApplicationException;
import model.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;



public class ArticleDAO
{
    /* Function to create a News item in the Database */

    public  String createArticlefromXml(ObjectContainer db, String xml, int offsetMillis, String loggedUser) throws InvalidXMLException, ItemNotFoundException
    {
        // Check if input xml is valid and if valid, retrive ArticleVO from input xml
        ArticleVO articleVo = new XMLUtilities().getArticleVoFromXml(db, xml, offsetMillis);

        String articlePoster = articleVo.getPostedBy().getmemberEmail();
        
        if(!loggedUser.equals(articlePoster))
            throw new WebApplicationException(401);
            
        
        if (articleVo != null)
        {
            // Store the news item in the DB and return article-id
            db.store(articleVo);

            String articleId = articleVo.getArticleId();
            Float ratedScore = new Float(10.0);
            
            StringBuilder ratingXML = new StringBuilder();
            
            ratingXML.append("<rating>");
            ratingXML.append("<ratedArticleId>").append(articleId).append("</ratedArticleId>");
            ratingXML.append("<ratedByMember>").append(loggedUser).append("</ratedByMember>");
            ratingXML.append("<ratedScore>").append(ratedScore).append("</ratedScore>");
            ratingXML.append("</rating>");
            
            new RatingDAO().createInitialRating(db,ratingXML.toString(),loggedUser);
            
            return articleId;
        }
        else
        {
            // Throw exception if xml is invalid
            throw new InvalidXMLException();
        }
    }
    
    public String getArticlesCount(ObjectContainer db)
    {
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return true;
            }
        });
        
        String articlesCount = Integer.toString(result.size());
        
        return articlesCount;
    
    }        

    
    
    public boolean isThisArticleRatedByLoggedUser(ObjectContainer db, final String articleId, final String loggedUser)
    {
        ObjectSet<RatingVO> ratingResult = db.query(new Predicate<RatingVO>()
        {
            public boolean match(RatingVO ratingVo)
            {
                return ratingVo.getRatedArticleId().equals(articleId) &&
                        ratingVo.getRatedByMember().getmemberEmail().equals(loggedUser);
            }
        });

        if(ratingResult.hasNext())
        {
            return true;
        }
        else
        {    
            return false;
        }    
    }
    
    
    public String getArticlePosterUsername(ObjectContainer db, final String articleId)
    {
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return articleVo.getArticleId().equals(articleId);

            }
        });

        // If article Object exists!
        if (result.hasNext())
        {
            return result.next().getPostedBy().getmemberEmail();
        }
        else
            return null;
    
    }        
    
    
    public boolean isRatedScoreValid(Float ratedScore)
    {
        ArrayList<Float> validScores = new ArrayList<Float>();
        
        validScores.add(Float.valueOf("1"));
        validScores.add(Float.valueOf("2"));
        validScores.add(Float.valueOf("3"));
        validScores.add(Float.valueOf("4"));
        validScores.add(Float.valueOf("5"));
        validScores.add(Float.valueOf("6"));
        validScores.add(Float.valueOf("7"));
        validScores.add(Float.valueOf("8"));
        validScores.add(Float.valueOf("9"));
        validScores.add(Float.valueOf("10"));
        
        if(validScores.contains(Float.valueOf(ratedScore)))
        {    
            return true;
        }
        else
            return false;
    }   
    
    
    public boolean isArticleIdValid(ObjectContainer db, final String articleId)
    {
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return articleVo.getArticleId().equals(articleId);

            }
        });

        // If article Object exists!
        if (result.hasNext())
        {
            return true;
        }
        else
            return false;
    
    }        
    

    /* Function to update news article information with total vote count and avg. rating */

    public  String updateArticleRatings (ObjectContainer db, final String articleId, Float ratedScore, String loggedUser)
    {
        
        // Get article Object from the DB
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return articleVo.getArticleId().equals(articleId);

            }
        });

        // If article Object exists!
        if (result.hasNext())
        {
            ArticleVO tmpArticle = result.next();

            // Increment and store vote count in the Object

            int previousVoteCount = tmpArticle.getVotesCount();
            float previousAverageRating = tmpArticle.getAverageRating();

            XMLUtilities.log.write("ratedScore is: " + ratedScore);
            
            XMLUtilities.log.write("previousVoteCount- " + previousVoteCount + " previousAverageRating- " + previousAverageRating);
            
            int newVoteCount = previousVoteCount + 1;

            float newAverageRating = ((previousVoteCount * previousAverageRating) +  ratedScore) / (newVoteCount);

            XMLUtilities.log.write("newVoteCount- " + newVoteCount + " newAverageRating- " + newAverageRating);
            
            tmpArticle.setVotesCount(newVoteCount);
            tmpArticle.setAverageRating(newAverageRating);
            
            // Store object in the DB
            db.store(tmpArticle);
            return tmpArticle.toXML();
        }
        else
        {
            return null;
        }
    }


    /* Function to update news article information with total comments count */

    public void updateArticleCommentsCount(ObjectContainer db, final String articleId, String decision)
    {
        // Get article Object from the DB
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return articleVo.getArticleId().equals(articleId);

            }
        });


        // If article Object exists!
        if (result.hasNext())
        {
            ArticleVO tmpArticle = result.next();
            
            int previousCommentsCount = tmpArticle.getCommentsCount();
            int newCommentsCount;
            
            if(decision.equals("add"))
             newCommentsCount = previousCommentsCount + 1;
            else
             newCommentsCount = previousCommentsCount - 1;

            tmpArticle.setCommentsCount(newCommentsCount);

            // Store object in the DB
            db.store(tmpArticle);
        }

    }
    
    public String deleteStory(ObjectContainer db, final String articleId, String loggedUser)
    {
        String articlePoster = "";
        ArticleVO articleVo = new ArticleVO();
        
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return articleVo.getArticleId().equals(articleId);
            }
        });

        
        if (result.hasNext())
        {
            articleVo = result.next();
            articlePoster = articleVo.getPostedBy().getmemberEmail();
        }
        
        if(loggedUser.equals(articlePoster))
        {
            new CommentDAO().deleteCommentsForArticle(db, articleId);
            new OutboxDAO().removeOutboxReferencesForArticle(db, articleId);
            new RatingDAO().deleteRatingsForArticle(db, articleId);

            db.delete(articleVo);
            return "0";  //Success
        }
        else
        {
            throw new WebApplicationException(401);
        }    
    }
    
            
    public void updateArticleSharesCount(ObjectContainer db, final String articleId)
    {
        // Get article Object from the DB
        ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
        {
            public boolean match(ArticleVO articleVo)
            {
                return articleVo.getArticleId().equals(articleId);

            }
        });


        // If article Object exists!
        if (result.hasNext())
        {
            ArticleVO tmpArticle = result.next();
            
            int previousSharesCount = tmpArticle.getSharesCount();
            int newSharesCount = previousSharesCount + 1;

            tmpArticle.setSharesCount(newSharesCount);

            // Store object in the DB
            db.store(tmpArticle);
        }
    }
             
   
    /* Function to retrieve the news articles in the XML format for the specific member*/

    public  String getArticlesXmlForMember(ObjectContainer db,String membername, int pageNumber)
    {
        List<ArticleVO> result = getArticlesForMember(db,membername);
        int MAXARTICLES = 10;
        
        int class_size = result.size();
        double pageCount = ((double) (class_size) / MAXARTICLES);

        StringBuilder articles = new StringBuilder();
        articles.append("<articles>");
        
        // Get the total count of all retrieved articles and append it to output xml
        articles.append("<pagecount>").append(pageCount).append("</pagecount>");
        //articles.append("<count>").append(result.size()).append("</count>");

        int pageStartIndex = (pageNumber * MAXARTICLES) - MAXARTICLES;
        int pageEndIndex = (pageNumber * MAXARTICLES);
        
        if(class_size < pageEndIndex)
            pageEndIndex = class_size; 
        

        if(class_size > 0)
        {
            for( int i=pageStartIndex;i<pageEndIndex;i++)
            {
                ArticleVO result_article = result.get(i);
                articles.append(result_article.toXML());
            }

        }
        
        articles.append("</articles>");
        return articles.toString();
    }



    /* Function to retrieve the news articles' Objects for the specific member*/
    private  List<ArticleVO> getArticlesForMember(ObjectContainer db,final String memberName)
    {
        List<ArticleVO> list = null;

        // Check if member already exists
        final MemberVO memberVO = new MemberDAO().query(db,memberName);

        if (memberVO == null)
        {
            // If member does not exist, return empty list
            return new ArrayList<ArticleVO>();
        }

        Query query = db.query();
        query.constrain(ArticleVO.class);
        query.descend("postedBy").descend("memberEmail").constrain(memberName);
        
        ArticleDateSort datesort = new ArticleDateSort();
        query.sortBy(datesort);
        
        list = query.execute();

        // Return the Arraylist
        return (list == null) ? new ArrayList<ArticleVO>() : list;
    }




    /* Function to get 10 random news articles for the bootstrapping process at the client side */

    public  String getBootstrapArticles(ObjectContainer db, final String userName, String category, int pageNumber)
    {
        StringBuilder articles = new StringBuilder();
        

        int MAXARTICLES = 10;

        articles.append("<articles>");
        articles.append("<pagecount>");

        Query query = db.query();
        query.constrain(ArticleVO.class);
        query.descend("postedBy").descend("memberEmail").constrain(userName).not();
        
        if(!category.equalsIgnoreCase("all"))
             query.descend("category").constrain(category);
        
        ArticleDateSort datesort = new ArticleDateSort();
        query.sortBy(datesort);
        
        ObjectSet<ArticleVO> articleResult = query.execute();

        int class_size = articleResult.size() ;
        double pageCount = ((double) (class_size) / MAXARTICLES);
        
        articles.append(pageCount);
        articles.append("</pagecount>");

        int pageStartIndex = (pageNumber * MAXARTICLES) - MAXARTICLES;
        int pageEndIndex = (pageNumber * MAXARTICLES);
        
        if(class_size < pageEndIndex)
            pageEndIndex = class_size; 

        if(class_size > 0)
        {
            for( int i=pageStartIndex;i<pageEndIndex;i++)
            {
                ArticleVO result_article = articleResult.get(i);
                articles.append(result_article.toXML());
            }
        }

        articles.append("</articles>");
        return articles.toString();
    }
    
    
    public  String getContinueUnregisteredArticles(ObjectContainer db,String category, int pageNumber)
    {
        StringBuilder articles = new StringBuilder();
        int MAXARTICLES = 10;

        articles.append("<articles>");
        articles.append("<pagecount>");

        Query query = db.query();
        query.constrain(ArticleVO.class);
        
        if(!category.equalsIgnoreCase("all"))
             query.descend("category").constrain(category);
        
        ArticleDateSort datesort = new ArticleDateSort();
        query.sortBy(datesort);

        ObjectSet<ArticleVO> articleResult = query.execute();
        
        int class_size = articleResult.size();
        double pageCount = ((double) (class_size) / MAXARTICLES);
        
        articles.append(pageCount);
        articles.append("</pagecount>");
        
        int pageStartIndex = (pageNumber * MAXARTICLES) - MAXARTICLES;
        int pageEndIndex = (pageNumber * MAXARTICLES);
        
        if(class_size < pageEndIndex)
            pageEndIndex = class_size; 

        if(class_size > 0)
        {
            for( int i=pageStartIndex;i<pageEndIndex;i++)
            {
                ArticleVO result_article = articleResult.get(i);
                articles.append(result_article.toXML());
            }

        }
        
        articles.append("</articles>");
        return articles.toString();
    
    }        


    private void setDafaultInboxCategoriesForThisUser(ObjectContainer db,MemberVO memberVo)
    {
        XMLUtilities.log.write("Setting default inbox categories for user " + memberVo.getMembername().getmemberEmail() );

        ArrayList<String> inboxCategoryList11 = new ArrayList<String>();
                
        inboxCategoryList11.add("Video");
        inboxCategoryList11.add("Picture");
        inboxCategoryList11.add("Blog");
        inboxCategoryList11.add("World News");
        inboxCategoryList11.add("Business");
        inboxCategoryList11.add("Politics");
        inboxCategoryList11.add("Science/Technology");
        inboxCategoryList11.add("Nature");
        inboxCategoryList11.add("Comedy");
        inboxCategoryList11.add("Gaming");
        inboxCategoryList11.add("Culture");
        inboxCategoryList11.add("Travel");
        inboxCategoryList11.add("Health");
        inboxCategoryList11.add("Lifestyle");
        inboxCategoryList11.add("Entertainment");
        inboxCategoryList11.add("Sports");
        inboxCategoryList11.add("Other");

        memberVo.setInboxCategoryList(inboxCategoryList11);
        
        db.store(memberVo);
        
        XMLUtilities.log.write("Done! inbox categories for user" + memberVo.getMembername().getmemberEmail() + " are set ");
    }  
    
    
    public String getInboxArticles(final String loggedUser, ObjectContainer db, int pageNumber)
    {
        double ageCoefficient = 0.0;
        List<String> inboxCategoryList = new ArrayList<String>();
        Integer inboxCount = 0;
        Integer daysCount = 0;
        
        
        // Get user inbox settings
        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {
                return memberVo.getMembername().getmemberEmail().equalsIgnoreCase(loggedUser);
            }
        });
        
        if(result.hasNext())
        {    
            MemberVO memberVo = result.next();
            
            String tmpageCoefficient = memberVo.getAgeCoefficient();
            
            if(tmpageCoefficient.equals("Low"))
                ageCoefficient = 0.05;
            else if(tmpageCoefficient.equals("Medium"))
                ageCoefficient = 0.15;
            else
                ageCoefficient = 0.3;
            
            inboxCategoryList = memberVo.getInboxCategoryList();
            
            // Set dafault inbox categories for user
            if(inboxCategoryList == null)
            {    
                setDafaultInboxCategoriesForThisUser(db,memberVo);
                inboxCategoryList = memberVo.getInboxCategoryList();
            }
            
            daysCount = memberVo.getDaysCount();
            inboxCount= memberVo.getInboxCount();
        }           
        
        //Get friends for user , get their outboxes and make an unique array of all articles
        HashSet<String> uniqueArticleIdsSet = getUniqueArticleIdsSet(loggedUser,db);
        
        List<ArticleVO> inboxRankingInputArticles = new ArrayList<ArticleVO>();
        
        Iterator<String> iterator = uniqueArticleIdsSet.iterator();
  
        while (iterator.hasNext())
        {
            final String articleId = iterator.next();
            
            ObjectSet<ArticleVO> resultArticles = db.query(new Predicate<ArticleVO>()
            {
                public boolean match(ArticleVO articleVo)
                {
                    return articleVo.getArticleId().equals(articleId);
                }
            });

            if(resultArticles.hasNext())
            {
                ArticleVO articleVo = resultArticles.next();
                
                String articleCategory = articleVo.getCategory();

                boolean isInboxCategory = false;
                
                Iterator<String> iter = inboxCategoryList.iterator();

                while(iter.hasNext())
                {
                    String inboxCategoryListItem = iter.next();
                   
                    if(articleCategory.equals(inboxCategoryListItem))
                    {
                        isInboxCategory = true;
                        break;
                    }   
                }
                
                
                String articlePostedDate = articleVo.getDatePosted();
                Date dateArticlePosted = XMLUtilities.convertStringToGMTDate(articlePostedDate, 0);
                
                double daysdiff = new XMLUtilities().getArticleAgeSeconds(dateArticlePosted) / 86400;
                
                if((isInboxCategory) && (daysdiff <= daysCount))
                    inboxRankingInputArticles.add(articleVo);
            }    
            
        }
        
        return getInboxTopArticles(db, loggedUser, inboxRankingInputArticles, ageCoefficient, inboxCount,pageNumber);
    }        
    
    
    
    public HashSet<String> getUniqueArticleIdsSet(String member, ObjectContainer db)
    {
        Query query = db.query();
        query.constrain(TrustVO.class);
        
        Constraint constraintMember = query.descend("trustFromMember").descend("memberEmail").constrain(member);
        Constraint constraintnotMember = query.descend("trustToMember").descend("memberEmail").constrain(member).not();
        
        query.descend("trustScore").constrain(new Float(0.55)).greater().and(constraintMember).and(constraintnotMember);
        query.descend("trustScore").orderDescending();
        
        ObjectSet<TrustVO> result = query.execute();

        HashSet<String>articleIdSet = new HashSet<String>();
        
        while (result.hasNext())
        {
            TrustVO trustVo = result.next();
            
            final String memberFriend = trustVo.getTrustToMember().getmemberEmail();
            
            ObjectSet<OutboxVO> resultOutbox = db.query(new Predicate<OutboxVO>()
            {
                public boolean match(OutboxVO outboxVo)
                {
                    return outboxVo.getOutboxFor().getmemberEmail().equals(memberFriend);
                }
            });

            // If outbox Object exists, build an output xml
            if(resultOutbox.hasNext())
            {
                OutboxVO outboxVo = resultOutbox.next();
                
                List<String> tmpArticleListOutboxInbox = outboxVo.getOutboxInbox();
                articleIdSet.addAll(tmpArticleListOutboxInbox);
                
                List<String> tmpArticleListOutboxSubmitted = outboxVo.getOutboxSubmitted();
                articleIdSet.addAll(tmpArticleListOutboxSubmitted);
            }
        }
        
        return articleIdSet;
    
    }
    
   
    public String getSocionTopArticles(ObjectContainer db, String category)
    {
        
        final double TOP_NEWS_AGE_COEFF = 0.025;
        final int MAX_TOP_NEWS = 10;
        
        Query query = db.query();
        query.constrain(ArticleVO.class);
        query.descend("votesCount").constrain(new Integer(1)).greater();
        
        if((!category.equals("All")))
                query.descend("category").constrain(category);
        
        ObjectSet<ArticleVO> allArticlesResult = query.execute();
        
        return getTopArticles(db, allArticlesResult, TOP_NEWS_AGE_COEFF, MAX_TOP_NEWS);
    }        
    
   
    public String getFavouriteArticles(ObjectContainer db ,String memberName,int pageNumber)
    {
        List<String> articlesList = new ArrayList<String>();
        
        Query query = db.query();
        query.constrain(RatingVO.class);
        Constraint constraintMember = query.descend("ratedByMember").descend("memberEmail").constrain(memberName);
        query.descend("ratedScore").constrain(new Float(10.0)).equal().and(constraintMember);
        ObjectSet<RatingVO> ratingArticlesResult = query.execute();
        
        while(ratingArticlesResult.hasNext())
        {
            RatingVO ratingVo = ratingArticlesResult.next();
            String ratedArticleId = ratingVo.getRatedArticleId();
            articlesList.add(ratedArticleId);
        }
        
        return getFavouriteArticlesXmlForArticleIds(db,articlesList,memberName,pageNumber);

    }     
    
        /* Function to get article-id specific information from the DB */
    private  String getFavouriteArticlesXmlForArticleIds(ObjectContainer db, List<String> articleIds,final String loggedUser,int pageNumber)
    {
        ArrayList<ArticleVO> newList = new ArrayList<ArticleVO>();

        Iterator<String> iter = articleIds.iterator();
        
        while(iter.hasNext())
        {
           final String articleId = iter.next();

           // Get article Object for the specific article-id from the DB

           ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
           {
               public boolean match(ArticleVO articleVo)
               {
                     return !(articleVo.getPostedBy().getmemberEmail().equals(loggedUser)) &&
                     articleVo.getArticleId().equals(articleId);
               }
           });


           if (result.hasNext())
           {
                newList.add(result.next());
           }

           // sort Arraylist in descending order of news posted date
           ArticleDateSort datesort = new ArticleDateSort();
           Collections.sort(newList, datesort);

        }

        return getFavouriteArticlesXmlStructure(newList,pageNumber);

    }


    /* Function to convert news articles' Objects to XML format */

    private  String getFavouriteArticlesXmlStructure(List<ArticleVO> result,int pageNumber)
    {
        StringBuilder articles = new StringBuilder();
        int MAXARTICLES = 10;
        
        articles.append("<articles>");
        // Get the total count of all retrieved articles and append it to output xml
        articles.append("<count>").append(result.size()).append("</count>");
        
        int class_size = result.size();
        double pageCount = ((double) (class_size) / MAXARTICLES);
        
        articles.append("<pagecount>").append(pageCount).append("</pagecount>");
        
        int pageStartIndex = (pageNumber * MAXARTICLES) - MAXARTICLES;
        int pageEndIndex = (pageNumber * MAXARTICLES);
        
        if(class_size < pageEndIndex)
            pageEndIndex = class_size; 
        
        if(class_size > 0)
        {
            for( int i=pageStartIndex;i<pageEndIndex;i++)
            {
                ArticleVO result_article = result.get(i);
                articles.append(result_article.toXML());
            }

        }

        articles.append("</articles>");
        return articles.toString();
    }

    
    
    
    public String getTopArticles(ObjectContainer db, List<ArticleVO> allArticlesResult, double agecoefficient, int maxToparticles)
    {
            StringBuilder topArticles = new StringBuilder();
            int totalAllVotes = 0;
            double totalAllAvgRating = 0.0;
            
            Map<String,Double> rankedArticles = new HashMap<String,Double>();
            
            topArticles.append("<toparticles>");
            
            int totalAllArticles = allArticlesResult.size();
            Iterator<ArticleVO> allArticlesResultIterator = allArticlesResult.iterator();
            
            while (allArticlesResultIterator.hasNext())
            {
                ArticleVO article = allArticlesResultIterator.next();
                totalAllVotes = totalAllVotes + article.getVotesCount();
                totalAllAvgRating = totalAllAvgRating + article.getAverageRating();
            }
            
            if(totalAllArticles < maxToparticles)
                maxToparticles = totalAllArticles;
            
            allArticlesResultIterator = allArticlesResult.iterator();
            
            //Traverse through resultset and build output xml
            while (allArticlesResultIterator.hasNext())
            {
                double factorA,factorB,factorD;
                int factorC;
                long factorE;

                Double rankScore ;
                
                ArticleVO article = allArticlesResultIterator.next();
                
                String articleId = article.getArticleId();
                int articleTotalVotes = article.getVotesCount();
                double articleAvgRating = article.getAverageRating();
                
                String tmpDatePosted = article.getDatePosted();
                
                Date dateArticlePosted = XMLUtilities.convertStringToGMTDate(tmpDatePosted, 0);
                
                factorA = totalAllVotes / totalAllArticles;
                factorB = totalAllAvgRating / totalAllArticles;
                factorC = articleTotalVotes;
                factorD = articleAvgRating;
                
                factorE = new XMLUtilities().getArticleAgeSeconds(dateArticlePosted);
                
                rankScore = (((factorA * factorB) + (factorC * factorD)) / (factorA + factorC)) / (Math.pow(factorE,agecoefficient));
                rankedArticles.put(articleId, rankScore);
            }
            
            Map<String,Double> sortedRankedArticles = Util.SortMap.sortByComparator(rankedArticles);
            
            topArticles.append("<count>").append(maxToparticles).append("</count>");
            
            for (Map.Entry entry : sortedRankedArticles.entrySet()) 
            {
                int topArticleIdcounter = 1;
                String topArticleId = (String)entry.getKey();
                topArticles.append(getArticlesXMLForArticleId(db,topArticleId));
                
                if(topArticleIdcounter++ == maxToparticles)
                    break;
            }
            
            topArticles.append("</toparticles>");
            
            return topArticles.toString();
    }        


    
    
    public String getInboxTopArticles(ObjectContainer db, final String loggedUser, List<ArticleVO> allArticlesResult, double agecoefficient, int maxToparticles, int pageNumber)
    {
            StringBuilder topArticles = new StringBuilder();
            int totalAllVotes = 0;
            double totalAllAvgRating = 0.0;
            
            Map<String,Double> rankedArticles = new HashMap<String,Double>();
            
            topArticles.append("<toparticles>");
            
            int totalAllArticles = allArticlesResult.size();
            Iterator<ArticleVO> allArticlesResultIterator = allArticlesResult.iterator();
            
            while (allArticlesResultIterator.hasNext())
            {
                ArticleVO article = allArticlesResultIterator.next();
                totalAllVotes = totalAllVotes + article.getVotesCount();
                totalAllAvgRating = totalAllAvgRating + article.getAverageRating();
            }
            
            if(totalAllArticles < maxToparticles)
                maxToparticles = totalAllArticles;
            
            allArticlesResultIterator = allArticlesResult.iterator();
            
            //Traverse through resultset and build output xml
            while (allArticlesResultIterator.hasNext())
            {
                double factorA,factorB,factorD;
                int factorC;
                long factorE;
                double factorF;

                Double rankScore ;
                
                ArticleVO article = allArticlesResultIterator.next();
                
                String articleId = article.getArticleId();
                int articleTotalVotes = article.getVotesCount();
                double articleAvgRating = article.getAverageRating();
                final String articlePoster = article.getPostedBy().getmemberEmail();
                
                String tmpDatePosted = article.getDatePosted();
                
                Date dateArticlePosted = XMLUtilities.convertStringToGMTDate(tmpDatePosted, 0);
                
                factorA = totalAllVotes / totalAllArticles;
                factorB = totalAllAvgRating / totalAllArticles;
                factorC = articleTotalVotes;
                factorD = articleAvgRating;
                
                factorE = new XMLUtilities().getArticleAgeSeconds(dateArticlePosted);
                
                
                ObjectSet<TrustVO> trustResult = db.query(new Predicate<TrustVO>()
                {
                    public boolean match(TrustVO trustVo)
                    {
                        return trustVo.getTrustFromMember().getmemberEmail().equals(loggedUser) ||
                               trustVo.getTrustToMember().getmemberEmail().equals(articlePoster); 
                    }
                });

                if(trustResult.hasNext())
                {
                   factorF =  trustResult.next().getTrustScore();
                }
                else
                   factorF = 1.0;
                
                rankScore = ((((factorA * factorB) + (factorC * factorD)) / (factorA + factorC)) / (Math.pow(factorE,agecoefficient))) * (factorF);
                rankedArticles.put(articleId, rankScore);
            }
            
            LinkedHashMap<String,Double> sortedRankedArticles = Util.SortMap.sortByComparator(rankedArticles);
            
            //---
            for (Map.Entry entry : sortedRankedArticles.entrySet()) 
            {
        	System.out.println("Key : " + entry.getKey() + " Value : " + entry.getValue());
            }
            //--
            
            
            List articleIdsList = new LinkedList(sortedRankedArticles.keySet());
            
            int MAXARTICLES = 10;
            
            
            double pageCount = ((double) (maxToparticles) / MAXARTICLES);
            
            topArticles.append("<pagecount>").append(pageCount).append("</pagecount>");
            topArticles.append("<count>").append(maxToparticles).append("</count>");
            
            int pageStartIndex = (pageNumber * MAXARTICLES) - MAXARTICLES;
            int pageEndIndex = (pageNumber * MAXARTICLES);
        
            if(maxToparticles < pageEndIndex)
                pageEndIndex = maxToparticles; 
            
            
            
            
            if(maxToparticles > 0)
            {
                for( int i=pageStartIndex;i<pageEndIndex;i++)
                {
                    String topArticleId = (String) articleIdsList.get(i);
                    topArticles.append(getArticlesXMLForArticleId(db,topArticleId));
                    
                }
            }
            
            topArticles.append("</toparticles>");
            
            return topArticles.toString();
    }        

    
    

    /* Function to get article-id specific information from the DB */

    public  String getArticlesXMLForArticleId(ObjectContainer db, final String articleId)
    {
            // retrieve user specific data in the form of a ArticleVO Object

            ObjectSet<ArticleVO> result = db.query(new Predicate<ArticleVO>()
            {
                public boolean match(ArticleVO articleVo)
                {
                    return articleVo.getArticleId().equals(articleId);

                }
            });


            if (result.hasNext())
            {
                return result.next().toXML();
            }
            else
            {
                return null;
            }
    }



    
    
    public String searchNews(ObjectContainer db, String searchString, int pageNumber)
    {
        final String [] searchItemArray = searchString.split("\\s+");
        StringBuilder articles = new StringBuilder();
        int MAXARTICLES = 10;
        
        int searchItemArrayLength = searchItemArray.length; 
        
        //Form output xml for articles list
        articles.append("<articles>");
       
        Query query = db.query();
        query.constrain(ArticleVO.class);

        for(int i=0; i < searchItemArrayLength; i++ )
        {    
            // case insensitive search
            query.descend("title").constrain(searchItemArray[i]).like();
        }
        
        ArticleDateSort datesort = new ArticleDateSort();
        query.sortBy(datesort);
        
        ObjectSet<ArticleVO> result = query.execute();
        
        int class_size = result.size();
        double pageCount = ((double) (class_size) / MAXARTICLES);

        
        articles.append("<pagecount>").append(pageCount).append("</pagecount>");
        articles.append("<count>").append(class_size).append("</count>");

        
        int pageStartIndex = (pageNumber * MAXARTICLES) - MAXARTICLES;
        int pageEndIndex = (pageNumber * MAXARTICLES);
        
        if(class_size < pageEndIndex)
            pageEndIndex = class_size; 
        

        if(class_size > 0)
        {
            for( int i=pageStartIndex;i<pageEndIndex;i++)
            {
                ArticleVO result_article = result.get(i);
                articles.append(result_article.toXML());
            }
        }


        articles.append("</articles>");
        return articles.toString();
    }   
      
    
    
    
    
    public String readArticleUrlHeaderParameters(ObjectContainer db, String webUrl) throws InvalidURLException
    {
        Document doc = null;
        StringBuilder xml = new StringBuilder();
        Map<String,String> UrlParameters = new HashMap<String,String>();

        try
        {    
            if(XMLUtilities.getResponseCode(webUrl) != 404)
                doc = Jsoup.connect(webUrl).get();
            else
                throw new InvalidURLException();

            String webTitle = doc.select("title").text();

            UrlParameters.put("Title", webTitle);

            Elements metalinks = doc.select("meta");

            for (Element singlemeta : metalinks) 
            {
                
                String metatagproperty = singlemeta.attr("property");
                
                if((metatagproperty.equalsIgnoreCase("og:title")))
                {
                    if(UrlParameters.get("Title") == null)
                    {    
                        webTitle = singlemeta.attr("content");
                        UrlParameters.put("Title", webTitle);
                    }    
                }    

                
                String metatagname = singlemeta.attr("name");
                
                if((metatagname.equalsIgnoreCase("description")))
                {    
                    String webDescription = singlemeta.attr("content");
                    UrlParameters.put("Description", webDescription);
                }

                
                if((metatagproperty.equalsIgnoreCase("og:description")))
                {
                    if(UrlParameters.get("Description") == null)
                    {    
                        String webDescription = singlemeta.attr("content");
                        UrlParameters.put("Description", webDescription);
                    }    
                }


                if((metatagproperty.equalsIgnoreCase("og:image")))
                {
                    String webImage = singlemeta.attr("content");
                    UrlParameters.put("Image", webImage);
                }        

            }

            /*for (Map.Entry entry : UrlParameters.entrySet()) 
            {
        	System.out.println("Key : " + entry.getKey() + " Value : " + entry.getValue());
            }*/
            
            for (Map.Entry entry : UrlParameters.entrySet()) 
            {
                if(entry.getValue().toString().trim().isEmpty())
                {    
                    entry.setValue(" ");
                    continue;
                }
                else
                {
                    String mapValue = entry.getValue().toString();

                    if(mapValue.contains("\n"))
                    {    
                        mapValue = mapValue.replaceAll("\\s+", " ");
                        entry.setValue(mapValue);
                    }
                    
                    if(mapValue.contains("&"))
                    {    
                        mapValue = mapValue.replaceAll("&", "&amp;");
                        entry.setValue(mapValue);
                    }
                    
                    if(mapValue.contains("<"))
                    {    
                        mapValue = mapValue.replaceAll("<", "&lt;");
                        entry.setValue(mapValue);
                    }
                    
                    if(mapValue.contains(">"))
                    {    
                        mapValue = mapValue.replaceAll(">", "&gt;");
                        entry.setValue(mapValue);
                    }
                    
                    if(mapValue.contains("\""))
                    {    
                        mapValue = mapValue.replaceAll("\"", "&quot;");
                        entry.setValue(mapValue);
                    }
                    
                    if(mapValue.contains("'"))
                    {    
                        mapValue = mapValue.replaceAll("\"", "&apos;");
                        entry.setValue(mapValue);
                    }

                }   
                    
                    
            }
            
            
            // Generate XML for member data
            xml.append("<urlinfo>");
            xml.append("<urltitle>").append(UrlParameters.get("Title")).append("</urltitle>");
            xml.append("<urldescription>").append(UrlParameters.get("Description")).append("</urldescription>");
            xml.append("<urlimage>").append(UrlParameters.get("Image")).append("</urlimage>");
            xml.append("</urlinfo>");

        }
        catch(MalformedURLException e)
        {
            throw new InvalidURLException();
        }    
        catch(IllegalArgumentException e)
        {
            throw new InvalidURLException();
        }    
        catch(IOException e)
        {

        }

        return xml.toString();
    }

}
