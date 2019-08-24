package Util;

public interface Socion_Constants 
{
    public static final String DBHOST = "localhost";  
    public static final int    DBPORT = 4488;
    public static final String DBUSER = "db4o";
    public static final String DBPASS = "db4o";
    public static final String DB4OFILENAME = XMLUtilities.getProperty("DBPATH");
    public static final String LOGFILENAME = XMLUtilities.getProperty("LOGPATH");
    public static final String senderEmailID = "oursocion@gmail.com";
    public static final String senderPassword = "!!nebula";
    public static final String emailSMTPserver = "smtp.gmail.com";
    public static final String emailServerPort = "465";
}
