
package model;

public class MemberNameVO
{
    private String memberEmail;
    private String firstName;
    private String lastName;
    private Boolean isImageUploaded;

    public MemberNameVO()
    {
    
    }

    public MemberNameVO(String memberEmail,String firstName,String lastName, Boolean isImageUploaded)
    {
        this.memberEmail = memberEmail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isImageUploaded = isImageUploaded;
    
    }


    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getmemberEmail() 
    {
        return memberEmail;
    }

    public void setmemberEmail(String memberEmail) 
    {
        this.memberEmail = memberEmail;
    }

    public Boolean getIsImageUploaded() 
    {
        return isImageUploaded;
    }

    public void setIsImageUploaded(Boolean isImageUploaded) 
    {
        this.isImageUploaded = isImageUploaded;
    }


    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        // Generate XML for member data
        xml.append("<member>");
        xml.append("<firstName>").append(firstName).append("</firstName>");
        xml.append("<username>").append(memberEmail).append("</username>");
        xml.append("<fullname>").append(this.toString()).append("</fullname>");
        xml.append("<isImageUploaded>").append(isImageUploaded.toString()).append("</isImageUploaded>");
        xml.append("</member>");

        return xml.toString();
    }

    
    @Override
    public String toString()
    {
        return firstName + " " + lastName ;
    }

}
