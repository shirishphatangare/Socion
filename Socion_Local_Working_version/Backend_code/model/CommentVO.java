package model;

import java.util.UUID;


public class CommentVO
{
    private String commentId;
    private String articleId;
    private MemberNameVO commentBy;
    private String commentText;
    private String datePosted;


    public String getCommentId() 
    {
        return commentId;
    }

    public void setCommentId(String commentId) 
    {
        this.commentId = commentId;
    }

    public String getArticleId()
    {
        return articleId;
    }

    public void setArticleId(String articleId)
    {
        this.articleId = articleId;
    }

    public String getCommentText()
    {
        return commentText;
    }

    public void setCommentText(String commentText)
    {
        this.commentText = commentText;
    }

    public String getDatePosted()
    {
        return datePosted;
    }

    public void setDatePosted(String datePosted)
    {
        this.datePosted = datePosted;
    }

    public MemberNameVO getCommentBy() {
        return commentBy;
    }

    public void setCommentBy(MemberNameVO commentBy) {
        this.commentBy = commentBy;
    }


    public CommentVO(String articleId, MemberNameVO commentBy, String commentText, String datePosted)
    {
        super();
        this.commentId = UUID.randomUUID().toString();
        this.articleId = articleId;
        this.commentBy = commentBy;
        this.commentText = commentText;
        this.datePosted = datePosted;
    }



    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        // Generate XML for member data
        xml.append("<comment>");
        xml.append("<commentId>").append(commentId).append("</commentId>");
        xml.append("<articleId>").append(articleId).append("</articleId>");
        xml.append("<commentBy>").append(commentBy.getmemberEmail()).append("</commentBy>");
        xml.append("<commentText>").append(commentText).append("</commentText>");
        xml.append("<datePosted>").append(datePosted).append("</datePosted>");
        xml.append("<isMemberPhotoUploaded>").append(commentBy.getIsImageUploaded().toString()).append("</isMemberPhotoUploaded>");
        xml.append("<fullname>").append(commentBy.toString()).append("</fullname>");
        xml.append("</comment>");

        return xml.toString();
    }
}
