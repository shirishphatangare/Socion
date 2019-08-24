package Data_access_layer;

import Util.XMLUtilities;

import com.db4o.ObjectContainer;

import Util.InvalidXMLException;
import Util.ItemNotFoundException;
import com.db4o.ObjectSet;
import com.db4o.query.Constraint;
import com.db4o.query.Predicate;
import com.db4o.query.Query;
import java.util.ArrayList;
import javax.ws.rs.WebApplicationException;
import model.MemberNameVO;
import model.TrustVO;

public class TrustDAO
{

    /* Function to create the bidirectional default trust relationships for the new user */

    public  String createDefaultTrusts(ObjectContainer db, final String initialUser)
    {
        
        ObjectSet<TrustVO> trustResult = db.query(new Predicate<TrustVO>()
        {
            public boolean match(TrustVO trustVo)
            {
                return trustVo.getTrustFromMember().getmemberEmail().equals(initialUser) ||
                       trustVo.getTrustToMember().getmemberEmail().equals(initialUser); 
            }
        });

        if(trustResult.hasNext())
        {
            throw new WebApplicationException(401);
        }   
        
        
        int trustcounter = 0;
        MemberNameVO initialuserMemberVo = new MemberNameVO() ;

        ObjectSet<MemberNameVO> parameterMemberNameVo = db.query(new Predicate<MemberNameVO>()
        {
            public boolean match(MemberNameVO memberNameVo)
            {
                return memberNameVo.getmemberEmail().equals(initialUser);
            }
        });

        if(parameterMemberNameVo.hasNext())
            initialuserMemberVo = parameterMemberNameVo.next();

        // Get all the member Objects from the DB i.e. Member class

        ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
        {
            public boolean match(MemberNameVO memberNameVo)
            {
                return true;
            }
        });


        // Get the count for the result-set
        int membercounter = result.size();

        // Traverse through the result-set
        while (result.hasNext())
        {
            // Read the membername
            MemberNameVO membernameVo = result.next();

            // Create default trust relationships for New User --> other users
            if(!membernameVo.getmemberEmail().equals(initialUser))
            {
                TrustVO trustVO =  new TrustVO(initialuserMemberVo, membernameVo, new Float(0.55), new Integer(1));

                if (trustVO != null)
                {
                    // Store default trust relationships
                    db.store(trustVO);
                    trustcounter++;
                }


                // Create default trust relationships for other users --> New User
                TrustVO trustVO1 =  new TrustVO(membernameVo, initialuserMemberVo, new Float(0.55), new Integer(1));

                if (trustVO1 != null)
                {
                    // Store default trust relationships
                    db.store(trustVO1);
                    trustcounter++;
                }

            }
            else
            {
                TrustVO trustVO2 = new TrustVO(initialuserMemberVo, membernameVo, new Float(1.0), new Integer(1));

                if (trustVO2 != null)
                {
                    // Store default trust relationship
                    db.store(trustVO2);
                    trustcounter++;
                }

            }

        }

