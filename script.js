// Game State
const gameState = {
    currentScene: 0,
    emotionalState: {
        connection: 0,
        isolation: 0
    },
    choices: [],
    currentGaze: 'passengers',
    audioEnabled: true,
    scenesVisited: []
};

// Audio Context (Web Audio API)
let audioContext;
let audioNodes = {
    trainHum: null,
    conversations: null,
    silence: null
};

// Scene Data Structure
const scenes = [
    {
        id: 0,
        text: "The train doors close. The fluorescent lights buzz overhead. You find yourself surrounded by strangers in this late-night carriage.",
        choices: [
            { text: "Sit by the window", nextScene: 1, emotion: { isolation: 10 } },
            { text: "Make eye contact with a passenger", nextScene: 3, emotion: { connection: 10 } },
            { text: "Pull out your phone", nextScene: 5, emotion: { isolation: 5 } }
        ],
        audioProfile: 'medium',
        lighting: 'normal'
    },
    {
        id: 1,
        text: "You settle by the window. Your reflection stares back at you, merging with the city lights streaming past. The glass is cold against your shoulder.",
        choices: [
            { text: "Watch the city blur by", nextScene: 2, emotion: { isolation: 15, connection: 5 } },
            { text: "Notice someone's reflection in the glass", nextScene: 7, emotion: { connection: 15 } },
            { text: "Close your eyes and listen", nextScene: 9, emotion: { isolation: 10 } }
        ],
        audioProfile: 'low',
        lighting: 'dim'
    },
    {
        id: 2,
        text: "Buildings flash by like memories. You wonder about all the lit windows—each one a life you'll never know. The train enters a tunnel.",
        choices: [
            { text: "Let your mind wander", nextScene: 11, emotion: { isolation: 20 } },
            { text: "Look around at other passengers", nextScene: 8, emotion: { connection: 10 } }
        ],
        audioProfile: 'tunnel',
        lighting: 'tunnel',
        tunnel: true
    },
    {
        id: 3,
        text: "Your eyes meet theirs for a brief moment. They offer a slight nod—an acknowledgment that you both exist in this shared space.",
        choices: [
            { text: "Smile back", nextScene: 4, emotion: { connection: 20 } },
            { text: "Look away quickly", nextScene: 6, emotion: { isolation: 15 } },
            { text: "Keep looking, curious", nextScene: 10, emotion: { connection: 25 } }
        ],
        audioProfile: 'medium',
        lighting: 'normal'
    },
    {
        id: 4,
        text: "They smile too, and for a moment, the late-night train feels less lonely. They're reading a worn paperback—something about the cover suggests they've read it before.",
        choices: [
            { text: "Ask about the book", nextScene: 12, emotion: { connection: 30 } },
            { text: "Return to your thoughts", nextScene: 9, emotion: { isolation: 10 } },
            { text: "Get off at the next stop", nextScene: 'ending-connection', emotion: { connection: 15 } }
        ],
        audioProfile: 'low',
        lighting: 'warm'
    },
    {
        id: 5,
        text: "The screen glows in your hands. Notifications from hours ago. The same faces scrolling by. Nothing feels urgent, yet you keep looking.",
        choices: [
            { text: "Put the phone away", nextScene: 8, emotion: { connection: 5 } },
            { text: "Keep scrolling", nextScene: 13, emotion: { isolation: 20 } },
            { text: "Look up briefly", nextScene: 7, emotion: { connection: 8 } }
        ],
        audioProfile: 'muted',
        lighting: 'phone-glow'
    },
    {
        id: 6,
        text: "You avert your gaze, feeling the weight of the missed moment. The train rocks gently. Why is it so hard to connect?",
        choices: [
            { text: "Try again with someone else", nextScene: 3, emotion: { connection: 10 } },
            { text: "Focus on your own thoughts", nextScene: 9, emotion: { isolation: 15 } },
            { text: "Get off one stop early", nextScene: 'ending-isolation', emotion: { isolation: 10 } }
        ],
        audioProfile: 'low',
        lighting: 'dim'
    },
    {
        id: 7,
        text: "In the window's reflection, you see a woman checking her watch repeatedly. A man with headphones, eyes closed, mouthing words to a song only he can hear.",
        choices: [
            { text: "Wonder about their stories", nextScene: 14, emotion: { connection: 15 } },
            { text: "Turn to see them directly", nextScene: 8, emotion: { connection: 12 } },
            { text: "Stay lost in the reflection", nextScene: 2, emotion: { isolation: 10 } }
        ],
        audioProfile: 'medium',
        lighting: 'reflection'
    },
    {
        id: 8,
        text: "You observe the carriage. A spectrum of humanity. Everyone carrying their own weight, their own destinations, their own stories converging for this brief journey.",
        choices: [
            { text: "Feel connected to this moment", nextScene: 14, emotion: { connection: 25 } },
            { text: "Feel overwhelmingly alone", nextScene: 11, emotion: { isolation: 20 } },
            { text: "Check the next station", nextScene: 'ending-contemplation', emotion: { connection: 10, isolation: 10 } }
        ],
        audioProfile: 'medium',
        lighting: 'normal'
    },
    {
        id: 9,
        text: "You close your eyes. The train's rhythm becomes a meditation. Fragments of conversation drift by—someone's laugh, a sigh, the rustle of newspaper.",
        choices: [
            { text: "Let the sounds wash over you", nextScene: 14, emotion: { connection: 15 } },
            { text: "Sink deeper into yourself", nextScene: 11, emotion: { isolation: 15 } },
            { text: "Open your eyes to reality", nextScene: 8, emotion: { connection: 10 } }
        ],
        audioProfile: 'high',
        lighting: 'dim'
    },
    {
        id: 10,
        text: "They close their book, meeting your gaze again. There's a question in their eyes—or maybe an invitation. The next stop is approaching.",
        choices: [
            { text: "Start a conversation", nextScene: 12, emotion: { connection: 35 } },
            { text: "This is your stop, get off", nextScene: 'ending-connection', emotion: { connection: 20 } },
            { text: "Look away, the moment passed", nextScene: 6, emotion: { isolation: 10 } }
        ],
        audioProfile: 'low',
        lighting: 'warm'
    },
    {
        id: 11,
        text: "The isolation isn't painful—it's familiar. Like a worn coat. You've made peace with being a observer, a ghost on this late-night train.",
        choices: [
            { text: "Accept this solitude", nextScene: 'ending-isolation', emotion: { isolation: 25 } },
            { text: "Fight against it", nextScene: 8, emotion: { connection: 15 } },
            { text: "Get off at the next stop", nextScene: 'ending-contemplation', emotion: { isolation: 15 } }
        ],
        audioProfile: 'low',
        lighting: 'dark'
    },
    {
        id: 12,
        text: "'Have you read it?' they ask, showing you the cover. You recognize it—everyone does. But suddenly it's not about the book. It's about this moment, this connection.",
        choices: [
            { text: "Share your thoughts about it", nextScene: 'ending-connection', emotion: { connection: 40 } },
            { text: "Admit you haven't, but you're curious", nextScene: 'ending-connection', emotion: { connection: 35 } },
            { text: "The conversation flows naturally", nextScene: 'ending-connection', emotion: { connection: 45 } }
        ],
        audioProfile: 'conversation',
        lighting: 'warm'
    },
    {
        id: 13,
        text: "The phone becomes a barrier. You're here but not here. The train stops, people get off, new people get on. You barely notice. The battery is at 12%.",
        choices: [
            { text: "Finally put it away", nextScene: 8, emotion: { connection: 5 } },
            { text: "Keep scrolling until your stop", nextScene: 'ending-isolation', emotion: { isolation: 30 } },
            { text: "Look up one last time", nextScene: 14, emotion: { connection: 10 } }
        ],
        audioProfile: 'muted',
        lighting: 'phone-glow'
    },
    {
        id: 14,
        text: "There's something profound in this. All of you, strangers, sharing this metal tube hurtling through the city. Each person a universe unto themselves.",
        choices: [
            { text: "Feel grateful for the perspective", nextScene: 'ending-contemplation', emotion: { connection: 20, isolation: 5 } },
            { text: "Smile at the absurdity of it all", nextScene: 'ending-connection', emotion: { connection: 25 } },
            { text: "Prepare to get off at your stop", nextScene: 'ending-contemplation', emotion: { connection: 15, isolation: 10 } }
        ],
        audioProfile: 'medium',
        lighting: 'normal'
    }
];

