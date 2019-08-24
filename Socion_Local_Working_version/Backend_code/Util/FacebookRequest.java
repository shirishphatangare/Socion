package Util;

import org.apache.commons.codec.binary.Base64;


public class FacebookRequest 
{
    Object code;
    String algorithm;
    long expires;
    long issued_at;
    String user_id;
    String oauth_token;
    FacebookRegister registration;
    Object registration_metadata;

    public String getOauth_token() {
        return oauth_token;
    }

    public void setOauth_token(String oauth_token) {
        this.oauth_token = oauth_token;
    }
    


    public String getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(String algorithm) {
        this.algorithm = algorithm;
    }

   

    public long getExpires() {
        return expires;
    }

    public void setExpires(long expires) {
        this.expires = expires;
    }

    public long getIssued_at() {
        return issued_at;
    }

    public void setIssued_at(long issued_at) {
        this.issued_at = issued_at;
    }

    public Object getCode() {
        return code;
    }

    public void setCode(Object code) {
        this.code = code;
    }

    public FacebookRegister getRegistration() {
        return registration;
    }

    public void setRegistration(FacebookRegister registration) {
        this.registration = registration;
    }

    public Object getRegistration_metadata() {
        return registration_metadata;
    }

    public void setRegistration_metadata(Object registration_metadata) {
        this.registration_metadata = registration_metadata;
    }

  

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
    
    
    public String toXML() throws InvalidInputNameException
    {
        StringBuilder ReqXML = new StringBuilder();
        
        String password = registration.getPassword();
        String encodedPassword = new String(Base64.encodeBase64(password.getBytes()));
        
        String fullName = registration.getName();
        
        if(fullName.matches("^\\w+\\s+\\w+$") == false)
            throw new InvalidInputNameException("Invalid input Name! Firstname must be followed by a space and lastname.");
            
            
        
        String[] nameArray = fullName.split("\\s+");
        
        String firstName = nameArray[0];
        String lastName = nameArray[1];
        
        ReqXML.append("<member>");
        ReqXML.append("<firstname>").append(firstName).append("</firstname>");
        ReqXML.append("<lastname>").append(lastName).append("</lastname>");
        ReqXML.append("<memberEmail>").append(registration.getEmail()).append("</memberEmail>");
        ReqXML.append("<password>").append(encodedPassword).append("</password>");
        ReqXML.append("</member>");
        
        return ReqXML.toString();
    }        

}
