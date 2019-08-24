package model;

import Util.XMLUtilities;
import java.util.List;
import java.util.UUID;

public class MemberVO
{
    private String tokenId;
    private MemberNameVO membername;
    private String password;
    private String ageCoefficient;
    private List<String> inboxCategoryList;
    private Integer inboxCount;
    private Integer daysCount;

    public MemberVO()
    {
         String uniqueid = UUID.randomUUID().toString();
         this.tokenId = uniqueid.replace("-","");
    }

    public String getAgeCoefficient() 
    {
        return ageCoefficient;
    }

    public void setAgeCoefficient(String ageCoefficient) 
    {
        this.ageCoefficient = ageCoefficient;
    }


    public List<String> getInboxCategoryList() 
    {
        return inboxCategoryList;
    }

    public void setInboxCategoryList(List<String> inboxCategoryList) 
    {
        this.inboxCategoryList = inboxCategoryList;
    }

    

    public Integer getDaysCount() 
    {
        return daysCount;
    }

    public void setDaysCount(Integer daysCount) 
    {
        this.daysCount = daysCount;
    }

    public Integer getInboxCount() 
    {
        return inboxCount;
    }

    public void setInboxCount(Integer inboxCount) 
    {
        this.inboxCount = inboxCount;
    }

    
    public String getPassword() 
    {
        return password;
    }

    public void setPassword(String password) 
    {
        this.password = password;
    }


    public String getTokenId() 
    {
        return tokenId;
    }

    public void setTokenId(String tokenId) 
    {
        this.tokenId = tokenId;
    }

    public MemberNameVO getMembername() 
    {
        return membername;
    }

    public void setMembername(MemberNameVO membername) 
    {
        this.membername = membername;
    }
    

    public MemberVO(MemberNameVO membername, String password, String ageCoefficient, List<String> inboxCategoryList, Integer inboxCount, Integer daysCount)
    {
        this.membername = membername;
        this.password = password;
        this.ageCoefficient = ageCoefficient;
        this.inboxCategoryList = inboxCategoryList;
        this.inboxCount = inboxCount;
        this.daysCount = daysCount;


        String uniqueid = UUID.randomUUID().toString();
        this.tokenId = uniqueid.replace("-","");
    }
    
    public MemberVO(MemberNameVO membername, String tokenId, String password, String ageCoefficient, List<String> inboxCategoryList, Integer inboxCount, Integer daysCount)
    {
        this.tokenId = tokenId;
        this.membername = membername;
        this.password = password;
        this.ageCoefficient = ageCoefficient;
        this.inboxCategoryList = inboxCategoryList;
        this.inboxCount = inboxCount;
        this.daysCount = daysCount;
        //this.showRatedArticles = showRatedArticles;
    }
    
    public MemberVO(String ageCoefficient, List<String> inboxCategoryList, Integer inboxCount, Integer daysCount)
    {
        this.ageCoefficient = ageCoefficient;
        this.inboxCategoryList = inboxCategoryList;
        this.inboxCount = inboxCount;
        this.daysCount = daysCount;

        String uniqueid = UUID.randomUUID().toString();
        this.tokenId = uniqueid.replace("-","");
    }


    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        XMLUtilities xmlutil = new XMLUtilities();
        String inboxCategoryListXml = new String();

        if(!inboxCategoryList.isEmpty())
            inboxCategoryListXml = xmlutil.listToCommaSeparatedString(inboxCategoryList);

        // Generate XML for member data
        xml.append("<member>");
        xml.append("<tokenId>").append(tokenId).append("</tokenId>");
        xml.append("<membername>").append(membername.getmemberEmail()).append("</membername>");
        xml.append("<ageCoefficient>").append(ageCoefficient).append("</ageCoefficient>");
        xml.append("<inboxCategoryList>").append(inboxCategoryListXml).append("</inboxCategoryList>");
        xml.append("<inboxCount>").append(inboxCount.toString()).append("</inboxCount>");
        xml.append("<daysCount>").append(daysCount.toString()).append("</daysCount>");
        xml.append("</member>");

        return xml.toString();
    }

}