// Ending scenarios
const endings = {
    'ending-connection': {
        title: "A Moment of Connection",
        text: "The train doors open at your stop. You exchange a nod, maybe even a number or a name. As you step onto the platform, the night feels less cold. Small choices, you realize, can open doors. Tonight, you chose to see and be seen.",
        emotion: 'connection',
        color: '#4a5f8f'
    },
    'ending-isolation': {
        title: "The Familiar Solitude",
        text: "You arrive at your destination, stepping onto the empty platform. The other passengers disperse into the night, shadows receding. You feel the weight of distance, the comfort of anonymity. Some journeys we take alone.",
        emotion: 'isolation',
        color: '#2a2a3a'
    },
    'ending-contemplation': {
        title: "The Space Between",
        text: "As the train pulls away from your stop, you walk home through quiet streets. Tonight was neither connection nor disconnection—it was observation. Sometimes the most profound thing is simply to witness, to be present in the liminal spaces of life.",
        emotion: 'contemplation',
        color: '#5f4a8f'
    }
};

// Initialize game
function init() {
    setupEventListeners();
    initAudio();
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('audio-toggle').addEventListener('click', toggleAudio);

    // Gaze control buttons
    document.querySelectorAll('.gaze-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gaze = e.currentTarget.dataset.gaze;
            changeGaze(gaze);
        });
    });

    // Passenger interactions
    document.querySelectorAll('.passenger').forEach(passenger => {
        passenger.addEventListener('mouseenter', (e) => {
            showPassengerDetail(e.currentTarget);
        });
        passenger.addEventListener('mouseleave', (e) => {
            hidePassengerDetail(e.currentTarget);
        });
        passenger.addEventListener('click', (e) => {
            focusPassenger(e.currentTarget);
        });
    });
}

