def is_anagram(s, t):
    if len(s) != len(t): # Check the length between the two strings
        return False
    else:
        if sorted(s) == sorted(t): # Use sorted() function to sort the strings
            return True
        else:
            return False
    
# Driver code
str1 = "anagram"
str2 = "nagaram"
str3 = "rat"
str4 = "car"
str5 = "abcd"
str6 = "abc"
str7 = ""
str8 = ""
str9 = "abba"
str10 = "baab"
str11 = "abc"
str12 = "xyz"

if is_anagram(str1, str2):
    print("The strings are anagrams.")
else:
    print("The strings aren't anagrams.")