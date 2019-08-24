
package Data_access_layer;

import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.query.Predicate;
import model.MemberVO;


public class AuthenticationService
{

    /* Function to retrieve the unique token-id for the specific username and password pair */

    public String getTokenId(ObjectContainer db, final String username, final String password)
    {
            ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
            {
                public boolean match(MemberVO memberVo)
                {
                    return memberVo.getMembername().getmemberEmail().equals(username) &&
                           memberVo.getPassword().equals(password);

                }
            });


            // Return unique token-id of the MemberVO object
            if (result.hasNext())
            {
                return result.next().getTokenId();
            }
            else
            {
                return null;
            }
    }


    /* Function to check the validity of the token-id received from the client */
    
    public  boolean authenticate(ObjectContainer db,final String tokenId,final String username)
    {
        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {
                return memberVo.getTokenId().equals(tokenId) &&
                        memberVo.getMembername().getmemberEmail().equals(username);

            }
        });

        // If MemberVO object with specific token-id exists, return true, else return false
        if (result.hasNext())
        {
            return true;
        }
        else
        {
            return false;
        }
    }



    public String verifyPageTokenId(ObjectContainer db, final String tokenId)
    {

        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {
                return memberVo.getTokenId().equals(tokenId);

            }
        });


        if (result.hasNext())
        {
            return "0";
        }
        else
        {
            return "1";
        }
    }
}