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
    aside.appendChild(notesInput);



    secondary.insertBefore(aside, secondary.firstChild);
    // secondary.appendChild(notesInput);

  } 
}
