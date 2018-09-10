$(document).ready(function(){      
    displaySaved(); 
 });

 const deleteSavedArticle = function(articleId) {
    console.log("Article ID: " + articleId);

    $.ajax({
        type: "PUT",
        url: "/delete-from-saved/" + articleId,
    }).then(function(response) {
        console.log(JSON.stringify(response));
        displaySaved();
    });
 };

 const saveNewNote = function(articleId) {
    var newNoteText = $("#noteTextInput").val();
    console.log(newNoteText);
    $.ajax({
        type:"POST",
        url:"/create-note/" + articleId,
        data: newNoteText
    }).then(function(response){
        //displayNotes();
    }); 
 };

//  const deleteNote = function(articleId) {

//  };


const displaySaved = function() {
    $.ajax({
        type:"GET",
        url:"/display-saved/"
    }).then(function(response) {
        console.log(response);

        const savedArticleResults = $("#savedArticles");
        savedArticleResults.empty();

        for (i = 0; i < response.length; i++) {
            const savedArticle = response[i];

            const deleteButton = $("<button>")
                .addClass("deleteButton")
                .text("Delete")
                .attr("id", savedArticle._id);

            const notesButton = $("<button>")
                .addClass("notesButton")
                .text("Notes")
                .attr("id", savedArticle._id);

            const title = $("<div>")
                .addClass("title")
                .text(savedArticle.title)
                .append(deleteButton)
                .append(notesButton);

            const link = $("<a>")
                .addClass("link")
                .text(savedArticle.link)
                .attr("href", savedArticle.link)
                .attr("target", "_blank");

            const summary = $("<p>")
                .addClass("summary")
                .text(savedArticle.summary);

            const listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            savedArticleResults.append(listItem);
        }
        
        $(".notesButton").on("click", function() {
            console.log("notesButton clicked");
            var articleId = $(this).attr('id');
            $.ajax({
                type:"GET",
                url:"/show-article-notes/" + articleId
            }).then(function(response) {
                console.log(response);
                document.getElementById("saved").style.display="none";
                document.getElementById("notes").style.display="block";
                
                const saveNoteInput = $("#button-addon4");
                saveNoteInput.empty();

                const saveNewNoteButton = $("<button>")
                    .attr("id", articleId)
                    .addClass("saveNoteButton")
                    .attr("type", "button")
                    .text("Save");
    
                saveNoteInput.append(saveNewNoteButton);
                
                const savedNotes = $("#savedArticleNotes");
                savedNotes.empty();
        
                for (i = 0; i < response.length; i++) {
                    const savedNote = response[i];
        
                    const deleteButton = $("<button>")
                        .addClass("deleteButton")
                        .text("Delete")
                        .attr("id", savedNote._id);
        
                    const noteText = $("<p>")
                        .addClass("noteText")
                        .text(savedNote.summary)
        
                    const listItem = $("<li>")
                        .addClass("article")
                        .append(noteText, deleteButton);
        
                    savedNotes.append(listItem);

                }
                $(".saveNoteButton").on("click", function() {
                    console.log("saveNoteButton clicked line 133");
                    var articleId = $(this).attr('id');
                    saveNewNote(articleId);
                });
            });
        });
            $(".deleteButton").on("click", function() {
                console.log("deleteButton clicked, line 112");
                var articleId = $(this).attr('id');
                deleteSavedArticle(articleId);
            });

    });
};

// const displayNotes = function() {
    
// };
