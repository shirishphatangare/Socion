package model;

public class TrustVO
{
    private MemberNameVO trustFromMember;
    private MemberNameVO trustToMember;
    private Float trustScore;
    private Integer totalVotes;

    public Integer getTotalVotes()
    {
        return totalVotes;
    }

    public void setTotalVotes(Integer totalVotes)
    {
        this.totalVotes = totalVotes;
    }

    public MemberNameVO getTrustFromMember()
    {
        return trustFromMember;
    }

    public void setTrustFromMember(MemberNameVO trustFromMember)
    {
        this.trustFromMember = trustFromMember;
    }

    public Float getTrustScore()
    {
        return trustScore;
    }

    public void setTrustScore(Float trustScore)
    {
        this.trustScore = trustScore;
    }

    public MemberNameVO getTrustToMember()
    {
        return trustToMember;
    }

    public void setTrustToMember(MemberNameVO trustToMember)
    {
        this.trustToMember = trustToMember;
    }

 
    public TrustVO(MemberNameVO trustFromMember, MemberNameVO trustToMember, Float trustScore, Integer totalVotes)
    {
        super();
        this.trustFromMember = trustFromMember;
        this.trustToMember = trustToMember;
        this.trustScore = trustScore;
        this.totalVotes = totalVotes;
    }

    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        // Generate XML for member data
        xml.append("<trust>");
        xml.append("<trustFromMember>").append(trustFromMember.getmemberEmail()).append("</trustFromMember>");
        xml.append("<trustToMember>").append(trustToMember.getmemberEmail()).append("</trustToMember>");
        xml.append("<trustScore>").append(trustScore.toString()).append("</trustScore>");
        xml.append("<totalVotes>").append(totalVotes.toString()).append("</totalVotes>");
        xml.append("<username>").append(trustToMember.getmemberEmail()).append("</username>");
        xml.append("<fullname>").append(trustToMember.toString()).append("</fullname>");
        xml.append("<isMemberPhotoUploaded>").append(trustToMember.getIsImageUploaded().toString()).append("</isMemberPhotoUploaded>");
        xml.append("<fromusername>").append(trustFromMember.getmemberEmail()).append("</fromusername>");
        xml.append("<fromfullname>").append(trustFromMember.toString()).append("</fromfullname>");
        xml.append("<fromisMemberPhotoUploaded>").append(trustFromMember.getIsImageUploaded().toString()).append("</fromisMemberPhotoUploaded>");
        xml.append("</trust>");

        return xml.toString();
    }

}
