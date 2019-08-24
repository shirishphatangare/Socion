package Data_access_layer;

import Util.*;
import model.MemberVO;

import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;

import com.db4o.query.Predicate;
import java.util.List;
import java.util.UUID;
import model.MemberNameVO;
import org.apache.commons.codec.binary.Base64;
import org.w3c.dom.Document;
import org.w3c.dom.Element;



public class MemberDAO
{
    
    /* Function to create a new user in the system */
    
    public  String createMember(ObjectContainer db,String xml) throws InvalidXMLException, MemberAlreadyExistsException
    {
        // Check if input xml is valid and if valid, retrieve MemberVO from input xml
        MemberVO memberVo = new XMLUtilities().getMemberVoFromXml(db,xml);
        String userName = memberVo.getMembername().getmemberEmail();
        
        if (memberVo != null)
        {
            // Check if member exists in the database if not, create and return unique token-id for it
            if (isUserCreated(db,userName) == false)
            {
                db.store(memberVo);
                new TrustDAO().createDefaultTrusts(db,userName);
                new OutboxDAO().createOutbox(db,userName);
                sendJoinSocionEmail(db,memberVo);
                return "0";
            }
            else
            {
                throw new MemberAlreadyExistsException();
            }
        }
        else
        {
            throw new InvalidXMLException();
        }
    }
    
    
            
    public  String createFacebookMember(ObjectContainer db,String xml) throws InvalidXMLException, MemberAlreadyExistsException
    {
        // Check if input xml is valid and if valid, retrieve MemberVO from input xml
        MemberVO memberVo = new XMLUtilities().getFacebookMemberVoFromXml(db,xml);
        String userName = memberVo.getMembername().getmemberEmail();
        
        if (memberVo != null)
        {
            
            // Check if member exists in the database if not, create and return unique token-id for it
            if (isUserCreated(db,userName) == false)
            {
                db.store(memberVo);
                new TrustDAO().createDefaultTrusts(db,userName);
                new OutboxDAO().createOutbox(db,userName);
                sendFacebookJoinSocionEmail(db,memberVo);
                return "0";
            }
            else
            {
                throw new MemberAlreadyExistsException();
            }
        }
        else
        {
            throw new InvalidXMLException();
        }
    }
    
    
    public boolean isUserCreated(ObjectContainer db, final String initialUser)
    {
        if (query(db,initialUser) == null)
        {
            return false;
        }    
        else
            return true;
    }        
    
    
    
    public void sendJoinSocionEmail(ObjectContainer db, MemberVO memberVo)
    {
            String fullname = memberVo.getMembername().toString();
            String username = memberVo.getMembername().getmemberEmail();
            //String receiverEmailID = memberVo.getMemberEmail();
            String receiverEmailID = username;
            
            String encodedPassword = memberVo.getPassword();

            byte[] decodedPassword = Base64.decodeBase64(encodedPassword.getBytes());

            String password = new String(decodedPassword);

            
            String emailSubject = "Registration successful at oursocion.com !";

            StringBuilder tmpEmailBody = new StringBuilder();
            
            tmpEmailBody.append("Hi ").append(fullname).append(",\n\n");
            tmpEmailBody.append("Congratulations! Your oursocion.com account is now active.").append("\n\n");
            tmpEmailBody.append("Your username is ").append(username).append("\n");
            tmpEmailBody.append("Your password is ").append(password).append("\n\n");
            tmpEmailBody.append("Regards,").append("\n");
            tmpEmailBody.append("oursocion.com team");
                    
            String emailBody = tmpEmailBody.toString();
            
            Util.MailSender.sendByEmail(receiverEmailID,emailSubject,emailBody);
                    
    }


    public void sendFacebookJoinSocionEmail(ObjectContainer db, MemberVO memberVo)
    {
            String fullname = memberVo.getMembername().toString();
            String receiverEmailID = memberVo.getMembername().getmemberEmail();
            
            String emailSubject = "Facebook Connect successful at oursocion.com !";

            StringBuilder tmpEmailBody = new StringBuilder();
            
            tmpEmailBody.append("Hi ").append(fullname).append(",\n\n");
            tmpEmailBody.append("Congratulations! Your oursocion.com-facebook connect is now active.").append("\n\n");
            tmpEmailBody.append("You can connect to oursocion.com with your Facebook username and password.").append("\n\n");
            tmpEmailBody.append("Regards,").append("\n");
            tmpEmailBody.append("oursocion.com team");
                    
            String emailBody = tmpEmailBody.toString();
            
            Util.MailSender.sendByEmail(receiverEmailID,emailSubject,emailBody);
    }
    