        // If default trust created with all the users in the system , return Success otherwise return Failure
        if(trustcounter == ((--membercounter * 2) + 1))
        {    
            XMLUtilities.log.write("Success! Default trusts created for user " + initialUser);
            return "0";  //Success
        }
        else
            return "1";
    }

    
    public boolean isTrustScoreValid(String trustScore)
    {
        ArrayList<Float> validScores = new ArrayList<Float>();
        
        validScores.add(Float.valueOf("0.775"));
        validScores.add(Float.valueOf("0.325"));
        
        if(validScores.contains(Float.valueOf(trustScore)))
            return true;
        else
            return false;
    
    }        
    

    /* Function to update trust relationships  */

    public  String updateTrustByRating(ObjectContainer db, Float ratedScore, String trustFrom, String trustTo, String loggedUser) throws ItemNotFoundException
    {
        
        TrustVO trustVo = getFromToTrustVO(db,trustFrom,trustTo,loggedUser);
        

        if (trustVo != null)
        {
            // Get new values for Trust-score and Total Votes from the TrustVO Object created from input XML
            Float previousTrustscore = trustVo.getTrustScore();
            Integer previousTotalvotes = trustVo.getTotalVotes();
            
            XMLUtilities.log.write("previousTrustscore -" + previousTrustscore + " previousTotalvotes - " + previousTotalvotes);
            
            Integer newTotalvotes = previousTotalvotes + 1;
            Float newTrustscore = (previousTrustscore * (previousTotalvotes * 10) + ratedScore) / (newTotalvotes * 10) ;
            
            if(newTrustscore >= 0.9)
                newTrustscore = Float.valueOf("0.775");
                
            if(newTrustscore <= 0.2)
                newTrustscore = Float.valueOf("0.325");
            
            XMLUtilities.log.write("newTrustscore- " + newTrustscore + " newTotalvotes- " + newTotalvotes);
            
            trustVo.setTotalVotes(newTotalvotes);    
            trustVo.setTrustScore(newTrustscore);
            
            
            // Store changed data in the database
            db.store(trustVo);
            return trustVo.toXML();
        }
        else
        {
            // Throw exception in case of invalid input XML
            throw new ItemNotFoundException();
        }
    }

    
    
    /* Function to update trust relationships  */

    public  String updateTrust(ObjectContainer db, String trustScore, String trustFrom, String trustTo, String loggedUser) throws ItemNotFoundException
    {
        TrustVO trustVo = getFromToTrustVO(db,trustFrom, trustTo,loggedUser);

        if (trustVo != null)
        {
            trustVo.setTrustScore(Float.valueOf(trustScore));

            // Store changed data in the database
            db.store(trustVo);
            return trustVo.toXML();
        }
        else
        {
            // Throw exception in case of invalid input XML
            throw new ItemNotFoundException();
        }
    }


    /* Function to retrieve TrustVO object from the DB for usernames passed as parameters */

    protected  TrustVO query(ObjectContainer db, final String trustfrom, final String trustto)
    {
        ObjectSet<TrustVO> result = db.query(new Predicate<TrustVO>()
        {
            public boolean match(TrustVO trustVo)
            {
                return trustVo.getTrustFromMember().getmemberEmail().equals(trustfrom) &&
                       trustVo.getTrustToMember().getmemberEmail().equals(trustto);
            }
        });

        // Return TrustVO object if NOT null
        if (result.hasNext())
        {
            TrustVO trustVo = result.next();
            return trustVo;
        }
        else
        {
            return null;
        }
    }


    public TrustVO getFromToTrustVO(ObjectContainer db, String trustFrom, String trustTo, String loggedUser)
    {
        
        if(!loggedUser.equals(trustFrom))
            throw new WebApplicationException(401);
        
        return query(db, trustFrom, trustTo);
    }

    
    

    /* Function to get trust relationships for a pair of usernames (FROM-TO pair) or for the first username (FROM)*/

    public  String getFromToTrustScore(ObjectContainer db,String fromto, String loggedUser)
    {
        StringBuilder trusts = new StringBuilder();

        final String trustfrom,trustto;
        ObjectSet<TrustVO> result;

        trusts.append("<trusts>");

        // Separate two usernames from the input parameter
        String tmp_arr[] = fromto.split(" ");

        // trustfrom
        trustfrom = tmp_arr[0];

        //trustto
        if(tmp_arr.length == 2)
        {
            trustto = tmp_arr[1];
            
            if(!loggedUser.equals(trustfrom) && !loggedUser.equals(trustto))
                throw new WebApplicationException(401);
                

            result = db.query(new Predicate<TrustVO>()
            {
                public boolean match(TrustVO trustVo)
                {
                    return trustVo.getTrustFromMember().getmemberEmail().equals(trustfrom) &&
                           trustVo.getTrustToMember().getmemberEmail().equals(trustto);
                }
            });

        }
        else
        {
            result = db.query(new Predicate<TrustVO>()
            {
                public boolean match(TrustVO trustVo)
                {
                    return trustVo.getTrustFromMember().getmemberEmail().equals(trustfrom);
                }
            });
            
        }

        if (result.hasNext())
        {
            // Traverse through the resultset and form an output XML
            while (result.hasNext())
            {
                trusts.append(result.next().toXML());
            }

        }
        trusts.append("</trusts>");
        return trusts.toString();
    }


    public String getFriendsXml (ObjectContainer db, String member, String operation)
    {

        StringBuilder friends = new StringBuilder();

        friends.append("<friends>");

        Query query = db.query();
        query.constrain(TrustVO.class);
        Constraint constraintMember = null;
        Constraint constraintnotMember = null;
        
        if(operation.equals("from"))
        {
            constraintMember = query.descend("trustFromMember").descend("memberEmail").constrain(member);
            constraintnotMember = query.descend("trustToMember").descend("memberEmail").constrain(member).not();
        }
        
        if(operation.equals("to"))
        {
            constraintnotMember = query.descend("trustFromMember").descend("memberEmail").constrain(member).not();
            constraintMember = query.descend("trustToMember").descend("memberEmail").constrain(member);
        }    
        
        query.descend("trustScore").constrain(new Float(0.55)).greater().and(constraintMember).and(constraintnotMember);
        query.descend("trustScore").orderDescending();
        ObjectSet<TrustVO> result = query.execute();

        // retrieve user specific data in the form of a CommentVO Object
        friends.append("<count>").append(result.size()).append("</count>");

        while (result.hasNext())
        {

            friends.append (result.next().toXML());

        }
        friends.append("</friends>");

        return friends.toString();

    }

}