const previews = document.querySelectorAll(".article-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close-btn");

let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX, startY;

function updateTransform() {
  lightboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

/* OPEN */
previews.forEach(preview => {
  preview.addEventListener("click", () => {
    lightboxImg.src = preview.src;

    scale = 1;
    posX = 0;
    posY = 0;

    updateTransform();
    lightbox.classList.add("show");
  });
});

/* CLOSE */
function closeLightbox() {
  lightbox.classList.remove("show");
  scale = 1;
  posX = 0;
  posY = 0;
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

/* ZOOM (scroll) */
lightboxImg.addEventListener("wheel", (e) => {
  e.preventDefault();

  const zoomStep = 0.1;

  if (e.deltaY < 0) {
    scale += zoomStep;
  } else {
    scale = Math.max(1, scale - zoomStep);
    if (scale === 1) {
      posX = 0;
      posY = 0;
    }
  }

  updateTransform();
});

/* PAN (drag) */
lightboxImg.addEventListener("mousedown", (e) => {
  if (scale <= 1) return;

  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;

  lightboxImg.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  posX = e.clientX - startX;
  posY = e.clientY - startY;

  updateTransform();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  lightboxImg.style.cursor = "grab";
});