// Audio System
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        createAmbientSounds();
    } catch (e) {
        console.log('Web Audio API not supported');
        gameState.audioEnabled = false;
    }
}

function createAmbientSounds() {
    // Create oscillators for ambient train sounds
    // In a production version, you would load actual audio files
    if (!audioContext) return;

    // Train hum (low frequency)
    const trainHum = audioContext.createOscillator();
    const trainGain = audioContext.createGain();
    trainHum.type = 'sine';
    trainHum.frequency.setValueAtTime(60, audioContext.currentTime);
    trainGain.gain.setValueAtTime(0, audioContext.currentTime);
    trainHum.connect(trainGain);
    trainGain.connect(audioContext.destination);
    trainHum.start();

    audioNodes.trainHum = { oscillator: trainHum, gain: trainGain };
}

function updateAudioProfile(profile) {
    if (!audioContext || !gameState.audioEnabled) return;

    const trainGain = audioNodes.trainHum?.gain;
    if (!trainGain) return;

    const currentTime = audioContext.currentTime;

    switch(profile) {
        case 'high':
            trainGain.gain.linearRampToValueAtTime(0.3, currentTime + 1);
            break;
        case 'medium':
            trainGain.gain.linearRampToValueAtTime(0.15, currentTime + 1);
            break;
        case 'low':
            trainGain.gain.linearRampToValueAtTime(0.05, currentTime + 1);
            break;
        case 'muted':
            trainGain.gain.linearRampToValueAtTime(0.02, currentTime + 1);
            break;
        case 'tunnel':
            trainGain.gain.linearRampToValueAtTime(0.25, currentTime + 0.5);
            break;
        case 'conversation':
            trainGain.gain.linearRampToValueAtTime(0.08, currentTime + 1);
            break;
        default:
            trainGain.gain.linearRampToValueAtTime(0.1, currentTime + 1);
    }
}

