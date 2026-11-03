(function () {
  'use strict';

  const containers = document.querySelectorAll('.container');
  const hotSpots = document.querySelectorAll('svg circle');
  const tabs = document.querySelectorAll('#tabs button');
  const caption = document.querySelector('#caption');
  const capTitle = document.querySelector('#caption h2');
  const capText = document.querySelector('#caption p');

  let timer;        
  let prevLoc = 0; 

  const thoughts = {
    valley1: {
      title: 'The Tree Stands Alone',
      text: 'This tree has stood here for years and has never once been asked how it feels. It feels fine. It would like you to stop staring at it now, it gets shy.'
    },
    valley2: {
      title: 'Cloud Management',
      text: 'That cloud is carrying a lot of rain and zero emotional intelligence. Be like the cloud: heavy, unbothered, and dropping baggage wherever you need to. clock it.'
    },
    valley3: {
      title: 'The Golden Hour',
      text: 'Everyone chases the light. The light, meanwhile, is simply leaving. It cannot be held, only captured badly. Unless you have the Sony α7R V (model ILCE‑7RM5) *paid sponsorship by Sony*'
    },
    valley4: {
      title: 'A Shrub, Reflecting',
      text: 'The shrub knows its place. The shrub minds its own. The shrub is not in a hurry. The shrub also has no LinkedIn.'
    },

    sky1: {
      title: 'Quarterly Meeting of the Clouds',
      text: 'The big grey ones are in charge. They have decided to circle back. Nothing will be resolved, but there will be weather.'
    },
    sky2: {
      title: 'The Bright One',
      text: 'Every group has the cloud who gets all the sunlight and does none of the raining. You know who you are.'
    },
    sky3: {
      title: 'Small Clouds, Big Dreams',
      text: 'Small clouds believe they too may become storms. This belief is called ambition, be a small cloud.'
    },
    sky4: {
      title: 'The Horizon',
      text: 'A thin black line separating the sky from the ground, and you from your plans. It keeps getting farther away. Rude.'
    },

    beach1: {
      title: 'Figure Contemplating the Void',
      text: 'They have been staring at the sea for three hours. The sea has not blinked. Neither has anyone\'s inbox, but nobody is looking at that.'
    },
    beach2: {
      title: 'The Ocean',
      text: 'Vast, blue, indifferent. It does not care about your problems so stop confessing to it. It will, however, try to pull you in during high tide. Be careful'
    },
    beach3: {
      title: 'An Empty Bench',
      text: 'A bench is just a chair that gave up on being useful and became a place to feel things. Sit. Feel one thing. Leave.'
    },
    beach4: {
      title: 'Load-Bearing Post',
      text: 'This post holds up the entire shelter and gets no credit. If you have ever been the post, we see you. Please unionize.'
    },

    cove1: {
      title: 'The Big Grey Rock',
      text: 'Time has worn it smooth over a million years. That is also what the weekdays do to you, but faster.'
    },
    cove2: {
      title: 'The Suspiciously Blue Rock',
      text: 'Is it ice? Is it a rock? Is it a rock that wants to be ice? Identity is hard. Everyone is a little conflicted about it.'
    },
    cove3: {
      title: 'Water, Doing Water Things',
      text: 'The water takes the shape of whatever holds it, which makes it the wisest thing here and also very easy to push around; like you.'
    },
    cove4: {
      title: 'The Orange Boulders',
      text: 'These rocks are warm, a little dramatic, and refuse to be moved. Honestly, a role model.'
    }
  };

  // IMAGE MAP + CSS ZOOM + TIMER 

  hotSpots.forEach(function (eachSpot) {
    eachSpot.addEventListener('pointerenter', showThought);
    eachSpot.addEventListener('pointerleave', hideThought);
  });

  function showThought(event) {
    const id = event.target.id;                   
    const theImg = document.querySelector('.show img');

    if (event.target.getBoundingClientRect().top > window.innerHeight / 2) {
      caption.classList.add('top');
    } else {
      caption.classList.remove('top');
    }

    theImg.className = id;

    clearTimeout(timer);
    timer = setTimeout(function () {
      capTitle.textContent = thoughts[id].title;
      capText.textContent = thoughts[id].text;
      caption.classList.add('visible');
    }, 300);
  }

  function hideThought() {
    const theImg = document.querySelector('.show img');

    clearTimeout(timer);
    caption.classList.remove('visible');
    theImg.className = 'start';                    
  }

  // BUTTONS!
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
      hideThought();

      for (let j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('on');
        containers[j].classList.remove('show');
      }

      tabs[i].classList.add('on');
      containers[i].classList.add('show');
    });
  }

})();