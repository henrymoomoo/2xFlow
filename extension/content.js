// Function to handle changes in the DOM
function handleDOMChanges(mutationsList) {
  mutationsList.forEach((mutation) => {
    // Check if "fp-player" is clicked
    if (mutation.target.classList && mutation.target.classList.contains('fp-player')) {
      // Find the video element within "fp-player"
      const videoElement = mutation.target.querySelector('video');

      // Check if the video element is found
      if (videoElement) {
        // Add controls to the video
        videoElement.controls = true;

        // Remove autoplay attribute
        videoElement.removeAttribute('autoplay');

        // Remove the "inert" attribute
        videoElement.removeAttribute('inert');

        // Additional styling (modify as needed)
        videoElement.style.width = '100%'; // Example width style
        // Add more styling adjustments as needed
      }

      // Remove the "fp-ui" element if present
      const fpUiElement = mutation.target.querySelector('.fp-ui');
      if (fpUiElement) {
        fpUiElement.remove();
        console.log('fp-ui removed!');
      }

      // Additional styling (modify as needed)
      mutation.target.style.padding = '10px'; // Example padding style
      // Add more styling adjustments as needed
    }
  });
}

// Create a mutation observer
const observer = new MutationObserver(handleDOMChanges);

// Start observing changes in the body and its descendants
observer.observe(document.body, { childList: true, subtree: true });

// Message listener for changing playback speed
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'changeSpeed') {
    var videos = document.querySelectorAll('video');

    videos.forEach(function (video) {
      video.playbackRate = parseFloat(request.speed);
    });
  }
});
