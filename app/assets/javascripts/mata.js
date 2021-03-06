


$(document).ready(function(){
  fetchIdeas()
  deleteIdea()
  createIdea()
  getTitleUpdate()
  getBodyUpdate()
  upvoteIdea()
  downvoteIdea()
  searchPage()

  function searchPage() {
    $("#search-bar").on("keyup", function (){
      var currentSearch = this.value.toLowerCase();
      $('.idea').each(function (_index, idea) {
        $idea = $(idea);
        if ( $idea.children(".idea-title").text().toLowerCase().indexOf(currentSearch) !== -1 ) {
          $(this).parent("div").fadeIn()
        } else if ( $idea.children(".idea-body").text().toLowerCase().indexOf(currentSearch) !== -1 ){
          $(this).parent("div").fadeIn()
        }
        else {
          $(this).parent('div').fadeOut();
        }
      });
    });
  }



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
      id = this.dataset.id
      text = $(this).parent('div')[0].getElementsByClassName("idea")[0]
      .getElementsByClassName("idea-quality")[0].innerHTML
      if (text === "Swill") {

        var ideaParams = {
          idea: {
            quality: "Plausible"
          }
        }
        $(this).parent('div')[0].getElementsByClassName("idea")[0]
        .getElementsByClassName("idea-quality")[0].innerHTML = "Plausible"
        updateApi(ideaParams, id)
      } else if (text === "Plausible") {
        var ideaParams = {
          idea: {
            quality: "Genius"
          }
        }
        $(this).parent('div')[0].getElementsByClassName("idea")[0]
        .getElementsByClassName("idea-quality")[0].innerHTML = "Genius"
        updateApi(ideaParams, id)
      }
    });
  }

  function downvoteIdea(){

    $("#latest-idea").on("click", "#downvote-idea", function(e) {
      debugger
      id = this.dataset.id
      text = $(this).parent('div')[0].getElementsByClassName("idea")[0]
      .getElementsByClassName("idea-quality")[0].innerHTML
      if (text === "Plausible") {

        var ideaParams = {
          idea: {
            quality: "Swill"
          }
        }
        $(this).parent('div')[0].getElementsByClassName("idea")[0]
        .getElementsByClassName("idea-quality")[0].innerHTML = "Swill"
        updateApi(ideaParams, id)
      } else if (text === "Genius") {
        var ideaParams = {
          idea: {
            quality: "Plausible"
          }
        }
        $(this).parent('div')[0].getElementsByClassName("idea")[0]
        .getElementsByClassName("idea-quality")[0].innerHTML = "Plausible"
        updateApi(ideaParams, id)
      }

    });
  }


  function updateApi(ideaParams, id) {
    $.ajax({
      url: "/api/v1/ideas/" + id,
      type: "PUT",
      dataType: "JSON",
      data: ideaParams,
      // success: function(data) {
      //   debugger
      //   $("#update-quality").text(data.quality)
      // }

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
        + "<h2>Quality</h2><p class='idea-quality' id='update-quality'>"+data.quality + "</p></div>"
        + "<button data-id="
        + data.id + " style='color:red' id='upvote-idea' class='glyphicon glyphicon-fire'></button>"
        + "<button data-id="
        + data.id + " style='color:blue' id='downvote-idea' class='glyphicon glyphicon-hand-down'></button>"
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
