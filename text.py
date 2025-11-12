
text = input("Enter a string: ")

vowels = 0
consonants = 0

vowel_set = "aeiouAEIOU"

for char in text:
    if char.isalpha():  
        if char in vowel_set:
            vowels += 1
        else:
            consonants += 1

print("Number of vowels:", vowels)
print("Number of consonants:", consonants)
