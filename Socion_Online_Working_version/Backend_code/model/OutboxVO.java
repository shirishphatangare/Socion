package model;

import Util.XMLUtilities;
import java.util.List;

public class OutboxVO
{
    private MemberNameVO outboxFor;
    private List<String> outboxSubmitted;
    private List<String> outboxInbox;

    public MemberNameVO getOutboxFor() 
    {
        return outboxFor;
    }

    public void setOutboxFor(MemberNameVO outboxFor) 
    {
        this.outboxFor = outboxFor;
    }


    public List<String> getOutboxInbox() 
    {
        return outboxInbox;
    }

    public void setOutboxInbox(List<String> outboxInbox) 
    {
        this.outboxInbox = outboxInbox;
    }


    public List<String> getOutboxSubmitted() 
    {
        return outboxSubmitted;
    }

    public void setOutboxSubmitted(List<String> outboxSubmitted) 
    {
        this.outboxSubmitted = outboxSubmitted;
    }
    


    public OutboxVO(MemberNameVO outboxFor, List<String> outboxSubmitted, List<String> outboxInbox)
    {
        this.outboxFor = outboxFor;
        this.outboxSubmitted = outboxSubmitted;
        this.outboxInbox = outboxInbox;
    }

    public String toXML()
    {
        StringBuilder xml = new StringBuilder();

        XMLUtilities xmlutil = new XMLUtilities();

        String outboxSubmittedXml = new String();
        if(!outboxSubmitted.isEmpty())
            outboxSubmittedXml = xmlutil.listToCommaSeparatedString(outboxSubmitted);
        
        String outboxInboxXml = new String();
        if(!outboxInbox.isEmpty())
            outboxInboxXml = xmlutil.listToCommaSeparatedString(outboxInbox);
        

        // Generate XML for member data
        xml.append("<outbox>");
        xml.append("<outboxFor>").append(outboxFor.getmemberEmail()).append("</outboxFor>");
        xml.append("<outboxSubmitted>").append(outboxSubmittedXml).append("</outboxSubmitted>");
        xml.append("<outboxInbox>").append(outboxInboxXml).append("</outboxInbox>");
        xml.append("</outbox>");

        return xml.toString();
    }

}
