# country_1.0
link: https://mahavir745.github.io/country_1.0/

### Project approched:
```
==> Fetch the data from the API.
==> Make sure to store the data in our local storage.
==> Also provide the feature for the user to mark as fav. Also able to filter the flags by using languages and region.

==> Also provide the search option for the user and a dropdown menu while searching.
```

```
There are several steps which I had taken while doing this projects:

step 1: fetch the data and store the flag details 
in a seperated array. By using that array display all the flags in the screen. 

(I also put a condition, by default only 10 flag has been displayed on the screen. And for further flags I put a more button.)

```

### Same approched for finding languages and region.

```
I took two arrays one for language and an another one is for region. 

Through this array I am pushing all languages and region in a seperated <select> tag.
```

##### Above this are the main approched which had taken. 

```For Features I used addEventListner according to the instructions.```

```
dropdown ==> for dropdown I took a parent container and a child div. 

Main approched => I already store all the country name in an array. Through the array I am able to iterate. 
And pushing a div into the parent div child while entering inputs.

And by using some css its seem like a dropdown.
```

```
In a localstorage I am storing three data.
1. while chicking any flag then flagname and a boolean value for managing the fav list.

2. when user click the fav button the storing whole data of the flag which is vissible on the screen.
```