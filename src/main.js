import {fetchImages, currentPage, totalHits, perPage} from './js/pixabay-api.js'
import {renderGallery} from './js/render-functions.js'
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"; 


const formElem = document.querySelector("#search-form");
const loader =  document.querySelector('.hide');
const loaderMoreBtn = document.querySelector(".loader-more")


let userQuery = "";

formElem.addEventListener('submit', async (e) => {
    e.preventDefault();
    userQuery =  formElem.elements.input.value;
showLoader();

try{
    const res = await fetchImages(userQuery);
         renderGallery(res);
            hideLoader();
            clearForm();

            loaderMoreBtn.classList.remove('hide');

        }  catch (error) {
            console.error('Error fetching images:', error);
            hideLoader();
        }
        
}) 

loaderMoreBtn.addEventListener('click', async () => {
    showLoader();

    try {
        const res = await fetchImages(userQuery);
        renderGallery(res);
        hideLoader();


        const card = document.querySelector(".card");
        const cardHeight = card.getBoundingClientRect().height;

        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        })

        if (currentPage * perPage >= totalHits) {
            loaderMoreBtn.classList.add('hide'); 
            iziToast.info({
              position: "center",
              title: 'Information',
              message: "We're sorry, but you've reached the end of search results."
            });
          }


    } catch (error) {
       
        hideLoader();
    }
});



function showLoader (){
loader.classList.remove('hide');
}

function hideLoader (){
    loader.classList.add('hide');
}

function clearForm () {
    formElem.reset();
}
