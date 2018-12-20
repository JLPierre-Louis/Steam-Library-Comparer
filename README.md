# Steam Library Comparer
### Developer

Jean-Luc Pierre-Louis (jdpierrelouis@wpi.edu)

### Instructions to Run

1. Download the source code
2. Download and install Node.js (https://nodejs.org/en/download/)
3. Register a Steam API Key (https://steamcommunity.com/dev/apikey) (for address you can put 127.0.0.1)
4. Find ```var STEAM_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'``` in ```index.html``` and change the X's to your Steam API Key
5. Open a command prompt
6. Navigate to the project's folder wherever you put it using the command promt
7. Run the command ```npm install electron -g``` to install electron globally
8. Enter ```npm start``` to run the application

### Instructions for Using the Application

1. Input the number of users you would like to compare (2 or more)
2. Enter the Steam ID of the users you would like to compare. You can find the Steam ID using https://steamid.co/ 
   Use the Steam64 ID
3. Once all the Steam IDs have been entered, press the Generate Matches button

Description
===========

This is a Javascript desktop application that uses Electron and the Machinepack-Steam package to enable users to input 2 or more steam users (with public profiles) and receive a list of the steam games which are common between all the given libraries.

I will work on improving the application into the future. Improving things such as appearances, functionality, and bugs. Contact me at my above email with any inquiries.