function toggleAudio() {
    gameState.audioEnabled = !gameState.audioEnabled;
    const icon = document.getElementById('audio-icon');

    if (gameState.audioEnabled && audioContext) {
        audioContext.resume();
        icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>';
    } else {
        if (audioContext) audioContext.suspend();
        icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>';
    }
}

// Gaze System
function changeGaze(gaze) {
    gameState.currentGaze = gaze;

    // Update button states
    document.querySelectorAll('.gaze-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-gaze="${gaze}"]`).classList.add('active');

    // Update view
    const phoneView = document.getElementById('phone-view');
    const interior = document.getElementById('train-interior');
    const window = document.getElementById('train-window');

    switch(gaze) {
        case 'window':
            phoneView.classList.remove('active');
            interior.style.opacity = '0.5';
            window.style.opacity = '1';
            document.getElementById('reflection').classList.add('active');
            break;
        case 'passengers':
            phoneView.classList.remove('active');
            interior.style.opacity = '0.9';
            window.style.opacity = '0.8';
            document.getElementById('reflection').classList.remove('active');
            break;
        case 'phone':
            phoneView.classList.add('active');
            interior.style.opacity = '0.3';
            window.style.opacity = '0.5';
            document.getElementById('reflection').classList.remove('active');
            updateAudioProfile('muted');
            break;
    }
}

// Passenger Interactions
function showPassengerDetail(passenger) {
    const detail = passenger.querySelector('.passenger-detail');
    const passengerNum = passenger.dataset.passenger;

    const details = [
        "They seem lost in thought...",
        "Checking their watch again...",
        "Reading something intently..."
    ];

    if (detail) {
        detail.textContent = details[passengerNum - 1] || "A fellow traveler...";
        detail.classList.remove('hidden');
        detail.classList.add('visible');
    }
}

function hidePassengerDetail(passenger) {
    const detail = passenger.querySelector('.passenger-detail');
    if (detail) {
        detail.classList.remove('visible');
        setTimeout(() => {
            detail.classList.add('hidden');
        }, 300);
    }
}

function focusPassenger(passenger) {
    document.querySelectorAll('.passenger').forEach(p => {
        p.classList.remove('focused');
    });
    passenger.classList.add('focused');

    // Could trigger specific narrative events here
    updateEmotionalState({ connection: 2 });
}

// Lighting System
function updateLighting(lightingType) {
    const interior = document.getElementById('train-interior');
    const tunnel = document.getElementById('tunnel');

    switch(lightingType) {
        case 'tunnel':
            tunnel.classList.add('active');
            setTimeout(() => tunnel.classList.remove('active'), 3000);
            break;
        case 'dim':
            interior.style.background = 'linear-gradient(to bottom, rgba(20, 20, 30, 0.8), rgba(10, 10, 20, 0.95))';
            break;
        case 'warm':
            interior.style.background = 'linear-gradient(to bottom, rgba(40, 35, 30, 0.7), rgba(25, 20, 20, 0.85))';
            break;
        case 'dark':
            interior.style.background = 'linear-gradient(to bottom, rgba(10, 10, 15, 0.9), rgba(5, 5, 10, 0.95))';
            break;
        case 'phone-glow':
            interior.style.background = 'linear-gradient(to bottom, rgba(20, 25, 35, 0.8), rgba(15, 18, 25, 0.9))';
            break;
        case 'reflection':
            document.getElementById('reflection').classList.add('active');
            break;
        default:
            interior.style.background = 'linear-gradient(to bottom, rgba(30, 30, 40, 0.7), rgba(20, 20, 30, 0.85))';
            document.getElementById('reflection').classList.remove('active');
    }
}

// Emotional State System
function updateEmotionalState(emotions) {
    if (emotions.connection) {
        gameState.emotionalState.connection += emotions.connection;
        updateEmotionBar('connection', gameState.emotionalState.connection);
    }
    if (emotions.isolation) {
        gameState.emotionalState.isolation += emotions.isolation;
        updateEmotionBar('isolation', gameState.emotionalState.isolation);
    }
}

function updateEmotionBar(type, value) {
    const bar = document.querySelector(`#${type}-bar .bar-fill`);
    const percentage = Math.min((value / 100) * 100, 100);
    bar.style.width = `${percentage}%`;
}

// Game Flow
function startGame() {
    document.getElementById('loading-screen').classList.remove('active');
    gameState.currentScene = 0;
    gameState.emotionalState = { connection: 0, isolation: 0 };
    gameState.choices = [];

    // Start ambient audio
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }

    updateAudioProfile('medium');
    displayScene(scenes[0]);
}

