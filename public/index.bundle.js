if (typeof window !== "undefined") {
    // This runs only in the browser
    // CTA Buttons ---------------------------------------------->
    document.querySelector("#CTA-1");

    // Gallery Items
    const galleryImageBaseURL = "./images/";

    // Images to be used in the gallery
    const galleries = [
        [`karaoke_machine.webp`, `karaoke_singers.webp`, `karaoke_place_distance.webp`, `karaoke_tv.webp`],
        [`children_inflatableCastle_distance.webp`, `children_slide.webp`, `children_playtoys.webp`, `children_entrance.webp`, `games_boardgames.webp`, `games_tableFootball.webp`],
        [`poolTable_pingPong.webp`, `poolTable_pool.webp`, `poolTable_airHockey.webp`, `poolTable_exchangeable.webp`],
        [`mahjongTable_mahjong_closeUp.webp`, `mahjongTable_mahjong_distance.webp`, `mahjongTable_poker.webp`, `mahjongTable_distance.webp`],
        [`amenities_kitchen_distanceFar.webp`, `amenities_kitchen_distanceClose.webp`, `amenities_fridge.webp`, `amenities_breastfeeding.webp`, `amenities_shoerack.webp`],
    ];

    // When first loading the site, set the gallery for the first time
    function setGallery () {
        var newGallery;
        var galleryToSet = document.querySelectorAll(".gallery");

        galleryToSet.forEach((element) => {
            // since number is at the end of the gallery (unless the format changes, which would mean swapping to a switch statement)
            let newNum = parseInt(element.id.slice(7) - 1); // get rid of 'gallery'
            newGallery = [galleryImageBaseURL + galleries[newNum][0], galleryImageBaseURL + galleries[newNum][1], galleryImageBaseURL + galleries[newNum][2]];
            updateGalleryImages(element, newGallery);
        });
    }

    // Set the gallery images to the first 3 items in the new gallery (only 3 images are shown at a time)
    function updateGalleryImages(gallery, newGallery) {
        gallery.querySelectorAll(".galleryItem img").forEach((element, i) => {
            element.src = newGallery[i];
        });
    }

    setGallery();

    // When using the arrow buttons to change the gallery, called by the arrow buttons attached to each gallery
    window.changeGalleryImg = function (galleryID, direction) { // window.ch.. makes it easier for inline function call to find
        var updatedGallery;
        var htmlObj;
        var imgToUpdate;
        var galleryNum;

        // since number is at the end of the gallery (unless the format changes, which would mean swapping to a switch statement)
        galleryNum = parseInt(galleryID.slice(7)) - 1; // get rid of 'gallery'

        htmlObj = document.querySelector(`#${galleryID}`); // Get the gallery that is currently being interacted with

        // Depending on if going left or right on the gallery, the starting point will either be the first image (going right) or the last image (going left)
        var firstImage = htmlObj.querySelector(".galleryItem1 img").src;
        let firstImageURL = firstImage.split('/');
        let firstImageName = firstImageURL[firstImageURL.length - 1];

        var lastImage = htmlObj.querySelector(".galleryItem3 img").src;
        let lastImageURL = lastImage.split('/');
        let lastImageName = lastImageURL[firstImageURL.length - 1];

        updatedGallery = returnGallery(galleryNum, direction, firstImageName, lastImageName);

        for (let i = 0; i < 3; i++) { // only 3 images shown at a time
            imgToUpdate = htmlObj.querySelectorAll(".galleryGrid .galleryItem img");
            imgToUpdate[i].src = updatedGallery[i];
        }
    };

    // returns the sest of images that should be shown when clicking arrow to the left or right
    function returnGallery (id, direction, firstImageName, lastImageName) {
        var galleryToReturn = [];
        if (direction === "left") { //pas
            // Find out where we want to start based on current image shown as first in HTML (e.g., starting from image 2 in the gallery)
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

    // If the left arrow in the gallery was clicked
    function returnNextIndexLeft(lastIndex, galleryToCheck) {
        var returnArr = [];

        for (let i = 2; i >= 0; i--) { // We move backwards when clicking left
            var continueFrom;
            if (i == 2) { // To begin with, we start counting from the index of last image
                continueFrom = lastIndex;
            }
            else {
                continueFrom = returnArr[0]; // Otherwise, continue from the value that was last added to the array we will return (unshift adds to the beginning of array)
            }

            // We start counting now
            if (continueFrom - 1 < 0) { // if we move backwards and go beyond 0, just to the end of the gallery array
                returnArr.unshift(galleryToCheck.length - 1); // We are adding values to the beginning of the array
            }
            else { // otherwise just decrement
                returnArr.unshift(continueFrom - 1);
                console.log(continueFrom - 1);
            }
        }

        return returnArr;
    }

    // If the right arrow in the gallery was clicked
    function returnNextIndexRight(startIndex, galleryToCheck) {
        var returnArr = [];

        for (let i = 0; i < 3; i++) { // Only give 3 images as a time
            var continueFrom;
            if (i == 0) { // To begin with, we start counting from the index of first image
                continueFrom = startIndex;
            }
            else {
                continueFrom = returnArr[i - 1]; // Otherwise, we will continue from the value that was last added to the array we will return (end of the array)
            }

            // We start counting now
            if (continueFrom + 1 >= galleryToCheck.length) { // If it is as the first index and goes below, jump to the end of the gallery array
                returnArr.push(0);
            }
            else { // Otherwise just increment
                returnArr.push(continueFrom + 1);
            }
        }

        return returnArr;
    }
}

//npm run build, npx rollup -c, then can npm run dev
//# sourceMappingURL=index.bundle.js.map
