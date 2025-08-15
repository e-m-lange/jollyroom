// alterntaive import gsap from "https://cdn.skypack.dev/gsap"; using RollUp!! npx rollup -c
//https://gsap.com/community/forums/topic/37876-uncaught-typeerror-failed-to-resolve-module-specifier-gsapdistgsap/
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

console.log("GSAP animation script loaded");

document.addEventListener("DOMContentLoaded", () => {
  runAnimation();
});

function runAnimation() {
    // Register Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    function startAnimations() {
        bg3PathDraw();
        setHeroAnimations();
        connectAllGalleryButtons();
        gallerySlide();
    }

    startAnimations();

    // Hero Section ---------------------------------------------->
    // Fade in and up the hero images
    function setHeroAnimations() {
        let heroGridItems = document.querySelectorAll(".heroGridItem-a, .heroGridItem-c, .heroGridItem-d");
        let transformY = [150, 100, 250]; // So they move at different paces, staggered effect
        let durations = [0.8, 0.6, 0.85]; // Staggered effect

        heroGridItems.forEach((heroItem, i) => {
            gsap.fromTo(heroItem, {
                y: transformY[i],
                opacity: '0',
            },{
                y: 0,
                opacity: '1',
                duration: durations[i],
            })
        });
    }

    // Areas to Explore Section ---------------------------------------------->
    // Draw the line that appears in the 'Areas to Explore' section
    function bg3PathDraw () {
        let bg3Path = document.querySelector("#background-3 path");
        const bg3PathLength = bg3Path.getTotalLength();
        gsap.set(bg3Path, {strokeDasharray: bg3PathLength}) // Set the length of the dash to the total length of the svg which is hidden/shown by moving this gap
        gsap.fromTo(bg3Path, {
            strokeDashoffset: bg3PathLength // will start from where the dash gap starts, hence looks invisible and undrawn
            }, {
            strokeDashoffset: 0, // eventually brings the non gap part into view, giving a drawing effect
            //ease:"none",
            //duration: 10, this would make it timed (the drawing effect)
            scrollTrigger: {
                trigger: "#background-3", // starts counting the scroll once the container is in view
                start: "top top",
                end: "bottom bottom",
                ease: 'none',
                scrub: 11, // this ties the animation progress to scroll position //true for same speed=
            }    
        });
    }

    // Gallery --------------------------------------
    
    function connectAllGalleryButtons() {
        
        function galleryArrowAnimation (arrows, direction) {
            arrows.forEach(element => {
                element.addEventListener("click", function() {
                    // animate the arrow button
                    gsap.fromTo( 
                        element,
                        {
                            y: 30,
                            x: 30 * direction,
                            rotation: 15 * direction,
                        },
                        {
                            y: 0,
                            x: 0,
                            rotation: 0,
                            duration: 0.4,
                        }
                    )

                    // Animate the first and last images that are on the side, just opacity effect
                    element.parentElement.querySelectorAll(".galleryItem1, .galleryItem3").forEach(itemElement => {
                        gsap.fromTo( 
                            itemElement,
                            {
                                opacity: 0,
                            },
                            {
                                opacity: 1,
                                duration: 0.4,
                            }
                        )
                    })

                    // animate image that is in focus, will rotate slightly in the direction of the arrow pressed
                    gsap.fromTo( 
                        element.parentElement.querySelector(".galleryItem2"),
                        {
                            y: 30,
                            scale: 0.95,
                            rotation: 2 * direction,
                        },
                        {
                            y: 0,
                            scale: 1,
                            rotation: 0,
                            duration: 0.4,
                        }
                    )
                })
            });
        };

        let galleryRightArrowBtns = document.querySelectorAll(".galleryRightArrow");
        let galleryArrowLeftBtns = document.querySelectorAll(".galleryLeftArrow");

        galleryArrowAnimation (galleryRightArrowBtns, 1);
        galleryArrowAnimation (galleryArrowLeftBtns, -1);
    }

    function isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1; // for the jittery performance on firefox
    }

    // Gallery transition as you scroll, pinned card effect
    function gallerySlide() {
        var galleries = document.querySelectorAll(".gallery");

        galleries.forEach((gallery, i) => {
            gsap.timeline({
                scrollTrigger: {
                    //markers: true,
                    pin: true,
                    pinSpacing: i === galleries.length - 1 ? true : false,
                    pinType: isFirefox() ? "transform" : "fixed",
                    trigger: gallery, // starts counting the scroll once the container is in view
                    start: "top top",
                    end: i === galleries.length - 1 ? "bottom 35%" : "+=100%", // keeps it pinned for 1 viewport height
                    scrub: 1, // this ties the animation progress to scroll position //true for same speed
                    ease: 'none',
                    toggleActions: "play none reverse none",
                    fastScrollEnd: true,
                    preventOverlaps: true,
                }
            })
            .addLabel("fadeStart", 0.5) // halfway through the scroll
            .fromTo(gallery, { opacity: 1 }, { opacity: 0, ease: "none" }, "fadeStart");
        })
    }
}
