package Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class FacebookSignedRequest 
{
    
private static final String SIGN_ALGORITHM = "HMACSHA256";
private static final String secret = "f19f1ee02762d1b977115a766ff78efd";


public FacebookRequest parseSignedRequest(String sigreq) throws SocialNetworkingException
{        
    /* split the string into signature and payload */
    int idx = sigreq.indexOf(".");
    
    byte[] sig = new Base64(true).decode(sigreq.substring(0, idx).getBytes());
    String rawpayload = sigreq.substring(idx+1);
    
    String payload = new String(new Base64(true).decode(rawpayload));

    /* parse the JSON payload and do the signature check */
    FacebookRequest ret = new Gson().fromJson(payload, FacebookRequest.class);
    
    // Do not code below -- Need for debugging
    
    /*Gson gson = new GsonBuilder().setPrettyPrinting().create();
    String json = gson.toJson(ret);
    System.out.println("Returned Facebook Json : " + json);*/
    
    
    
    /* check if it is HMAC-SHA256 */
    if (!ret.getAlgorithm().equals("HMAC-SHA256")) 
    {
        /* note that this follows facebooks example, as published on 2010-07-21 (I wonder when this will break) */
        throw new SocialNetworkingException("Unexpected hash algorithm " + ret.getAlgorithm());
    }
    
    /* then check the signature */
    checkSignature(rawpayload, sig);
    return ret;
}


public void checkSignature(String rawpayload, byte[] sig) throws SocialNetworkingException
{        
    try 
    {
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), SIGN_ALGORITHM);
        
        Mac mac = Mac.getInstance(SIGN_ALGORITHM);
        mac.init(secretKeySpec);
        
        byte[] mysig = mac.doFinal(rawpayload.getBytes());
        
        if (!Arrays.equals(mysig, sig)) 
        {
            throw new SocialNetworkingException("Non-matching signature for request");
        }
    } 
    catch (NoSuchAlgorithmException e) 
    {
        throw new SocialNetworkingException("Unknown hash algorithm " + SIGN_ALGORITHM);
    } 
    catch (InvalidKeyException e) 
    {
        throw new SocialNetworkingException("Wrong key for " + SIGN_ALGORITHM);
    }
}


}
