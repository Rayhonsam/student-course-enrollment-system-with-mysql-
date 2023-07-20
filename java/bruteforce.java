import java.util.*;
import java.io.*;

public class bruteforce {
    public static String encryption(String st,int s,String arr)
    {
        String index="";
        int[] a=new int[st.length()];
        for(int i=0;i<st.length();i++)
        {
            char c=st.charAt(i);
            for(int j=0;j<arr.length();j++)
            {
                char cc=arr.charAt(j);
                if(c==cc)
                {
                    a[i]=(j+s)%26;
                }
            }
        }
        for(int i=0;i<a.length;i++)
        {
             int e=a[i];
             index+=arr.charAt(e);
        }
        return index;
    }
    public static String decryption(String st,int s,String arr)
    {
        String index="";
        int[] a=new int[st.length()];
        for(int i=0;i<st.length();i++)
        {
            char c=st.charAt(i);
            for(int j=0;j<arr.length();j++)
            {
                char cc=arr.charAt(j);
                 if(c==cc)
                 {
                      int decindex=(j-s)%26;
                      if(decindex<0)
                      {
                        decindex+=26;
                      }
                      a[i]=decindex;
                 }
            }
        }
        for(int i=0;i<a.length;i++)
        {
            int e=a[i];
            index+=arr.charAt(e);
        }
        return index;
    }
   public static void main(String[] args) {
       Scanner in=new Scanner(System.in);
       System.out.println("enter the encrypted string");
       String st=in.next();
       boolean flag=true;
       String arr="abcdefghijklmnopqrstuvwxyz";
       for(int i=0;i<25;i++)
       {
          String dec=decryption(st, i, arr);
          System.out.println(dec);
       }
   }
}
