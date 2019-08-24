package model;

public class RatingVO
{
    private MemberNameVO ratedByMember;
    private String ratedArticleId;
    private Float ratedScore;

    public String getRatedArticleId() 
    {
        return ratedArticleId;
    }

    public void setRatedArticleId(String ratedArticleId) 
    {
        this.ratedArticleId = ratedArticleId;
    }

    public MemberNameVO getRatedByMember() 
    {
        return ratedByMember;
    }

    public void setRatedByMember(MemberNameVO ratedByMember) 
    {
        this.ratedByMember = ratedByMember;
    }

    public Float getRatedScore() 
    {
        return ratedScore;
    }

    public void setRatedScore(Float ratedScore) 
    {
        this.ratedScore = ratedScore;
    }


   
   public RatingVO(MemberNameVO ratedByMember, String ratedArticleId, Float ratedScore)
   {
        this.ratedByMember = ratedByMember;
        this.ratedArticleId = ratedArticleId;
        this.ratedScore = ratedScore;

   }

    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        // Generate XML for member data
        xml.append("<rating>");
        xml.append("<ratedArticleId>").append(ratedArticleId).append("</ratedArticleId>");
        xml.append("<ratedByMember>").append(ratedByMember.getmemberEmail()).append("</ratedByMember>");
        xml.append("<ratedScore>").append(ratedScore.toString()).append("</ratedScore>");
        xml.append("</rating>");

        return xml.toString();
    }

}
