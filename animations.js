 // alterntaive import gsap from "https://cdn.skypack.dev/gsap"; using RollUp!
//https://gsap.com/community/forums/topic/37876-uncaught-typeerror-failed-to-resolve-module-specifier-gsapdistgsap/
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register Plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (typeof window !== "undefined") {
    let bg3SVG = document.querySelector("#background-3");
    let bg3Path = bg3SVG.querySelector("path");
    const bg3PathLength = bg3Path.getTotalLength();
    gsap.set(bg3Path, {strokeDasharray: bg3PathLength})
    gsap.fromTo(bg3Path, {
        strokeDashoffset: bg3PathLength // will start from where the dash gap starts, hence looks invisible and undrawn
        },
        {
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
        }
    )

    // Hero Section ---------------------------------------------->

    // Fade in and up the hero images
    let heroGridItem_A = document.querySelector(".heroGridItem-a");
    let heroGridItem_B = document.querySelector(".heroGridItem-b");
    let heroGridItem_C = document.querySelector(".heroGridItem-c");

    gsap.fromTo(heroGridItem_A, 
        {
            y: 150,
            opacity: '0',      
        },
        {
            y: 0,
            opacity: '1',
            duration: 0.8,
        }
    );

    gsap.fromTo(heroGridItem_B, 
        {
            y: 100,
            opacity: '0'
        },
        {
            y: 0,
            opacity: '1',
            duration: 0.6,
        }
    );

    gsap.fromTo(heroGridItem_C, 
        {
            y: 250,
            opacity: '0'
        },
        {
            y: 0,
            opacity: '1',
            duration: 0.85,
        }
    );

    // Gallery --------------------------------------

    function connectAllGalleryButtons() {
        let galleryArrowBtns = document.querySelectorAll(".galleryRightArrow");
        //console.log(galleryArrowBtns);
        galleryArrowBtns.forEach(element => {
            element.addEventListener("click", function() { 
                {
                    gsap.fromTo( 
                        element,
                        {
                            y: 30,
                            x: 30,
                            rotation: 15,
                        },
                        {
                            y: 0,
                            x: 0,
                            rotation: 0,
                            duration: 0.4,
                        }
                    )
                }

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

                gsap.fromTo( 
                    element.parentElement.querySelector(".galleryItem2"),
                    {
                        y: 30,
                        scale: 0.95,
                        rotation: 2,
                    },
                    {
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                    }
                )
            })

            console.log(element.parentElement.parentElement.id); // risky, but to get the gallery ID
        });

        // For the left arrows
        let galleryArrowLeftBtns = document.querySelectorAll(".galleryLeftArrow");
        console.log(galleryArrowBtns);
        galleryArrowLeftBtns.forEach(element => {
            element.addEventListener("click", function() { 
                {
                    gsap.fromTo( 
                        element,
                        {
                            y: 30,
                            x: -30,
                            rotation: -15,
                        },
                        {
                            y: 0,
                            x: 0,
                            rotation: 0,
                            duration: 0.4,
                        }
                    )
                }

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

                gsap.fromTo( 
                    element.parentElement.querySelector(".galleryItem2"),
                    {
                        y: 30,
                        scale: 0.95,
                        rotation: -2,
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
    }

    connectAllGalleryButtons();

    function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1; // for the jittery performance
    }

    // Gallery transition as you scroll
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

    gallerySlide();
}
