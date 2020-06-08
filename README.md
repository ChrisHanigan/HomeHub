# HomeHub
A Homescreen for Google Chrome

# Installation
1. Download these files and unzip
2. Open the file APIkeysTemplate.js and edit it as directed.
3. In Google Chrome click the ⋮ menu button, top right.
4. Under 'more tools' select 'extensions'
5. turn on developer mode, top right.
6. click 'Load unpacked' and navigate to the folder containing the downloaded files. Click open.
7. The extension should now work. Open a new tab to see it!

This extension is in development and I do plan on releasing this on the chrome app store at v1.0

# intent
Create a html website to use as a new tab page which displays all bookmarks and some useful apps
without any outside services, keeping everything syncronised to Chrome.

# todo
1. Display bookmark contents on pages.
	- ✅ create Google chrome extension.												
	- ✅ Make it replace new tab page.													
	- ✅ Load bookmarks from Chrome into new tab page.					
	- ✅ neaten into readable list.														
	- ✅ make links clickable.																	
2. Implement folders																		
	- ✅ Get folder list from bookmarks API										
	- ✅ hide folder contents until clicked										
	- ✅ insert displayed bookmarks to second column						
	- ✅ clear previous folder items when clicking new folder 	
	- ✅ allow for folders within folders											
	- ✅ allow for folders alongside links											
	- ⬛ show links from top level folders											
3. Make it look nice																			
	- ✅ Apply style sheet																			
	- ⬛ Give nice looking frames and panels										
	- ⬛ Apply animations																			
	- ✅ give it a nice background															
	- ⬛ Create card displays for each app											
5. Create options page																	
	- ⬛ Allow for saving settings															
	- ⬛ toggle new page replacement														
	- ⬛ Allow for custom backgrounds.													
	- ⬛ Order bookmarks by most visited												
	- ⬛ Add and remove sections																
6. Add history																						
	- ✅ Get history items from API													
	- ✅ display items on page															
7. Add top sites
  	- ✅ Add topsites list
	- ⬛ add button to return to top topSites									
8. Add controls																						
	- ⬛ add bookmark																					
	- ⬛ edit bookmark																					
	- ⬛ delete bookmark																				

# App integration
1. ⬛ Google keep integration																
2. ⬛ Gmail integration: recent unread												
3. ⬛ Youtube integration																		
4. ⬛ News rss																								
5. ⬛ Google Drive integration: recent files									
6. ✅ Weather																								
7. ⬛ google calendar																				

# Comments
1. The chrome json file was innacessable without using the chrome API
	- This meant I had to create my own extension just to access bookmarks

# Resources
https://developer.chrome.com/extensions/getstarted
https://developer.chrome.com/extensions/bookmarks
https://developer.chrome.com/extensions/bookmarks#method-get
https://stackoverflow.com/questions/10268776/why-doesnt-chrome-bookmarks-gettree-work
https://www.w3schools.com/jsref/met_node_appendchild.asp

# License
This code is for personal purposes
