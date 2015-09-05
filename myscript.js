window.onload = function(){

  var notesObj = {};
  var mainUrl = window.location.href ;
  var subUrl = mainUrl.split("www.geeksforgeeks.org")[1];
  chrome.storage.sync.get("notes", function (obj) {
    notesObj=obj.notes;
    
    if (typeof notesObj==='undefined') {  // This occurs when the extension is first used as nothing would be stored 
        notesObj={};
    };
    addNotesDiv();

  });
  var addNotesDiv = function()
  {
    var secondary = document.getElementById('secondary');
    var notesInput = document.createElement('textarea');
    var notesHeader = document.createElement('div');
    var title = document.createElement('h2');

    notesHeader.style.paddingBottom = "5px";

    title.innerHTML = "geeksNote";
    title.className = "archive-title";
    title.style.display = "inline";
    title.style.lineHeight = "0";

    var a = document.createElement('a');
    // console.log(chrome.runtime.id);
    a.setAttribute('href',"chrome-extension://"+chrome.runtime.id+"/options/notes.html");
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
    notesInput.style.width="90%"; 
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
        chrome.storage.sync.set({'notes': notesObj}, function() {
            // console.log('saved');          
        }); 
        // console.log(subUrl);
    }

    var aside = document.createElement("aside");
    aside.setAttribute("id","text-notes");
    aside.className = "widget widget_text";
    
    aside.appendChild(notesHeader);
    aside.appendChild(notesInput);



    secondary.insertBefore(aside, secondary.firstChild);



    // var header = document.getElementById('menu-top');
    // var allNotesLink = document.createElement('li');
    // allNotesLink.setAttribute("id","menu-item-notes");
    // allNotesLink.className = "menu-item menu-item-type-taxonomy menu-item-object-category menu-item-135017";

    // var a = document.createElement('a');
    // a.setAttribute('href',"chrome-extension://jcglgpokmhfaggmfmeodcgoedaikfpbb/options/notes.html");
    // a.innerHTML = "All Notes";
    // allNotesLink.appendChild(a);
    // header.appendChild(allNotesLink);


    // secondary.appendChild(notesInput);

  } 
}