function restartGame() {
    document.getElementById('ending-screen').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');

    setTimeout(() => {
        startGame();
    }, 500);
}

function displayScene(scene) {
    if (!scene) return;

    gameState.scenesVisited.push(scene.id);

    // Update story text with typewriter effect
    const storyText = document.getElementById('story-text');
    storyText.style.opacity = '0';

    setTimeout(() => {
        storyText.textContent = scene.text;
        storyText.style.animation = 'none';
        setTimeout(() => {
            storyText.style.animation = 'fadeInText 1s ease forwards';
        }, 10);
    }, 300);

    // Update audio and lighting
    updateAudioProfile(scene.audioProfile || 'medium');
    updateLighting(scene.lighting || 'normal');

    // Display choices after a delay
    setTimeout(() => {
        displayChoices(scene.choices);
    }, 1500);
}

function displayChoices(choices) {
    const choiceInterface = document.getElementById('choice-interface');
    const choicesContainer = document.getElementById('choices-container');

    choicesContainer.innerHTML = '';

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.style.animationDelay = `${index * 0.1}s`;

        button.addEventListener('click', () => {
            makeChoice(choice);
        });

        choicesContainer.appendChild(button);
    });

    choiceInterface.classList.remove('hidden');
    choiceInterface.classList.add('active');
}

function makeChoice(choice) {
    gameState.choices.push(choice);

    // Update emotional state
    if (choice.emotion) {
        updateEmotionalState(choice.emotion);
    }

    // Hide choices
    const choiceInterface = document.getElementById('choice-interface');
    choiceInterface.classList.remove('active');

    setTimeout(() => {
        choiceInterface.classList.add('hidden');

        // Navigate to next scene
        if (typeof choice.nextScene === 'string' && choice.nextScene.startsWith('ending-')) {
            showEnding(choice.nextScene);
        } else {
            const nextScene = scenes.find(s => s.id === choice.nextScene);
            if (nextScene) {
                displayScene(nextScene);
            }
        }
    }, 500);
}

function showEnding(endingId) {
    const ending = endings[endingId];
    if (!ending) return;

    const endingScreen = document.getElementById('ending-screen');
    const endingTitle = document.getElementById('ending-title');
    const endingText = document.getElementById('ending-text');

    // Set ending content
    endingTitle.textContent = ending.title;
    endingText.textContent = ending.text;

    // Set background based on emotional tone
    endingScreen.className = '';
    endingScreen.classList.add(ending.emotion);

    // Fade out scene, fade in ending
    document.getElementById('scene-container').style.opacity = '0';

    setTimeout(() => {
        endingScreen.classList.add('active');
        updateAudioProfile('low');
    }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility for audio
document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioContext) {
        audioContext.suspend();
    } else if (!document.hidden && audioContext && gameState.audioEnabled) {
        audioContext.resume();
    }
});
