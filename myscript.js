


window.onload = function(){
  
  var notesObj = {};
  var subUrl = "";
  var page = "";

  // Add one more if, if you want to extend this to a new website
  // also give that domain a new name

  // doamins right now
  
  // notes    --  geeksforgeeks.org  -- 
  // The reason I'm not changing this to notesGFG is because those users who have installed before the 2nd release would have their data for this name...
  // Now changing this would lead to loss of that data
  
  // notesCF  --  codeforces.com

  var mainUrl = window.location.href ;
  if(mainUrl.indexOf("www.geeksforgeeks.org") > -1)
  {
    subUrl = mainUrl.split("www.geeksforgeeks.org")[1];
    page = "notes";
    
  }
  else if(mainUrl.indexOf("codeforces.com") > -1)
  {
    subUrl = mainUrl.split("codeforces.com")[1];
    page = "notesCF"
  }

  chrome.storage.sync.get(page, function (obj) {
    notesObj=obj[page];
    
    if (typeof notesObj==='undefined') {  // This occurs when the extension is first used as nothing would be stored 
        notesObj={};
    };
    if (page === "notesCF")
      addNotesDivCF(page);
    else if (page === "notes")
      addNotesDiv(page);

  });


  // Tried writing one single function for both the pages
  // but it needed a lot of if else for perfect design of the notes which matches the page

  var addNotesDiv = function(page)
  {
    
    // DOM structure :
    // div > ( (notesHeader > (Title+a) ) + notesInput)
    // code for the design of the geeky note for GFG    
    var notesHeader = document.createElement('div');
    var notesInput = document.createElement('textarea');
    var title = document.createElement('h2');

    notesHeader.style.paddingBottom = "5px";

    title.innerHTML = "geeksNote";
    title.className = "archive-title";
    title.style.display = "inline";
    title.style.lineHeight = "0";

    var a = document.createElement('a');
    a.setAttribute('href',"chrome-extension://"+chrome.runtime.id+"/notes/notes.html");
    a.innerHTML = "All Notes";
    a.style.display = "inline";
    a.style.float = "right";
    a.style.paddingBottom = "0";
    a.target = "_blank";
    notesHeader.appendChild(title);
    notesHeader.appendChild(a);

    notesInput.setAttribute("id","notes-box");
    if(subUrl in notesObj)
    {
      notesInput.value = notesObj[subUrl];
    }
    notesInput.type = "text";
    notesInput.style.resize="vertical"; 
    notesInput.style.width="100%"; 
    notesInput.style.boxSizing="border-box"; 
    notesInput.style.backgroundColor="#ffffcc"; 
    notesInput.style.minHeight="150px"; 
    notesInput.style.fontSize="13px"; 
    notesInput.style.color="#606060"; 
    notesInput.style.fontFamily="'Source Code Pro', Consolas,  Menlo, Courier, monospace !important"; 
    var t;
    notesInput.oninput = function() {
      notesInput.style.height = ""; 
      notesInput.style.height = Math.max(notesInput.scrollHeight,150)+ "px";
      if ( t )
      {
        clearTimeout( t );
        t = setTimeout( syncNotes, 2000 ); // syncs the text after a time gap of 2sec from last edit
      }
      else
      {
        t = setTimeout( syncNotes, 2000 );
      }
    };
    function syncNotes()
    {
        notesObj[subUrl] = document.getElementById('notes-box').value;
        var objName = page;
        var savingObj = {};
        savingObj[objName] = notesObj;
        chrome.storage.sync.set(savingObj, function() {
            // console.log('saved',objName,notesObj);          
        }); 
    }

    var div = document.createElement("div");
    div.setAttribute("id","text-notes");
    div.className = "widget widget_text";
    
    div.appendChild(notesHeader);
    div.appendChild(notesInput);

    var secondary = document.getElementById('secondary');
    if (secondary != null)
      secondary.insertBefore(div, secondary.firstChild);


  }




  var addNotesDivCF = function(page)
  {
    
    
    var notesInput = document.createElement('textarea');

    

    notesInput.setAttribute("id","notes-box");
    if(subUrl in notesObj)
    {
      notesInput.value = notesObj[subUrl];
    }
    notesInput.type = "text";
    notesInput.style.resize="vertical"; 
    notesInput.style.width="100%"; 
    notesInput.style.border="none"; 
    notesInput.style.outline="none"; 
    notesInput.style.boxShadow="none"; 
    notesInput.style.boxSizing="border-box"; 
    notesInput.style.backgroundColor="#ffffcc"; 
    notesInput.style.minHeight="150px"; 
    notesInput.style.fontSize="13px"; 
    notesInput.style.padding="5px"; 
    notesInput.style.color="#606060"; 
    notesInput.style.fontFamily="'Source Code Pro', Consolas,  Menlo, Courier, monospace !important"; 
    var t;
    notesInput.oninput = function() {
      notesInput.style.height = ""; 
      notesInput.style.height = Math.max(notesInput.scrollHeight,150)+ "px";
      if ( t )
      {
        clearTimeout( t );
        t = setTimeout( syncNotes, 2000 );
      }
      else
      {
        t = setTimeout( syncNotes, 2000 );
      }
    };
    function syncNotes()
    {
        notesObj[subUrl] = document.getElementById('notes-box').value;
        var objName = page;
        var savingObj = {};
        savingObj[objName] = notesObj;
        chrome.storage.sync.set(savingObj, function() {
            // console.log('saved',objName,notesObj);          
        }); 
    }

    var div = document.createElement("div");
    div.setAttribute("id","text-notes");
    
    div.className = "roundbox sidebox";
    var div1 = document.createElement("div");
    div1.className = "roundbox-lt";
    div1.innerHTML = "&nbsp;"
    div.appendChild(div1);
    var div2 = document.createElement("div");
    div2.className = "roundbox-rt";
    div2.innerHTML = "&nbsp;"
    div.appendChild(div2);
    
  

    var notesHeader = document.createElement('div');
    notesHeader.className = "titled";
    notesHeader.style.padding = "5px";
    var title = document.createElement('h2');
    // notesHeader.style.paddingBottom = "5px";

    title.innerHTML = "geeksNote";
    title.className = "caption";
    title.style.display = "inline";
    title.style.lineHeight = "0";
    title.style.paddingLeft = "5px";
    title.style.border = "0";
    title.style.fontSize = "14px";

    var a = document.createElement('a');
    a.setAttribute('href',"chrome-extension://"+chrome.runtime.id+"/notes/notes.html");
    a.innerHTML = "All Notes";
    a.style.display = "inline";
    a.style.float = "right";
    a.style.fontSize = "10px";
    a.style.paddingBottom = "0";
    a.style.paddingTop = "5px";
    a.target = "_blank";
    notesHeader.appendChild(title);
    notesHeader.appendChild(a);
    div.appendChild(notesHeader);
    div.appendChild(notesInput);

      

    
    var secondary = document.getElementById('sidebar');
    if (secondary != null)
      secondary.insertBefore(div, secondary.firstChild);


  }

}
