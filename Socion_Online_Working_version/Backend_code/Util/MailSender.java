
package Util;

import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class MailSender
{
    final static String senderEmailID = Socion_Constants.senderEmailID;
    final static String senderPassword = Socion_Constants.senderPassword;
    final static String emailSMTPserver = Socion_Constants.emailSMTPserver;
    final static String emailServerPort = Socion_Constants.emailServerPort;


    private static class SMTPAuthenticator extends javax.mail.Authenticator
    {
        public PasswordAuthentication getPasswordAuthentication()
        {
            return new PasswordAuthentication(senderEmailID, senderPassword);
        }
    }


    public static synchronized boolean sendByEmail(String receiverEmailId, String emailsubject, String emailbody)
    {
        String receiverEmailID = receiverEmailId;
        String emailSubject = emailsubject;
        String emailBody = emailbody;

        try
        {
            Properties props = new Properties();

            props.put("mail.smtp.user",senderEmailID);
            props.put("mail.smtp.host", emailSMTPserver);
            props.put("mail.smtp.port", emailServerPort);
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.socketFactory.port", emailServerPort);
            props.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.socketFactory.fallback", "false");

            //SecurityManager security = System.getSecurityManager();

            Authenticator auth = new SMTPAuthenticator();
            Session session = Session.getInstance(props, auth);
            Transport transport = session.getTransport("smtp");

            MimeMessage msg = new MimeMessage(session);

            msg.setText(emailBody);
            msg.setSubject(emailSubject);
            msg.setFrom(new InternetAddress(senderEmailID));
            msg.addRecipient(Message.RecipientType.TO,new InternetAddress(receiverEmailID));

            transport.connect(emailSMTPserver, Integer.parseInt(emailServerPort), senderEmailID, senderPassword);
            Transport.send(msg);
            transport.close();

            return true;
        }
        catch(Exception e)
        {
            XMLUtilities.log.write("Error: " + e.getMessage());
            return false;
        }
    }
} 