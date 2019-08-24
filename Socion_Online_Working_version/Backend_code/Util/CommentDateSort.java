package Util;

import java.util.Comparator;
import java.util.Date;
import model.CommentVO;


// Class which provides implementation of Comparator interface to provide sorting of ArticleVO objects in descending order of news posted date
public class CommentDateSort implements Comparator<CommentVO>
{

    public int compare(CommentVO one, CommentVO two)
    {
        
        String firstDateString = one.getDatePosted();
        String secondDateString = two.getDatePosted();
        
        Date firstDate = XMLUtilities.convertStringToGMTDate(firstDateString, 0);
        Date secondDate = XMLUtilities.convertStringToGMTDate(secondDateString, 0);
        // Sort by descending order of news posted dates
        return secondDate.compareTo(firstDate);
    }
}

