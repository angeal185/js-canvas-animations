particlesJS("part", {
    particles: {
        number: {
            value: 90,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#2f09c3"
        },
        shape: {
            type: "star",
            stroke: {
                width: 0,
                color: "#fff"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: .5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: .1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 20,
                size_min: .1,
                sync: true
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: .2,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    }
});