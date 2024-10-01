document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 200;
    let hue = 0;

    class Particle {
        constructor() {
            this.x = Math.random()