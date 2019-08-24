package Util;

import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
 
public class SortMap
{
 
   
   public static LinkedHashMap sortByComparator(Map unsortMap) 
   {
 
        List list = new LinkedList(unsortMap.entrySet());
 
        //sort list based on comparator
        Collections.sort(list, new Comparator() 
        {
             public int compare(Object o1, Object o2) 
             {
	           return ((Comparable) ((Map.Entry) (o2)).getValue()).compareTo(((Map.Entry) (o1)).getValue());
             }
	});
 
        //put sorted list into map again
	LinkedHashMap sortedMap = new LinkedHashMap();
	for (Iterator it = list.iterator(); it.hasNext();) 
        {
	     Map.Entry entry = (Map.Entry)it.next();
	     sortedMap.put(entry.getKey(), entry.getValue());
	}
	return sortedMap;
   }	
}