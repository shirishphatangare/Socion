package Util;

import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;
import com.db4o.cs.Db4oClientServer;
import com.db4o.cs.config.ClientConfiguration;
import com.db4o.query.Predicate;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import model.*;
import java.io.IOException;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;

import java.text.SimpleDateFormat;
import java.util.*;
import javax.imageio.ImageIO;
import javax.ws.rs.WebApplicationException;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class XMLUtilities
{
    public static boolean isServerRunning = false; 
    public static SimpleAppendLog log = new SimpleAppendLog(Socion_Constants.LOGFILENAME); 

    
    public ObjectContainer getClient()
    {
        ObjectContainer objectContainer = null;
        
        try 
        {
            ClientConfiguration config = Db4oClientServer.newClientConfiguration();
            
            config.common().objectClass(MemberVO.class).cascadeOnUpdate(true);
            config.common().objectClass(OutboxVO.class).cascadeOnUpdate(true);
            
            // connect to the server
            objectContainer = Db4oClientServer.openClient(config, Socion_Constants.DBHOST, Socion_Constants.DBPORT, Socion_Constants.DBUSER, Socion_Constants.DBPASS);
            
        } 
        catch (Exception e) 
        {
            XMLUtilities.log.write("Exception: " + e.getMessage() + e.getClass());
        }
        
        return objectContainer;
    
    }           

    /* Function to convert input XML to DOM */

    public Document getDocument(String xml)
    {
        try
        {
            // Create a builder factory
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);

            return factory.newDocumentBuilder().parse(new InputSource(new StringReader(xml)));
        }
        catch (SAXException e)
        {
            return null;
        }
        catch (ParserConfigurationException e)
        {
            return null;
        }
        catch (IOException e)
        {
            return null;
        }
    }


    /* Function to validate input member XML */

    private  boolean validateMemberXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "member"
        nodeList = doc.getElementsByTagName("member");
   
        // If there is no unique <member> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;


        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("firstname");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve membername value from xml
        String firstname = getValue((Element) doc.getElementsByTagName("member").item(0), "firstname");

        // If membername is null or empty, return false
        if (firstname == null || firstname.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("lastname");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve membername value from xml
        String lastname = getValue((Element) doc.getElementsByTagName("member").item(0), "lastname");

        // If membername is null or empty, return false
        if (lastname == null || lastname.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "password"
        nodeList = doc.getElementsByTagName("password");

        // If there is no unique <password> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve password value from xml
        String password = getValue((Element) doc.getElementsByTagName("member").item(0), "password");


        // Check that password value is not null or empty
        if (password == null || password.isEmpty())
            return false;

        // get NodeList of all xml elements for tag "memberEmail"
        nodeList = doc.getElementsByTagName("memberEmail");

        // If there is no unique <memberEmail> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve memberEmail value from xml
        String memberEmail = getValue((Element) doc.getElementsByTagName("member").item(0), "memberEmail");

        // Check that memberEmail value is not null or empty
        if (memberEmail == null || memberEmail.isEmpty())
            return false;


        return true;
    }

    private  boolean validateFacebookMemberXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "member"
        nodeList = doc.getElementsByTagName("member");
   
        // If there is no unique <member> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;


        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("uid");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve membername value from xml
        String uid = getValue((Element) doc.getElementsByTagName("member").item(0), "uid");

        // If membername is null or empty, return false
        if (uid == null || uid.isEmpty())
            return false;
        
        
        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("firstname");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve membername value from xml
        String firstname = getValue((Element) doc.getElementsByTagName("member").item(0), "firstname");

        // If membername is null or empty, return false
        if (firstname == null || firstname.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("lastname");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve membername value from xml
        String lastname = getValue((Element) doc.getElementsByTagName("member").item(0), "lastname");

        // If membername is null or empty, return false
        if (lastname == null || lastname.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "memberEmail"
        nodeList = doc.getElementsByTagName("memberEmail");

        // If there is no unique <memberEmail> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve memberEmail value from xml
        String memberEmail = getValue((Element) doc.getElementsByTagName("member").item(0), "memberEmail");

        // Check that memberEmail value is not null or empty
        if (memberEmail == null || memberEmail.isEmpty())
            return false;
//--
        nodeList = doc.getElementsByTagName("accessToken");

        // If there is no unique <memberEmail> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve memberEmail value from xml
        String accessToken = getValue((Element) doc.getElementsByTagName("member").item(0), "accessToken");

        // Check that memberEmail value is not null or empty
        if (accessToken == null || accessToken.isEmpty())
            return false;
        

        return true;
    }
    
    

    private  boolean validateMemberConfigurationXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "member"
        nodeList = doc.getElementsByTagName("member");

        // If there is no unique <member> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "agecoeff"
        nodeList = doc.getElementsByTagName("ageCoefficient");

        // If there is no unique <agecoeff> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve agecoeff value from xml
        String ageCoefficient = getValue((Element) doc.getElementsByTagName("member").item(0), "ageCoefficient");

        // Check that agecoeff value is not null or empty
        if (ageCoefficient == null || ageCoefficient.isEmpty())
            return false;


         // get NodeList of all xml elements for tag "blacklist"
        nodeList = doc.getElementsByTagName("inboxCategoryList");

        // If there is no unique <blacklist> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve blacklist value from xml
        String inboxCategoryList = getValue((Element) doc.getElementsByTagName("member").item(0), "inboxCategoryList");

        // Check that blacklist value is not null or empty
        if (inboxCategoryList == null || inboxCategoryList.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "numinbox"
        nodeList = doc.getElementsByTagName("inboxCount");

        // If there is no unique <numinbox> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve numinbox value from xml
        String inboxCount = getValue((Element) doc.getElementsByTagName("member").item(0), "inboxCount");

        // Check that numinbox value is not null or empty
        if (inboxCount == null || inboxCount.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "datesetting"
        nodeList = doc.getElementsByTagName("daysCount");

        // If there is no unique <datesetting> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve datesetting value from xml
        String daysCount = getValue((Element) doc.getElementsByTagName("member").item(0), "daysCount");

        // Check that datesetting value is not null or empty
        if (daysCount == null || daysCount.isEmpty())
            return false;
        
        return true;

    }


    /* Function to validate input membername and password for article input XML */

    private  boolean validateMemberXmlForPasswordChange(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "member"
        nodeList = doc.getElementsByTagName("member");

        // If there is no unique <member> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("membername");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve membername value from xml
        String membername = getValue((Element) doc.getElementsByTagName("member").item(0), "membername");

        // If membername is null or empty, return false
        if (membername == null || membername.isEmpty())
            return false;

        // get NodeList of all xml elements for tag "password"
        nodeList = doc.getElementsByTagName("password");

        // If there is no unique <password> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve password value from xml
        String password = getValue((Element) doc.getElementsByTagName("member").item(0), "password");

        // Check that password value is not null or empty
        if (password == null || password.isEmpty())
            return false;

        return true;
    }
    
    
    
    
    public boolean validateFeedbackXML(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "member"
        nodeList = doc.getElementsByTagName("feedback");

        // If there is no unique <member> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("category");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve category value from xml
        String category = getValue((Element) doc.getElementsByTagName("feedback").item(0), "category");

        // If membername is null or empty, return false
        if (category == null || category.isEmpty())
            return false;

        // get NodeList of all xml elements for tag "password"
        nodeList = doc.getElementsByTagName("subject");

        // If there is no unique <password> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve password value from xml
        String subject = getValue((Element) doc.getElementsByTagName("feedback").item(0), "subject");

        // Check that password value is not null or empty
        if (subject == null || subject.isEmpty())
            return false;
        
        
        // get NodeList of all xml elements for tag "password"
        nodeList = doc.getElementsByTagName("feedbacktext");

        // If there is no unique <password> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve password value from xml
        String feedbacktext = getValue((Element) doc.getElementsByTagName("feedback").item(0), "feedbacktext");

        // Check that password value is not null or empty
        if (feedbacktext == null || feedbacktext.isEmpty())
            return false;


        return true;
    
    }        
            




    /* Function to validate input ratings XML */

    private  boolean validateRatingXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "rating"
        nodeList = doc.getElementsByTagName("rating");
   
        // If there is no unique <rating> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "ratedto"
        nodeList = doc.getElementsByTagName("ratedArticleId");
        
        // If there is no unique <ratedto> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve ratedto value from xml
        String ratedArticleId = getValue((Element) doc.getElementsByTagName("rating").item(0), "ratedArticleId");
        
        // If ratedto is null or empty, return false
        if (ratedArticleId == null || ratedArticleId.isEmpty())
            return false;

        // get NodeList of all xml elements for tag "ratedby"
        nodeList = doc.getElementsByTagName("ratedByMember");

        // If there is no unique <ratedby> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve  ratingby value from xml
        String ratedByMember = getValue((Element) doc.getElementsByTagName("rating").item(0), "ratedByMember");

        // Check that ratingby value is not null or empty
        if (ratedByMember == null || ratedByMember.isEmpty())
            return false;
        
        
        // get NodeList of all xml elements for tag "ratedscore"
        nodeList = doc.getElementsByTagName("ratedScore");

        // If there is no unique <ratedscore> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve ratedscore value from xml
        String ratedScore = getValue((Element) doc.getElementsByTagName("rating").item(0), "ratedScore");

        // Check that ratedscore value is not null or empty
        if (ratedScore == null || ratedScore.isEmpty())
            return false;
        
        return true;
    }



    /* Function to validate input Trusts XML */

    private  boolean validateTrustXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "trust"
        nodeList = doc.getElementsByTagName("trust");

        // If there is no unique <trust> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "trustfrom"
        nodeList = doc.getElementsByTagName("trustFromMember");

        // If there is no unique <trustfrom> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve trustfrom value from xml
        String trustfrom = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustFromMember");

        // If trustfrom is null or empty, return false
        if (trustfrom == null || trustfrom.isEmpty())
            return false;

        // get NodeList of all xml elements for tag "trustto"
        nodeList = doc.getElementsByTagName("trustToMember");

        // If there is no unique <trustto> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve trustto value from xml
        String trustto = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustToMember");

        // Check that trustto value is not null or empty
        if (trustto == null || trustto.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "trustscore"
        nodeList = doc.getElementsByTagName("trustScore");

        // If there is no unique <trustscore> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve trustscore value from xml
        String trustScore = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustScore");

        // Check that trustscore value is not null or empty
        if (trustScore == null || trustScore.isEmpty())
            return false;


        nodeList = doc.getElementsByTagName("totalVotes");

        // If there is no unique <totalvotes> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve totalvotes value from xml
        String totalVotes = getValue((Element) doc.getElementsByTagName("trust").item(0), "totalVotes");

        // Check that totalvotes value is not null or empty
        if (totalVotes == null || totalVotes.isEmpty())
            return false;


        return true;
    }



    /* Function to get a value of a tag from the Document object */

    public  String getValue(Element tmp_element, String tagName)
    {
        String value = null;
        NodeList nl = tmp_element.getElementsByTagName(tagName);

        // Check that value is not null or empty
        if(nl != null && nl.getLength() > 0)
        {
            Element el = (Element)nl.item(0);
            value = el.getFirstChild().getNodeValue();
        }
        return value;
    }



    /* Function to validate input Article XML */

    private  boolean validateArticleXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "article"
        nodeList = doc.getElementsByTagName("article");

        // If there is no unique <article> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "title"
        nodeList = doc.getElementsByTagName("title");

        // If there is no unique <title> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;
        
        // get NodeList of all xml elements for tag "imageurl"
        nodeList = doc.getElementsByTagName("imageurl");

        // If there is no unique <imageurl> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        
        // get NodeList of all xml elements for tag "description"
        nodeList = doc.getElementsByTagName("description");

        // If there is no unique <description> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;
        

        // get NodeList of all xml elements for tag "url"
        nodeList = doc.getElementsByTagName("url");

        // If there is no unique <url> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        
        // get NodeList of all xml elements for tag "votecount"
        nodeList = doc.getElementsByTagName("datePosted");

        // If there is no unique <votecount> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;


        //get NodeList of all xml elements for tag "membername"
        nodeList = doc.getElementsByTagName("postedBy");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;


        //get NodeList of all xml elements for tag "category"
        nodeList = doc.getElementsByTagName("category");

        // If there is no unique <membername> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        String title = getValue((Element) doc.getElementsByTagName("article").item(0), "title");
        
        // Check that title value is NOT null ,empty or greater than 150 characters
        if (title == null || title.isEmpty() || title.length() > 150)
            return false;
        
        
        String imageurl = getValue((Element) doc.getElementsByTagName("article").item(0), "imageurl");
        
        // Check that imageurl value is NOT null 
        if (imageurl == null)
            return false;


        
        
        
        String description = getValue((Element) doc.getElementsByTagName("article").item(0), "description");
        
        // Check that description value is NOT null ,empty or greater than 150 characters
        if (description == null || description.length() > 350)
            return false;

        String url = getValue((Element) doc.getElementsByTagName("article").item(0), "url");
        
        // Check that url value is NOT null or empty
        if (url == null || url.isEmpty())
            return false;


        String datePosted = getValue((Element) doc.getElementsByTagName("article").item(0), "datePosted");

        // Check that votecount value is NOT null or empty
        if (datePosted == null || datePosted.isEmpty())
            return false;


        String category = getValue((Element) doc.getElementsByTagName("article").item(0), "category");

        // Check that category value is NOT null or empty
        if (category == null || category.isEmpty())
            return false;


        String postedBy = getValue((Element) doc.getElementsByTagName("article").item(0), "postedBy");

        // Check that membername value is NOT null or empty
        if (postedBy == null || postedBy.isEmpty())
            return false;

        return true;
    }



    
    private  boolean validateCommentXml(Document doc)
    {
        NodeList nodeList = null;

        // get NodeList of all xml elements for tag "comment"
        nodeList = doc.getElementsByTagName("comment");

        // If there is no unique <comment> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // get NodeList of all xml elements for tag "comment"
        nodeList = doc.getElementsByTagName("articleId");

        // If there is no unique <comment> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve articleId value from xml
        String articleId = getValue((Element) doc.getElementsByTagName("comment").item(0), "articleId");

        // If articleId is null or empty, return false
        if (articleId == null || articleId.isEmpty())
            return false;

        // get NodeList of all xml elements for tag "commentBy"
        nodeList = doc.getElementsByTagName("commentBy");

        // If there is no unique <commentBy> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve  commentBy value from xml
        String commentBy = getValue((Element) doc.getElementsByTagName("comment").item(0), "commentBy");

        // Check that commentBy value is not null or empty
        if (commentBy == null || commentBy.isEmpty())
            return false;


        // get NodeList of all xml elements for tag "commentText"
        nodeList = doc.getElementsByTagName("commentText");

        // If there is no unique <datePosted> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve datePosted value from xml
        String commentText = getValue((Element) doc.getElementsByTagName("comment").item(0), "commentText");

        // Check that datePosted value is not null or empty
        if (commentText == null || commentText.isEmpty())
            return false;
        
        
        // get NodeList of all xml elements for tag "datePosted"
        nodeList = doc.getElementsByTagName("datePosted");

        // If there is no unique <datePosted> tag in xml, return false
        if (nodeList.getLength() != 1)
            return false;

        // retrieve datePosted value from xml
        String datePosted = getValue((Element) doc.getElementsByTagName("comment").item(0), "datePosted");

        // Check that datePosted value is not null or empty
        if (datePosted == null || datePosted.isEmpty())
            return false;

        return true;

    }



/* Function to get MemberVO Object from the input member XML */

    public  MemberVO getMemberVoFromXml(ObjectContainer db, String xml)
    {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateMemberXml(doc))
            {
                //String userName = getValue((Element) doc.getElementsByTagName("member").item(0), "membername");
                String firstName = getValue((Element) doc.getElementsByTagName("member").item(0), "firstname");
                String lastName = getValue((Element) doc.getElementsByTagName("member").item(0), "lastname");
                String memberEmail = getValue((Element) doc.getElementsByTagName("member").item(0), "memberEmail");
                Boolean isImageUploaded = false;
                MemberNameVO memberNameVo = new MemberNameVO(memberEmail,firstName,lastName,isImageUploaded);
                String password = getValue((Element) doc.getElementsByTagName("member").item(0), "password");
                ArrayList<String> inboxCategoryList = new ArrayList<String>();
                
                inboxCategoryList.add("Video");
                inboxCategoryList.add("Picture");
                inboxCategoryList.add("Blog");
                inboxCategoryList.add("World News");
                inboxCategoryList.add("Business");
                inboxCategoryList.add("Politics");
                inboxCategoryList.add("Science/Technology");
                inboxCategoryList.add("Nature");
                inboxCategoryList.add("Comedy");
                inboxCategoryList.add("Gaming");
                inboxCategoryList.add("Culture");
                inboxCategoryList.add("Travel");
                inboxCategoryList.add("Health");
                inboxCategoryList.add("Lifestyle");
                inboxCategoryList.add("Entertainment");
                inboxCategoryList.add("Sports");
                inboxCategoryList.add("Other");
                
                // XML is valid, just get the values from the DOM
                return new MemberVO(memberNameVo,password,"Low",inboxCategoryList,new Integer(10),new Integer(10));
            }
        }
        return null;
    }
    
    public  MemberVO getFacebookMemberVoFromXml(ObjectContainer db, String xml)
    {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateFacebookMemberXml(doc))
            {
                String firstName = getValue((Element) doc.getElementsByTagName("member").item(0), "firstname");
                String lastName = getValue((Element) doc.getElementsByTagName("member").item(0), "lastname");
                String memberEmail = getValue((Element) doc.getElementsByTagName("member").item(0), "memberEmail");
                String  uid = getValue((Element) doc.getElementsByTagName("member").item(0), "uid");
                
                // save facebook profile picture 
                Boolean isImageUploaded = uploadFacebookProfilePicture(uid, memberEmail);

                MemberNameVO memberNameVo = new MemberNameVO(memberEmail,firstName,lastName,isImageUploaded);
                
                String password = UUID.randomUUID().toString();
                
                ArrayList<String> inboxCategoryList = new ArrayList<String>();
                
                inboxCategoryList.add("Video");
                inboxCategoryList.add("Picture");
                inboxCategoryList.add("Blog");
                inboxCategoryList.add("World News");
                inboxCategoryList.add("Business");
                inboxCategoryList.add("Politics");
                inboxCategoryList.add("Science/Technology");
                inboxCategoryList.add("Nature");
                inboxCategoryList.add("Comedy");
                inboxCategoryList.add("Gaming");
                inboxCategoryList.add("Culture");
                inboxCategoryList.add("Travel");
                inboxCategoryList.add("Health");
                inboxCategoryList.add("Lifestyle");
                inboxCategoryList.add("Entertainment");
                inboxCategoryList.add("Sports");
                inboxCategoryList.add("Other");
                
                String tokenId = getValue((Element) doc.getElementsByTagName("member").item(0), "accessToken");
                
                // XML is valid, just get the values from the DOM
                return new MemberVO(memberNameVo,tokenId,password,"Low",inboxCategoryList,new Integer(10),new Integer(10));
            }
        }
        return null;
    }
    
    
    



    /* Function to get MemberVO Object from the input member XML */

   public  MemberVO getMemberVoForUpdateConfigurationFromXml(String xml)
   {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateMemberConfigurationXml(doc))
            {
                String ageCoefficient = getValue((Element) doc.getElementsByTagName("member").item(0), "ageCoefficient");

                String tmp_inboxCategoryList = getValue((Element) doc.getElementsByTagName("member").item(0), "inboxCategoryList");

                tmp_inboxCategoryList = tmp_inboxCategoryList.replaceAll("\\s+", "");

                List<String> inboxCategoryList;

                if(tmp_inboxCategoryList.isEmpty())
                    inboxCategoryList = new ArrayList<String>();
                else
                    inboxCategoryList = commaSeparatedStringToList(tmp_inboxCategoryList);


                Integer inboxCount = Integer.valueOf(getValue((Element) doc.getElementsByTagName("member").item(0), "inboxCount"));
                Integer daysCount = Integer.valueOf(getValue((Element) doc.getElementsByTagName("member").item(0), "daysCount"));

                // XML is valid, just get the values from the DOM
                return new MemberVO(ageCoefficient,inboxCategoryList,inboxCount,daysCount);
            }

        }

        return null;
    }



    /* Function to get MemberVO Object from the input member XML for update operation */

    public MemberVO getMemberVoForUpdatePasswordFromXml(String xml)
    {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateMemberXmlForPasswordChange(doc))
            {
                String memberName = getValue((Element) doc.getElementsByTagName("member").item(0), "membername");
                MemberNameVO memberNameVo = new MemberNameVO(memberName,"","",false);
                String password = getValue((Element) doc.getElementsByTagName("member").item(0), "password");

                // XML is valid, just get the values from the DOM
                return new MemberVO(memberNameVo,password,"Low",new ArrayList<String>(),new Integer(0),new Integer(0));
            }
        }
        return null;
    }


   
    /* Function to get RatingVO Object from the input rating XML */

    public  RatingVO getRatingVoFromXml(ObjectContainer db,String xml)
    {
     // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateRatingXml(doc))
            {
                final String ratedByMember = getValue((Element) doc.getElementsByTagName("rating").item(0), "ratedByMember");

                ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
                {
                    public boolean match(MemberNameVO memberNameVo)
                    {
                        return memberNameVo.getmemberEmail().equals(ratedByMember);
                    }
                });

                if(result.hasNext())
                {
                    MemberNameVO memberNameVo = result.next();
                    String ratedArticleId = getValue((Element) doc.getElementsByTagName("rating").item(0), "ratedArticleId");
                    Float ratedScore = Float.valueOf(getValue((Element) doc.getElementsByTagName("rating").item(0), "ratedScore"));

                    // XML is valid, just get the values from the DOM
                    return new RatingVO(memberNameVo, ratedArticleId, ratedScore);
                }
            }

        }
        return null;
    }




    /* Function to get TrustVO Object from the input trust XML */

    public  TrustVO getTrustVoFromXml(ObjectContainer db,String xml)
    {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateTrustXml(doc))
            {
                final String trustFromMember = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustFromMember");

                ObjectSet<MemberNameVO> trustFromMemberResult = db.query(new Predicate<MemberNameVO>()
                {
                    public boolean match(MemberNameVO memberNameVo)
                    {
                        return memberNameVo.getmemberEmail().equals(trustFromMember);
                    }
                });

                MemberNameVO trustFromMemberNameVo = new MemberNameVO();

                if(trustFromMemberResult.hasNext())
                    trustFromMemberNameVo = trustFromMemberResult.next();

                final String trustToMember = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustToMember");

                ObjectSet<MemberNameVO> trustToMemberResult = db.query(new Predicate<MemberNameVO>()
                {
                    public boolean match(MemberNameVO memberNameVo)
                    {
                        return memberNameVo.getmemberEmail().equals(trustToMember);
                    }
                });

                MemberNameVO trustToMemberNameVo = new MemberNameVO();

                if(trustToMemberResult.hasNext())
                    trustToMemberNameVo = trustToMemberResult.next();

                Float trustScore =  Float.valueOf(getValue((Element) doc.getElementsByTagName("trust").item(0), "trustScore"));
                Integer totalVotes = Integer.valueOf(getValue((Element) doc.getElementsByTagName("trust").item(0), "totalVotes"));

                // XML is valid, just get the values from the DOM
                return new TrustVO(trustFromMemberNameVo, trustToMemberNameVo ,trustScore, totalVotes );
            }
        }
        return null;
    }


    public TrustVO getUpdatedTrustVoFromXml(String xml)
    {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if(validateTrustXml(doc))
            {
                String trustFromMember = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustFromMember");
                MemberNameVO trustFromMemberNameVo = new MemberNameVO(trustFromMember,"","",false);

                String trustToMember = getValue((Element) doc.getElementsByTagName("trust").item(0), "trustToMember");
                MemberNameVO trustToMemberNameVo = new MemberNameVO(trustToMember,"","",false);

                Float trustScore =  Float.valueOf(getValue((Element) doc.getElementsByTagName("trust").item(0), "trustScore"));
                Integer totalVotes = Integer.valueOf(getValue((Element) doc.getElementsByTagName("trust").item(0), "totalVotes"));

                // XML is valid, just get the values from the DOM
                return new TrustVO(trustFromMemberNameVo, trustToMemberNameVo ,trustScore, totalVotes );
            }

        }

        return null;
    }


    /* Function to get ArticleVO Object from the input article XML */

    public  ArticleVO getArticleVoFromXml(ObjectContainer db,String xml, int offsetMillis)
    {
        // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if (validateArticleXml(doc))
            {
                final String postedBy = getValue((Element) doc.getElementsByTagName("article").item(0), "postedBy");

                ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
                {
                    public boolean match(MemberNameVO memberNameVo)
                    {
                        return memberNameVo.getmemberEmail().equals(postedBy);
                    }
                });

                if(result.hasNext())
                {
                    MemberNameVO memberNameVo = result.next();
                    String title = getValue((Element) doc.getElementsByTagName("article").item(0), "title");
                    String description = getValue((Element) doc.getElementsByTagName("article").item(0), "description");
                    String url = getValue((Element) doc.getElementsByTagName("article").item(0), "url");
                    String datePostedString = getValue((Element) doc.getElementsByTagName("article").item(0), "datePosted");
                    Date datePosted = convertStringToGMTDate(datePostedString, offsetMillis);
                    Integer votesCount = new Integer(1);
                    Integer commentsCount = new Integer(0);
                    Integer sharesCount = new Integer(0);
                    Float averageRating = new Float(10.0);
                    String category = getValue((Element) doc.getElementsByTagName("article").item(0), "category");
                    String databaseDatePosted = convertGMTDateToString(datePosted);
                    String imageurl = getValue((Element) doc.getElementsByTagName("article").item(0), "imageurl"); 
                            
                    if(imageurl.isEmpty())
                        imageurl = " ";
                    
                    if(description.isEmpty())
                        description = " ";
                    
                    return new ArticleVO(memberNameVo,title,description,url,databaseDatePosted,votesCount,commentsCount,sharesCount,averageRating, category,imageurl);
                }
            }
        }
        return null;
    }


    /* Function to get CommentVO Object from the input XML */

    public  CommentVO getCommentVoFromXml(ObjectContainer db,String xml,int offsetMillis)
    {
         // Conversion from xml to DOC
        Document doc = getDocument(xml);

        if (doc != null)
        {
            // Check syntactical validity of input XML
            if (validateCommentXml(doc))
            {
                final String commentBy = getValue((Element) doc.getElementsByTagName("comment").item(0), "commentBy");

                ObjectSet<MemberNameVO> result = db.query(new Predicate<MemberNameVO>()
                {
                    public boolean match(MemberNameVO memberNameVo)
                    {
                        return memberNameVo.getmemberEmail().equals(commentBy);
                    }
                });

                if(result.hasNext())
                {
                    MemberNameVO memberNameVo = result.next();
                    String articleId = getValue((Element) doc.getElementsByTagName("comment").item(0), "articleId");
                    String commentText = getValue((Element) doc.getElementsByTagName("comment").item(0), "commentText");
                    String datePostedString = getValue((Element) doc.getElementsByTagName("comment").item(0), "datePosted");
                    Date datePosted = convertStringToGMTDate(datePostedString, offsetMillis);
                    String databaseDatePosted = convertGMTDateToString(datePosted);
                    
                    return new CommentVO(articleId,memberNameVo,commentText,databaseDatePosted);
                }
            }
        }
        return null;
    }


    /*public String getFormattedDateTime(Date date)
    {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String dateNow = formatter.format(date);
        return dateNow;
    }*/
    
    
    public String convertGMTDateToString(Date datePosted)
    {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String returnDate = formatter.format(datePosted);
        
        return returnDate;
    }        


    // /home/ourso0/public_html
    // C:/temp
    public static String getProperty(String propertyName)
    {
        Properties properties = new Properties();
        String propertyValue = new String() ;
        FileInputStream f;
        File file = new File("/home/ourso0/public_html/Socion_Config/Socion_Config.properties");
        try
        {
            f =  new FileInputStream(file);

            properties.load(f);
            propertyValue = properties.getProperty(propertyName);
        }
        catch (IOException e)
        {
            log.write("Error: " +  e.getMessage() + file.getAbsolutePath());
        }

        return propertyValue;

    }


    public String listToCommaSeparatedString(List <String> list)
    {
        StringBuilder newString = new StringBuilder();

        for(String str:list)
        {
            newString.append(str).append(",");
        }

        return newString.substring(0, (newString.length() - 1));

    }

    
    public List<String> commaSeparatedStringToList(String commaString)
    {
        String [] stringArray = commaString.split(",");

        List<String> blacklist = new ArrayList<String>();

        for(String str: stringArray)
        {
            blacklist.add(str);
        }

        return blacklist;

    }
    
    
    //Watch out if both dates are in GMT format before getting difference in seconds
    public long getArticleAgeSeconds(Date dateArticlePosted)
    {
        long dateDiffSecs;
        
        Calendar currentDate  = Calendar.getInstance();
        long currentDateMillis = currentDate.getTimeInMillis();
        
        Calendar previousDate = Calendar.getInstance();
        previousDate.setTime(dateArticlePosted);
        long previousDateMillis = previousDate.getTimeInMillis();
        
        dateDiffSecs = (currentDateMillis - previousDateMillis) / 1000;
        
        return dateDiffSecs;
    }  
    
    
    public static Date convertStringToGMTDate(String datePostedString, int offsetMillis)
    {
        Date datePosted = null;
        try
        {    
            TimeZone timezone = TimeZone.getTimeZone("GMT"); 
            TimeZone.setDefault(timezone);

            SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

            Calendar cal = Calendar.getInstance(new SimpleTimeZone((offsetMillis * -1), "GMT"));
            format.setCalendar(cal);

            datePosted = format.parse(datePostedString);
        }
        catch(ParseException e)
        {
            log.write("Error: " +  e.getMessage());
        }    

        return datePosted;
    }
    
    
    private boolean uploadFacebookProfilePicture(String uid, String memberEmail)
    {
        boolean saveStatus = false;
        
        String applicationDirectory  = XMLUtilities.getProperty("APPPATH");
        String uri = applicationDirectory + "/images/";
        
        String resizedImageName = memberEmail.replaceAll("\\.", "dot") + ".png";
        File resizedFile = new File(uri + resizedImageName.toLowerCase());

        try
        {    
            URL facebookURL = new URL("https://graph.facebook.com/" + uid + "/picture?type=normal");
            BufferedImage image = ImageIO.read(facebookURL); 
            saveStatus = ImageIO.write(image, "png", resizedFile);
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Error: " + e.getMessage());
        }
        
        return saveStatus;
    }
    
    
    public static int getResponseCode(String urlString) throws MalformedURLException, IOException 
    {
        URL url = new URL(urlString); 
        HttpURLConnection huc =  (HttpURLConnection)  url.openConnection(); 
        huc.setRequestMethod("GET"); 
        huc.connect(); 
        return huc.getResponseCode();
    }
    
    
    public static String getIframeForArticle(final String articleId)
    {
        ObjectContainer client = null;
        String articleUrl ;
        
        try
        {
            client = new XMLUtilities().getClient();

            ObjectSet<ArticleVO> result = client.query(new Predicate<ArticleVO>()
            {
                public boolean match(ArticleVO articleVo)
                {
                    return articleVo.getArticleId().equals(articleId);
                }
            });

            if(result.hasNext())
            {
                ArticleVO articleVo = result.next();
                articleUrl = articleVo.getUrl();
            }
            else
            {
                throw new WebApplicationException(404);
            }
            
            
            String videoURL = getVideoUrl(articleUrl);
            
            if( videoURL != null)
            {    
                String videoIframe = "<object width=\"45%\" height=\"65%\"><param name=\"movie\" value=\"" + videoURL + "\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\""  + videoURL + "\" type=\"application/x-shockwave-flash\" width=\"45%\" height=\"65%\" allowscriptaccess=\"always\" allowfullscreen=\"true\"></embed></object>";
                return videoIframe;
            }
            
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }
        
        String articleIframe = "<iframe  frameborder=\"0\" marginheight=\"0\"  marginwidth=\"0\" src=\"" + articleUrl + "\"style=\"width:100%;height:100%\"><p>Your browser does not support iframes.</p></iframe>";
        return articleIframe;
    }
    
    
    
    private static String getVideoUrl(String articleUrl)
    {
        org.jsoup.nodes.Document doc = null;
        
        try
        {    
            if(getResponseCode(articleUrl) != 404)
                doc = Jsoup.connect(articleUrl).get();
            else
                throw new InvalidURLException();
        
            Elements metalinks = doc.select("meta");

            for (org.jsoup.nodes.Element singlemeta : metalinks) 
            {
                String metatagproperty = singlemeta.attr("property");

                if((metatagproperty.equalsIgnoreCase("og:type")))
                {
                    String webType = singlemeta.attr("content");
                    
                    if(!webType.toLowerCase().contains("video"))
                    {    
                        return null;
                    }
                }    
                
                
                if((metatagproperty.equalsIgnoreCase("og:video")))
                {
                    String webVideo = singlemeta.attr("content");

                    if(!webVideo.isEmpty())
                        return webVideo;
                    else
                    {    
                        return null; 
                    }
                }    

            }
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Error: " + e.getMessage());
        } 
        
        return null;
    } 
    
    
    public static String getUrlForArticleId(final String articleId)
    {
        ObjectContainer client = null;
        String articleUrl ;
        
        try
        {
            client = new XMLUtilities().getClient();

            ObjectSet<ArticleVO> result = client.query(new Predicate<ArticleVO>()
            {
                public boolean match(ArticleVO articleVo)
                {
                    return articleVo.getArticleId().equals(articleId);
                }
            });

            if(result.hasNext())
            {
                ArticleVO articleVo = result.next();
                articleUrl = articleVo.getUrl();
            }
            else
            {
                throw new WebApplicationException(404);
            }    
        }
        finally // Close database ObjectContainers
        {
            if (client != null)
            {
                client.close();
            }
        }

        return articleUrl;
    }        

    
}
