// https://developer.chrome.com/extensions/bookmarks

// https://developer.chrome.com/extensions/bookmarks#method-get
// https://stackoverflow.com/questions/10268776/why-doesnt-chrome-bookmarks-gettree-work
// https://www.w3schools.com/jsref/met_node_appendchild.asp

/*    CONTENTS
  1. Page elements
  2. date title
  2. bookmarks
  3. history
  4. hub
  5. weather

*/

//////////////////////////////////////////////////////////////////////////////// page elements //////////////////////////////////////////////////////////////////
const bmarkfolder = document.getElementById("bmarkfolder");
const bmark = document.getElementById("bmark");
const hlist = document.getElementById("hlist");
const hubButton = document.getElementById("hubButton");
const label = document.getElementById("label");
const date = document.getElementById("date");
const stylesheet = (document.styleSheets[0].cssRules[2]);

var colorarray = ["rgba(0,255,255,", "rgba(10,255,0,", "rgba(130,10,255,", "rgba(255,10,10,", "rgba(255,130,10,"]
var highlightColor = colorarray[Math.floor(Math.random() * colorarray.length)];
stylesheet.style.setProperty('--highlight-colour', highlightColor + ".4)" );
stylesheet.style.setProperty('--text-highlight', highlightColor + "1)")


//////////////////////////////////////////////////////////////////////////////// DATE /////////////////////////////////////////////////////////////////////////
function TitleDate() {
  var d = new Date();
  var n = d.getDate();
  var s = "th"
  if (n == 1 || n == 21 || n == 31) {
    s = "st"
  }
  else {
    if (n == 2 || n == 22) {
      s = 'nd'
    }
    else {
      if (n == 3 || n == 23) {
        s = 'rd'
      }
    }
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var m = monthNames[d.getMonth()]
  date.innerHTML = n + s + " of " + m;
}

TitleDate()



//////////////////////////////////////////////////////////////////////////////// bookmarks /////////////////////////////////////////////////////////////////////////
//use chrome API to get bookmarks data
//This goes through the Chrome bookmarks API and retrieves the node tree
chrome.bookmarks.getTree(function(tree) {
  tree.forEach(function(tree) {
    processNode(tree);
  });
});


function clearmid() {
  while (bmark.firstChild) {
    bmark.removeChild(bmark.lastChild);
  }
}


//Gets folders and bookmarks from tree
function processNode(node) {
  // recursively process child nodes
  if (node.children) {
    node.children.forEach(function(child) {
      processNode(child);
    });
  }
  //list boomark folders from bookmarks bar & other bookmarks into left column
  if (node.parentId == 1 || node.parentId == 2) {
    if (node.children) {
    var fname = (node.title);
    var button = document.createElement("BUTTON");
    var para = document.createElement("LI");
    var textnode = document.createTextNode(fname);

    button.setAttribute('class', 'btn')
    button.appendChild(textnode);
    para.appendChild(button);
    bmarkfolder.appendChild(para);

    //opens folder and displays contents in centre column
    button.onclick = function openFolder() {
      //set label
      label.innerHTML = fname
      //remove previous items if they are being displayed
      clearmid()
      //process each URL
      var subtree = document.createElement("DIV")
      bmark.appendChild(subtree)


      node.children.forEach((bm, i) => {
        if (bm.url) {
          var bmurl = (bm.url);
          var bmname = (bm.title);
          var para = document.createElement("LI");
          var itemtext = document.createTextNode(bmname);
          var a = document.createElement("a");

          para.setAttribute('class', 'bm')
          a.appendChild(itemtext);
          a.href = bmurl
          para.appendChild(a);
          bmark.appendChild(para)
        }
        //process subfolder
        if (bm.children) {
          var bmname = (bm.title);
          var sbutton = document.createElement("BUTTON");
          var itemtext = document.createTextNode(bmname);

          sbutton.setAttribute('class', 'sbtn')
          sbutton.appendChild(itemtext);
          subtree.appendChild(sbutton);
            //match all items to largest width https://stackoverflow.com/questions/31159732/every-item-to-have-the-same-width-as-the-widest-element


          sbutton.onclick = function() {
            clearmid()
            bm.children.forEach((subf, i) => {
              if (subf.url) {
                label.innerHTML = bmname
                var subfurl = (subf.url);
                var subfname = (subf.title);
                var para = document.createElement("LI");
                var itemtext = document.createTextNode(subfname);
                var a = document.createElement("a");


                para.setAttribute('class', 'bm')
                a.appendChild(itemtext);
                a.href = subfurl
                para.appendChild(a);
                bmark.appendChild(para)
              }
            });
          }
        }
      });
    }
  }
}
}
//////////////////////////////////////////////////////////////////////////////// history /////////////////////////////////////////////////////////////////////////
// https://developer.chrome.com/extensions/history
chrome.history.search({
  text: '',
  maxResults: 25
}, function(hitems) {
  hitems.forEach(function(hitems) {
    var hurl = (hitems.url);
    var hname = (hitems.title);
    var para = document.createElement("LI");
    var itemtext = document.createTextNode(hname);
    var a = document.createElement("a");

    //set class of item for css
    para.setAttribute('class', 'bm')

    a.appendChild(itemtext);
    a.href = hurl
    para.appendChild(a);
    hlist.appendChild(para)
  });
})

//////////////////////////////////////////////////////////////////////////////// Hub ////////////////////////////////////////////////////////////////////////////
// https://developer.chrome.com/extensions/topSites
function hub() {
  label.innerHTML = "Hub"
  clearmid()
  //prepare containers
  var appspace = document.createElement("DIV");
  bmark.appendChild(appspace)
  appspace.setAttribute('class', 'appspace')
  var weatherspace = document.createElement("DIV");
  appspace.appendChild(weatherspace);
  var topsites = document.createElement("DIV");
  appspace.appendChild(topsites);
  weatherspace.setAttribute('class', 'app');
  topsites.setAttribute('class', 'app');


  //topsites
  chrome.topSites.get(function(tsitems) {
    tsitems.forEach(function(tsitems) {
      var tsurl = (tsitems.url);
      var tsname = (tsitems.title);
      var para = document.createElement("LI");
      var itemtext = document.createTextNode(tsname);
      var a = document.createElement("a");
      //set class of item for css
      para.setAttribute('class', 'bm')

      a.appendChild(itemtext);
      a.href = tsurl
      para.appendChild(a);
      topsites.appendChild(para)
    });
  });
  //bookmarks bar
  chrome.bookmarks.getTree(function(tree) {
    tree.forEach(function(tree) {
      tree.children.forEach((bfolder, i) => {
        bfolder.children.forEach((quicklink, i) => {
          if (quicklink.url) {
            var qlurl = (quicklink.url);
            var qlname = (quicklink.title);
            var para = document.createElement("LI");
            var itemtext = document.createTextNode(qlname);
            var a = document.createElement("a");

            para.setAttribute('class', 'bm')

            a.appendChild(itemtext);
            a.href = qlurl;
            para.appendChild(a);
            topsites.appendChild(para)
          }
        });

      });
    });
  });

  ////////////////////////////////////////////////////////////////////////////// weather app /////////////////////////////////////////////////////////////////////////
  const weather = {};
  weather.temperature = {
    unit: "celsius"
  }
  const KELVIN = 273;
  navigator.geolocation.getCurrentPosition(setPosition)

  function setPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    callweatherAPI(lat, lon)
  }

  function callweatherAPI(lat, lon) {


    let weatherapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherkey}`
    fetch(weatherapi).then(function(weathercall) {
        let weatherdata = weathercall.json();
        return weatherdata;
      })
      .then(function(weatherdata) {
        weather.temperature.value = Math.floor(weatherdata.main.temp - KELVIN);
        var para = document.createElement("LI");
        var weatherdisplay = document.createTextNode("The temperature in " + weatherdata.name + " is " + weather.temperature.value + "°")
        para.appendChild(weatherdisplay);
        //para.appendChild(tempdisplay);
        weatherspace.appendChild(para);
      })
  }
}



//////////////////////////////////////////////////////////////////////////////// execute hub /////////////////////////////////////////////////////////////////////////

hub();
hubButton.onclick = function() {
  hub()
}
