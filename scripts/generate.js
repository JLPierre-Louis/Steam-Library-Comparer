var Steam = require('machinepack-steam');
var STEAM_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // CHANGE THIS VARIABLE TO EQUAL YOUR STEAM API KEY
var ID = '';
var userCounter = 1;
var numUsers = 0;
var users = [];
var userLibraries = [];

function convertToAppId(games){
  var newArray = games.map(function(x){
    return x.appid;
  })
  return newArray;
}

function addUserHelper(anID, aTextbox){
  var profilePic = document.createElement("img");
  var list = document.getElementById("usersList");
  var item = document.createElement("li");

  Steam.getPlayerSummaries({
    steamids: [ anID ],
    key: STEAM_API_KEY,
  }).exec({
    error: function (err) {
      console.log(err);
    },
    success: function (result) {
      profilePic.src = result.players[0].avatarmedium;
      item.appendChild(profilePic);
      item.appendChild(document.createTextNode(result.players[0].personaname)); // username
      list.appendChild(item);
    },
   })

  users.push(anID);
  aTextbox.value  = "";
  userCounter++;

  Steam.getOwnedGames({
    steamid: anID,
    key: STEAM_API_KEY,
    include_appinfo: 1,
    include_played_free_games: 1,
    appids_filter: [],
  }).exec({
    // unexpected error occurred
    error: function (err) {
      console.log(err);
    },
    // OK
    success: function (result) {
      userLibraries.push(convertToAppId(result.games));
    },
  });
}

function checkExisting(anID, aTextbox) {
  if(users.length > 0) {
    if((
      users.map(function(anAppID) {
        return anAppID === anID;
      })).indexOf(true) == -1) {
        addUserHelper(anID, aTextbox);
      }
    else{
      alert("This user has already been added.");
    }
  } else {
    addUserHelper(anID, aTextbox);
  }
}

function addUser() {
  ID = document.getElementById("userBox").value;
  var textbox = document.getElementById('userBox');

  if(textbox.value.length == 17) {
    checkExisting(ID, textbox);
  } else {
    console.log(textbox.value.length);
    alert("Please input a valid length Steam ID. (Steam 64 ID)");
  }
}

// finds the largest steam library to use as the main search
function findTheMain() {
  var steamLibTotals = userLibraries.map(function(x) {
    return x.length;
  });
  return steamLibTotals.indexOf(Math.max(...steamLibTotals));
}

function compareLibraries() {
  var x = findTheMain();
  var main = userLibraries[x];
  var otherLibraries = userLibraries.splice(x, 1);
  var matches = [];
  var gamesList = [];
  var img = document.createElement("img");
  var list = document.createElement("ul");
  var button = document.getElementById("generator");
  var matchesHeader = document.createElement("h3");
  var mainColumn = document.getElementById("main");


  matchesHeader.innerHTML = "Steam library matches: ";
  button.parentNode.removeChild(button);
  mainColumn.appendChild(matchesHeader);

  for(var i = 0; i < main.length; i++) {
    if((
      userLibraries.map(function(arr) {
        return arr.indexOf(main[i]);    }))
      .indexOf(-1) == -1) {
      matches.push(main[i]);
    }
  }

  Steam.getOwnedGames({
    steamid: users[x],
    key: STEAM_API_KEY,
    include_appinfo: 1,
    include_played_free_games: 1,
    appids_filter: [],
  }).exec({
    // unexpected error occurred
    error: function (err) {
      console.log(err);
    },
    // OK
    success: function (result) {
      var allGames = result.games;
      for(var i = 0; i < matches.length; i++) {
        for(var j = 0; j < allGames.length; j++) {
          if(allGames[j].appid == matches[i])
            gamesList.push(allGames[j]);
        }
      }

      if(gamesList.length > 0) {
        for(var i = 0; i < gamesList.length; i++) {
          var item = document.createElement("li");
          var gameImg = document.createElement("img");
          gameImg.src = "http://media.steampowered.com/steamcommunity/public/images/apps/" + gamesList[i].appid + "/" + gamesList[i].img_logo_url + ".jpg";
          item.appendChild(gameImg);
          item.appendChild(document.createTextNode(gamesList[i].name));
          list.appendChild(item);
        }
      } else {
        var noGames = document.createElement("li");
        noGames.appendChild(document.createTextNode("There were no matching games found."));
        list.appendChild(noGames);
      }

      mainColumn.appendChild(list);
    },
  });
}

function generateMatches() {
  if(users.length > 1) {
    compareLibraries();
  } else {
    alert("Add 2 or more Steam users first.");
  }
}
