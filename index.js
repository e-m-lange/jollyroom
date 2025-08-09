//import { defineConfig } from 'astro/config';

//export default defineConfig({
//base: '/jollyroom/', // <-- important for GitHub Pages paths
//});
//ran this npm install --save-dev gh-pages

if (typeof window !== "undefined") {
    // This runs only in the browser
    // CTA Buttons ---------------------------------------------->

    let CTA_1 = document.querySelector("#CTA-1");

    // Gallery Items

    const galleryImageBaseURL = "./images/"

    const galleries = [
        // Gallery 1
        [`karaoke_machine.webp`, `karaoke_singers.webp`, `karaoke_place_distance.webp`, `karaoke_tv.webp`],
        [`children_inflatableCastle_distance.webp`, `children_slide.webp`, `children_playtoys.webp`, `children_entrance.webp`, `games_boardgames.webp`, `games_tableFootball.webp`],
        [`poolTable_pingPong.webp`, `poolTable_pool.webp`, `poolTable_airHockey.webp`, `poolTable_exchangeable.webp`],
        [`mahjongTable_mahjong_closeUp.webp`, `mahjongTable_mahjong_distance.webp`, `mahjongTable_poker.webp`, `mahjongTable_distance.webp`],
    ]

    var galleryHasBeenSet = false;

    // When first loading the site
    function setGallery () {
        var newGallery;
        var galleryToSet = document.querySelectorAll(".gallery");

        galleryToSet.forEach((element) => {
            switch (element.id) {
                case "gallery1":
                    newGallery = [galleryImageBaseURL + galleries[0][0], galleryImageBaseURL + galleries[0][1], galleryImageBaseURL + galleries[0][2]];
                    break;
                case "gallery2":
                    newGallery = [galleryImageBaseURL + galleries[1][0], galleryImageBaseURL + galleries[1][1], galleryImageBaseURL + galleries[1][2]];
                    break;
                case "gallery3":
                    newGallery = [galleryImageBaseURL + galleries[2][0], galleryImageBaseURL + galleries[2][1], galleryImageBaseURL + galleries[2][2]];
                    break;
                case "gallery4":
                    newGallery = [galleryImageBaseURL + galleries[3][0], galleryImageBaseURL + galleries[3][1], galleryImageBaseURL + galleries[3][2]];
                    break;
            }
            updateGalleryImages(element, newGallery);
        })
        
        galleryHasBeenSet = true;
        console.log("loading");
    }

    function updateGalleryImages(gallery, newGallery) {
        gallery.querySelectorAll(".galleryItem img").forEach((element, i) => {
            element.src = newGallery[i];
        })
    }

    setGallery();

    // When using the arrow buttons to change the gallery
    window.changeGalleryImg = function (galleryID, direction) { // make it easier for inline to find
        var updatedGallery;
        var htmlObj;
        var imgToUpdate;
        var galleryNum;

        switch (galleryID) {
            case "gallery1":
                galleryNum = 0;
                break;
            case "gallery2":
                galleryNum = 1;
                break;
            case "gallery3":
                galleryNum = 2;
                break;
            case "gallery4":
                galleryNum = 3;
                break;
        }

        htmlObj = document.querySelector(`#${galleryID}`);

        var firstImage = htmlObj.querySelector(".galleryItem1 img").src;
        let firstImageURL = firstImage.split('/');
        let firstImageName = firstImageURL[firstImageURL.length - 1];

        var lastImage = htmlObj.querySelector(".galleryItem3 img").src;
        let lastImageURL = lastImage.split('/');
        let lastImageName = lastImageURL[firstImageURL.length - 1];

        updatedGallery = returnGallery(galleryNum, direction, firstImageName, lastImageName)

        for (let i = 0; i < 3; i++) {
            imgToUpdate = htmlObj.querySelectorAll(".galleryGrid .galleryItem img");
            imgToUpdate[i].src = updatedGallery[i];
        }
    }

    function returnGallery (id, direction, firstImageName, lastImageName) {
        var galleryToReturn = []
        if (direction === "left") {
            // Find out where we want to start based on current image shown as first in HTML
            var startIndex = galleries[id].findIndex((element) => { return element === firstImageName; });
            var lastIndex = galleries[id].findIndex((element) => { return element === lastImageName; });
            console.log( galleries[id]);
            console.log("last index " + lastIndex);

            returnNextIndexLeft(lastIndex, galleries[id]).forEach(element => {
            galleryToReturn.push(galleryImageBaseURL + galleries[id][element]); 
            });
        }
        else {
            // Find out where we want to start based on current image shown as first in HTML
            var startIndex = galleries[id].findIndex((element) => { console.log(element); return element === firstImageName; });
            
            returnNextIndexRight(startIndex, galleries[id]).forEach(element => {
            galleryToReturn.push(galleryImageBaseURL + galleries[id][element]); 
            });
        }

        return galleryToReturn;
    }

    function returnNextIndexLeft(lastIndex, galleryToCheck) {
        var returnArr = [];

        for (let i = 2; i >= 0; i--) { // Only give 3 images as a time
            var continueFrom;
            if (i == 2) { // To begin with
                continueFrom = lastIndex;
            }
            else {
                console.log("i " + i);
                continueFrom = returnArr[0];
            }
            
            console.log("----");
            console.log(continueFrom);
            console.log("----");

            if (continueFrom - 1 < 0) {
                returnArr.unshift(galleryToCheck.length - 1);
            }
            else { // otherwise just decrement
                returnArr.unshift(continueFrom - 1);
                console.log(continueFrom - 1);
            }
        }

        console.log("return arry");
        console.log(returnArr);
        return returnArr;
    }

    function returnNextIndexRight(startIndex, galleryToCheck) {
        var returnArr = [];

        for (let i = 0; i < 3; i++) { // Only give 3 images as a time
            var continueFrom;
            if (i == 0) { // To begin with
                continueFrom = startIndex;
            }
            else {
                continueFrom = returnArr[i - 1];
            }

            if (continueFrom + 1 >= galleryToCheck.length) { // if it is as the first index and goes below, jump to the end of the gallery array
                returnArr.push(0);
            }
            else { // otherwise just decrement
                returnArr.push(continueFrom + 1);
            }
        }

        return returnArr;
    }
}