    /* Function to change password for the user */

    public  String updateMemberFromXml(ObjectContainer db, String passwordQuery, String loggedUser) throws MemberNotFoundException
    {
        // Check if input xml is valid and if valid, retrieve MemberVO from input xml
        String tmp_arr[] = passwordQuery.split(" ");

        String currentPassword = tmp_arr[0];
        String newPassword = tmp_arr[1];
        
        MemberVO memberVo = query(db, loggedUser, currentPassword);

        if (memberVo != null)
        {
            // Only registered member should change the password
            memberVo.setPassword(newPassword);
            // Store changed data in the database
            db.store(memberVo);

            return memberVo.toXML();

        }
        else // If member is not registered throw exception
        {
            throw new MemberNotFoundException();
        }
    }



    /* Function to change the algorithm configuration for the user */

    public  String updateMemberConfigfromXml(ObjectContainer db, String xml, String loggedUser) throws InvalidXMLException, MemberNotFoundException
    {
        // Check if input xml is valid and if valid, retrieve MemberVO from input xml
        MemberVO memberVo = new XMLUtilities().getMemberVoForUpdateConfigurationFromXml(xml);

        if (memberVo != null)
        {
            // Retrieve new settings of the algorithm for the user from the XML input
            String agecoeff = memberVo.getAgeCoefficient();

            List <String> inboxCategoryList = memberVo.getInboxCategoryList();

            Integer numinbox = memberVo.getInboxCount();

            Integer datesetting = memberVo.getDaysCount();
            

            // Retrieve existing member from the database
            MemberVO tmpMember = query(db, loggedUser);

            if (tmpMember != null) //If member is  registered, change the algorithm settings
            {
                tmpMember.setAgeCoefficient(agecoeff);

                tmpMember.setInboxCategoryList(inboxCategoryList);

                tmpMember.setInboxCount(numinbox);

                tmpMember.setDaysCount(datesetting);
                

                // Store changed settings in the database
                db.store(tmpMember);
                

                return tmpMember.toXML();
            }
            else // If member is not registered, throw exception
            {
                throw new MemberNotFoundException();
            }
        }
        else
        {
            throw new InvalidXMLException();
        }

    }



    /* Function to retrieve all the registered members' information from the DB */

