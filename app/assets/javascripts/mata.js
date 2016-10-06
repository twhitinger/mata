


$(document).ready(function(){
  fetchIdeas()
  deleteIdea()
  createIdea()
  getTitleUpdate()
  getBodyUpdate()
  upvoteIdea()
  downvoteIdea()


  $("#search-bar").on("keyup", function (){
  var currentSearch = this.value.toLowerCase();
  $('.idea').each(function (_index, idea) {
    $idea = $(idea);
    if ( $idea.children(".idea-title").text().toLowerCase().indexOf(currentSearch) !== -1 ) {
      $idea.show();
    } else if ( $idea.children(".idea-body").text().toLowerCase().indexOf(currentSearch) !== -1 ){
      $idea.show();
    }
    else {
      $(this).parent('div').fadeOut();
    }
  });
});



  function getTitleUpdate(){
    $(document).on("blur", "#update-title",function(){
      var ideaParams = {
        idea: {
          title: $(this).text(),
        }
      }
      id = this.parentElement.dataset.id
      updateApi(ideaParams, id)
    });
  }

  function getBodyUpdate(){
    $(document).on("blur","#update-body",function(){
      var ideaParams = {
        idea: {
          body: $(this).text(),
        }
      }
      id = this.parentElement.dataset.id
      updateApi(ideaParams, id)
    });
  }

  function upvoteIdea(){
    $("#latest-idea").on("click", "#upvote-idea", function(e) {

      id = $(".idea")[0].dataset.id
      text = $("#update-quality").text()
      if (text === "Swill") {

        var ideaParams = {
          idea: {
            quality: "Plausible"
          }
        }
        updateApi(ideaParams, id)
      } else if (text === "Plausible") {
        var ideaParams = {
          idea: {
            quality: "Genius"
          }
        }
      }
        updateApi(ideaParams, id)
    });
  }

  function downvoteIdea(){

    $("#latest-idea").on("click", "#downvote-idea", function(e) {

      id = $(".idea")[0].dataset.id
      text = $("#update-quality").text()
      if (text === "Plausible") {

        var ideaParams = {
          idea: {
            quality: "Swill"
          }
        }
        updateApi(ideaParams, id)
      } else if (text === "Genius") {
        var ideaParams = {
          idea: {
            quality: "Plausible"
          }
        }
      }
        updateApi(ideaParams, id)
    });
  }


  function updateApi(ideaParams, id) {
    $.ajax({
      url: "/api/v1/ideas/" + id,
      type: "PUT",
      dataType: "JSON",
      data: ideaParams,
      success: function(data) {
        $("#update-quality").text(data.quality)
      }

    })
  }


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
        "<div class ='well'>"
        + "<div class ='idea' data-id='"
        + data.id + "'>"
        + "<h2>Title</h2><p class='idea-title'id='update-title' contenteditable=true> " +data.title
        + "<h2>Body</h2><p class='idea-body' id='update-body' contenteditable=true> " +data.body + "</p>"
        + "<h2>Quality</h2><p id='update-quality'>"+data.quality + "</p></div>"
        + "<button style='color:red' id='upvote-idea' class='glyphicon glyphicon-fire'></button>"
        + "<button style='color:blue' id='downvote-idea' class='glyphicon glyphicon-hand-down'></button>"
        + "<button data-id="
        + data.id + " "
        + "id='delete-post' name='button-fetch' class='btn btn-danger btn-xs'>Delete</button>"
        + "</div>"
        + "</div>"
      );
    }



    function deleteIdea(){
      $("#latest-idea").on("click", "#delete-post", function(){
        var $idea = this
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
