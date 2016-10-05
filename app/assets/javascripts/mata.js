

$(document).ready(function(){
  fetchIdeas()
  deleteIdea()
  createIdea()

  function fetchIdeas(){
    $.ajax({
      type: "GET",
      url: "/api/v1/ideas",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        data.map(createIdeaHTML) }
      })
    }


   function handleError(data){console.log(data)}

    function createIdeaHTML(data){
      $("#latest-idea").prepend(
        "<div class = 'well'>"
        + "<div class ='idea' data-id='"
        + data.id + "'>"
        + "<h2>Title</h2><p> " +data.title + "</p>"
        + "<h2>Body</h2><p> " +data.body + "</p>"
        + "<h2>Quality</h2><p> "+data.quality + "</p></div>"
        + "<button data-id="
        + data.id
        + " id='delete-post' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
        + "</div>"
        + "</div>"
      );
    }

    function deleteIdea(){
      $("#latest-idea").on("click", "#delete-post", function(){
        var $idea = this.previousSibling
        var $button = this.closest("div")
        $.ajax({
          url: "/api/v1/ideas/" + $idea.dataset.id,
          method: "delete"
        }).then( function(){
          $button.remove()
          $idea.remove()
        }).fail(handleError)
      })
    }

    function createIdea() {
      $("#create-post").on("click", function() {
        var ideaParams = {
          idea: {
            title: $("#idea-title").val(),
            body: $("#idea-body").val(),
            quality: "Swill"
          }
        }
        $("input[type=text], textarea").val("")
        $.post("/api/v1/ideas", ideaParams)
        .then(createIdeaHTML)
        .then(renderIdeas)
      })
    }


    function renderIdeas(data){

      $("#latest-idea").html(data);
    }


  });