    public  String getMembersXml(ObjectContainer db)
    {

        StringBuilder members = new StringBuilder();

        //Form output xml for members list
        members.append("<members>");

        // Get count of all the users in the DB and add it to output xml

        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {
                
                return true;
            }
        });

        members.append("<count>").append(result.size()).append("</count>");

        //Traverse through the resultset and form an output xml
        while (result.hasNext())
        {
            members.append(result.next().toXML());
        }

        members.append("</members>");
        return members.toString();
    }


    
    /* Function to form a query to retrieve user specific Object from the DB and convert it to XML form */

    public  String getMemberSpecificInfo(ObjectContainer db,String userName)
    {
        MemberVO memberVo = query(db,userName);
        return (memberVo != null) ? memberVo.toXML() : null;
    }



    /* Function to search member from given searchString */

    public String searchMember(ObjectContainer db, String searchString)
    {
        final String [] searchItemArray = searchString.split("\\s+");
        StringBuilder members = new StringBuilder();
        int searchResultCounter = 0;

        //Form output xml for members list
        members.append("<members>");
       
        ObjectSet<MemberNameVO> result = null;

        // Searching for first name
        if(searchItemArray.length == 1)
        {
            result = db.query(new Predicate<MemberNameVO>()
            {
                public boolean match(MemberNameVO memberNameVo)
                {
                    return (memberNameVo.getFirstName().toLowerCase().startsWith(searchItemArray[0].toLowerCase()) ||
                            memberNameVo.getLastName().toLowerCase().startsWith(searchItemArray[0].toLowerCase())) &&
                           !memberNameVo.getmemberEmail().equals("oursocion@gmail.com");
                }
            });

            while(result.hasNext())
            {
                 members.append(result.next().toXML());
                 ++searchResultCounter;
            }

        }

        // Searching for  first name + last name
        if(searchItemArray.length == 2)
        {
            searchResultCounter = 0;
            members = new StringBuilder();
            members.append("<members>");

            result = db.query(new Predicate<MemberNameVO>()
            {
                public boolean match(MemberNameVO memberNameVo)
                {

                    return (memberNameVo.getFirstName().equalsIgnoreCase(searchItemArray[0]) ||
                            memberNameVo.getLastName().equalsIgnoreCase(searchItemArray[0])) &&
                           (memberNameVo.getFirstName().toLowerCase().startsWith(searchItemArray[1].toLowerCase()) ||
                            memberNameVo.getLastName().toLowerCase().startsWith(searchItemArray[1].toLowerCase())) &&
                            !memberNameVo.getmemberEmail().equals("oursocion@gmail.com");
                }
            });

            while(result.hasNext())
            {
                 members.append(result.next().toXML());
                 ++searchResultCounter;

            }
        }

        members.append("<count>");
        members.append(searchResultCounter);
        members.append("</count>");

        members.append("</members>");
        return members.toString();

    }


    public String getMemberName(ObjectContainer db, final String memberName)
    {
            ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
            {
                public boolean match(MemberNameVO memberNameVo)
                {
                    return memberNameVo.getmemberEmail().equals(memberName);
                }
            });

            if(result.hasNext())
            {
                return result.next().toXML();

            }
            else
                return null;
    }




    public String getAllMemberNames(ObjectContainer db)
    {
             StringBuilder membernames = new StringBuilder();

            //Form output xml for members list
            membernames.append("<membernames>");

            ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
            {
                public boolean match(MemberNameVO memberNameVo)
                {
                    return !memberNameVo.getmemberEmail().equalsIgnoreCase("oursocion@gmail.com");
                }
            });

            membernames.append("<count>").append(result.size()).append("</count>");

            while(result.hasNext())
            {
                membernames.append(result.next().toXML());

            }
            
            membernames.append("</membernames>");
            return membernames.toString();
    }




    /* Function to retrieve user specific object from the DB with given username */
    
    public MemberVO query(ObjectContainer db, final String membername)
    {
        // Retrieve MemberVO object with a specific username

        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {
                return memberVo.getMembername().getmemberEmail().equalsIgnoreCase(membername);
            }
        });


        // Return MemberVO object for the specific user
        if (result.hasNext())
        {
            return result.next();
        }
        else
        {
            return null;
        }
    } 



    /* Function to retrieve user specific object from the DB, with given username and password */
    
    protected  MemberVO query(ObjectContainer db, final String membername, final String password )
    {
        // Retrieve MemberVO object with specific username and password
        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {

                return memberVo.getMembername().getmemberEmail().equals(membername) &&
                       memberVo.getPassword().equals(password);
            }
        });


        // Return MemberVO object
        if (result.hasNext())
        {
            return result.next();
        }
        else
        {
            return null;
        }
    }



    public String sendEmail(ObjectContainer db,final String userIdentity) throws MemberNotFoundException
    {
       
        ObjectSet<MemberVO> result = db.query(new Predicate<MemberVO>()
        {
            public boolean match(MemberVO memberVo)
            {
                return memberVo.getMembername().getmemberEmail().equals(userIdentity);
            }
        });


        // Return MemberVO object
        if (result.hasNext())
        {
            MemberVO memberVo = result.next();
            String fullname = memberVo.getMembername().toString();
            String username = memberVo.getMembername().getmemberEmail();
            String encodedPassword = memberVo.getPassword();

            byte[] decodedPassword = Base64.decodeBase64(encodedPassword.getBytes());

            String password = new String(decodedPassword);

            String receiverEmailID = username;

            String emailSubject = "Socion Password Request Fulfilled";

            StringBuilder tmpEmailBody = new StringBuilder();
            
            tmpEmailBody.append("Hi ").append(fullname).append(",\n\n");
            tmpEmailBody.append("Your username is ").append(username).append("\n");
            tmpEmailBody.append("Your password is ").append(password).append("\n");

            String emailBody = tmpEmailBody.toString();
            
            if(Util.MailSender.sendByEmail(receiverEmailID,emailSubject,emailBody))
                return "0";
            else
                return "1";
        }
        else // If member is not registered throw exception
        {
            throw new MemberNotFoundException();
        }

    }
    
    
    
    public String sendFeedbackEmail(ObjectContainer db, final String loggedUser, String feedbackXml) throws MemberNotFoundException
    {
        XMLUtilities xmlUtil = new XMLUtilities();
        
        String category = null;
        String subject = null;
        String feedbackText  = null;
        StringBuilder emailContent = new StringBuilder();

        // Conversion from xml to DOC
        Document doc = xmlUtil.getDocument(feedbackXml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(xmlUtil.validateFeedbackXML(doc))
            {
                category = xmlUtil.getValue((Element) doc.getElementsByTagName("feedback").item(0), "category");
                subject = xmlUtil.getValue((Element) doc.getElementsByTagName("feedback").item(0), "subject");
                feedbackText  = xmlUtil.getValue((Element) doc.getElementsByTagName("feedback").item(0), "feedbacktext");
            }
        }
        
        String emailSubject = category + ": " + subject;
        String receiverEmailID = Socion_Constants.senderEmailID;
        
        MemberVO memberVo = query(db, loggedUser);
        
        if(memberVo != null)
        {
            String firstName = memberVo.getMembername().getFirstName();
            String lastName = memberVo.getMembername().getLastName();

            String fullName = firstName + " " +  lastName;
            String returnEmailId = memberVo.getMembername().getmemberEmail(); 

            emailContent = emailContent.append("This feedback was sent by: ").append(fullName).append("\n\n");
            emailContent = emailContent.append("Return email-id is: ").append(returnEmailId).append("\n\n");
            emailContent = emailContent.append("Feedback message: ").append("\n\n").append(feedbackText).append("\n");
        
        
            if(Util.MailSender.sendByEmail(receiverEmailID,emailSubject,emailContent.toString()))
                return "0";
            else
                return "1";
        }    
        else // If member is not registered throw exception
        {
            throw new MemberNotFoundException();
        }    
            
    }   
    
    
    
    public String sendContactEmail(String contactusXML)
    {
        XMLUtilities xmlUtil = new XMLUtilities();
        
        String name = null;
        String email = null;
        String subject = null;
        String message  = null;
        
        StringBuilder emailContent = new StringBuilder();

        // Conversion from xml to DOC
        Document doc = xmlUtil.getDocument(contactusXML);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            //if(xmlUtil.validateFeedbackXML(doc))
            //{
            name = xmlUtil.getValue((Element) doc.getElementsByTagName("contact").item(0), "name");
            email = xmlUtil.getValue((Element) doc.getElementsByTagName("contact").item(0), "email");
            subject = xmlUtil.getValue((Element) doc.getElementsByTagName("contact").item(0), "subject");
            message  = xmlUtil.getValue((Element) doc.getElementsByTagName("contact").item(0), "message");
            //}
        }
        
        //String emailSubject = category + ": " + subject;
        String receiverEmailID = Socion_Constants.senderEmailID;
        
        emailContent = emailContent.append("This message was sent by: ").append(name).append("\n\n");
        emailContent = emailContent.append("Return email-id is: ").append(email).append("\n\n");
        emailContent = emailContent.append("Message: ").append("\n\n").append(message).append("\n");


        if(Util.MailSender.sendByEmail(receiverEmailID,subject,emailContent.toString()))
            return "0";
        else
            return "1";

    }        


    public String updateTokenId(ObjectContainer db,String loggedUser)
    {
        MemberVO memberVo = query(db, loggedUser);
        
        String uniqueid = UUID.randomUUID().toString();
        uniqueid = uniqueid.replace("-","");

        memberVo.setTokenId(uniqueid);
        db.store(memberVo);

        return "0";
    }
    
    
    
    public String updateFacebookTokenId(ObjectContainer db,String accessToken ,String loggedUser)
    {
        System.out.println("In MemberDAO updateFacebookToken");
        
        MemberVO memberVo = query(db, loggedUser);
        
        memberVo.setTokenId(accessToken);
        db.store(memberVo);

        return "0";
    }        

}

