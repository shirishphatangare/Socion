package model;

import java.util.UUID;

public class ArticleVO
{
    private String articleId;
    private MemberNameVO postedBy;
    private String title;
    private String description;
    private String url;
    private String datePosted;
    private Integer votesCount;
    private Integer commentsCount;
    private Integer sharesCount;
    private String category;
    private Float averageRating;
    private String imageurl;


    
    public ArticleVO()
    {
    }        
    
    
    public ArticleVO(MemberNameVO postedBy, String title, String description, String url, String datePosted, Integer votesCount, Integer commentsCount, Integer sharesCount, Float averageRating, String category, String imageurl)
    {
        this.postedBy = postedBy;
        this.title = title;
        this.description = description;
        this.url = url;
        this.category = category;
        this.datePosted = datePosted;
        this.votesCount = votesCount;
        this.commentsCount = commentsCount;
        this.sharesCount = sharesCount;
        this.averageRating = averageRating;
        this.imageurl = imageurl;

        // Generate a unique articleID
        this.articleId = UUID.randomUUID().toString();
    }

    
    public String getArticleId()
    {
        return articleId;
    }

    public void setArticleId(String articleId) 
    {
        this.articleId = articleId;
    }


    public String getDatePosted() 
    {
        return datePosted;
    }

    public void setDatePosted(String datePosted) 
    {
        this.datePosted = datePosted;
    }


    public String getTitle() 
    {
        return title;
    }

    public void setTitle(String title) 
    {
        this.title = title;
    }

    public String getDescription() 
    {
        return description;
    }

    public void setDescription(String description) 
    {
        this.description = description;
    }

    
    
    public String getUrl() 
    {
        return url;
    }

    public void setUrl(String url) 
    {
        this.url = url;
    }

    public Integer getVotesCount() 
    {
        return votesCount;
    }

    public void setVotesCount(Integer votesCount) 
    {
        this.votesCount = votesCount;
    }

    public Integer getCommentsCount() 
    {
        return commentsCount;
    }

    public void setCommentsCount(Integer commentsCount) 
    {
        this.commentsCount = commentsCount;
    }

    public Integer getSharesCount() 
    {
        return sharesCount;
    }

    public void setSharesCount(Integer sharesCount) 
    {
        this.sharesCount = sharesCount;
    }

    
    public MemberNameVO getPostedBy() 
    {
        return postedBy;
    }

    public void setPostedBy(MemberNameVO postedBy) 
    {
        this.postedBy = postedBy;
    }

    public String getCategory() 
    {
        return category;
    }

    public void setCategory(String category) 
    {
        this.category = category;
    }

    public Float getAverageRating() 
    {
        return averageRating;
    }

    public void setAverageRating(Float averageRating) 
    {
        this.averageRating = averageRating;
    }

    public String getImageurl() 
    {
        return imageurl;
    }

    public void setImageurl(String imageurl) 
    {
        this.imageurl = imageurl;
    }

    




    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        // Generate XML for news article data
        xml.append("<article>");
        xml.append("<articleId>").append(articleId).append("</articleId>");
        xml.append("<category>").append(category).append("</category>");
        xml.append("<title>").append(title).append("</title>");
        xml.append("<description>").append(description).append("</description>");
        xml.append("<url>").append(url).append("</url>");
        xml.append("<datePosted>").append(datePosted).append("</datePosted>");
        xml.append("<votesCount>").append(votesCount.toString()).append("</votesCount>");
        xml.append("<commentsCount>").append(commentsCount).append("</commentsCount>");
        xml.append("<sharesCount>").append(sharesCount).append("</sharesCount>");
        xml.append("<averageRating>").append(averageRating.toString()).append("</averageRating>");
        xml.append("<postedBy>").append(postedBy.toString()).append("</postedBy>");
        xml.append("<imageurl>").append(imageurl).append("</imageurl>");
        xml.append("<membername>").append(postedBy.getmemberEmail()).append("</membername>");
        xml.append("<isMemberPhotoUploaded>").append(postedBy.getIsImageUploaded().toString()).append("</isMemberPhotoUploaded>");
        xml.append("</article>");

        return xml.toString();
    }

}
