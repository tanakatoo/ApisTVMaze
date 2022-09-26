"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm( term ) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  //get only the show object from the array
  const res = await axios.get('http://api.tvmaze.com/search/shows', { params: { q: term} })
  const resShows = res.data.map((theShow) => { 
    return theShow.show
  })
  
  // const theInfo = resShows.map((show) => {
  //   return {
  //     id: show.id,
  //     summary: show.summary,
  //     image: show.image="",
  //     name: show.name
  //   }
  // })
  //can't destructure because of a null in the image. What to do?
   const theInfo = resShows.map(({ id, image, summary,name })=>({id, image ,summary,name }))
  //const theInfo = resShows.map(({ id, image: { medium: image = 'https://tinyurl.com/tv-missing'} , summary,name })=>({id, image ,summary,name }))
  console.log(theInfo)
  //loop over to see if image is null. If it is then set the "medium" to "https://tinyurl.com/tv-missing"
  return theInfo.map(({ id,image,summary,name }) => {
    if (!image) {
      image = { medium: "https://tinyurl.com/tv-missing" }
    }
    return {id,image,summary,name}
  })

  
 
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image.medium === null ? "https://tinyurl.com/tv-missing": show.image.medium }" 
              alt="${show.name}" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-dark btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

 $showsList.on("click", async function (evt) {
   evt.preventDefault();
   const tvID = $(evt.target).parent().parent().parent().attr("data-show-id")
   console.log(tvID)
   await getEpisodesOfShow(tvID);
});

async function getEpisodesOfShow(id) { 
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  console.log(res.data)

  const episodes =  res.data.map(({ id,name,season,number }) => {
    return {id,name,season,number}
  })
  $episodesArea.show();
  //console.log(episodes)
  populateEpisodes(episodes)
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) { 
  const ul = $("#episodes-list")
  ul.empty()
  for (let episode of episodes) {
    ul.append(`<li>${episode.name}(season ${episode.season}, number ${episode.number})</li>`)  
  }
  
}
