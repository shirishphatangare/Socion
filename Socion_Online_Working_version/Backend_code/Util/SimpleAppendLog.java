package Util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;
import java.text.SimpleDateFormat;

public class SimpleAppendLog 
{
    BufferedWriter _out;        
 
    public SimpleAppendLog(String filename) 
    {
        try 
        {
            // Get file handle
            FileWriter fstream = new FileWriter(filename, true);
            this._out = new BufferedWriter(fstream);
        }
        catch (IOException e) 
        {
            System.out.println("IOException: "+e.getMessage());
        }       
    }
    
 
    public void write(String str) 
    {
        // Get current date formatted
        Date date = new Date();                             
        SimpleDateFormat format = new SimpleDateFormat();   
        String current_date = format.format(date);          

        try 
        {
            // Write new line, date and given string
            _out.write(current_date+" - "+str+"\r\n"); 
            _out.flush();
        }
        catch (IOException e) 
        {
            System.out.println("IOException: "+e.getMessage());
        }
    }
 

    public void close() 
    {
        try 
        {
            this._out.close();
        }
        catch (IOException e) 
        {
            System.out.println("IOException: "+e.getMessage());
        }
    }
}