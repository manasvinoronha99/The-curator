# The Commute - An Interactive Narrative Experience

An immersive, choice-driven narrative about human connection and isolation on a late-night train. Every small decision—where you look, who you notice, whether you engage—shapes a fragmented story of urban life.

## 🎭 About

**The Commute** is an interactive web experience that explores the liminal spaces of everyday life. Set on a late-night train, players navigate through a branching narrative where subtle choices accumulate to create meaningful emotional outcomes.

## ✨ Features

### Interactive Elements
- **Gaze System**: Switch between viewing the window, passengers, or your phone
- **Dynamic Passengers**: Hover and click to interact with fellow travelers
- **Branching Narrative**: 15+ unique scenes with multiple decision points
- **Multiple Endings**: 3 distinct emotional outcomes based on your choices

### Atmospheric Design
- **Soundscape System**: Web Audio API creates ambient train sounds that respond to your choices
- **Dynamic Lighting**: Lighting shifts through tunnel transitions and emotional moments
- **Window Reflections**: Visual effects that blur the line between interior and exterior
- **Emotional Tracking**: Real-time visualization of connection vs. isolation

### Narrative Depth
- **Fragmented Storytelling**: Piece together stories through observation and interaction
- **Character Encounters**: Multiple passengers with their own subtle narratives
- **Contemplative Pacing**: Designed for reflection and emotional resonance
- **Replayability**: Different choices lead to entirely different experiences

## 🎮 How to Play

### Controls
1. **Click "Begin"** to start your journey
2. **Gaze Buttons** (bottom center):
   - 🪟 Window - Look outside at the city
   - 👤 Passengers - Observe fellow travelers
   - 📱 Phone - Retreat into your device
3. **Hover over passengers** to see details
4. **Click passengers** to focus on them
5. **Make choices** by clicking the text options that appear

### Endings
Your choices accumulate emotional weight in two dimensions:
- **Connection**: Engaging with others, making eye contact, starting conversations
- **Isolation**: Looking away, focusing inward, avoiding interaction

The story concludes with one of three endings:
- **A Moment of Connection**: You chose to see and be seen
- **The Familiar Solitude**: You embraced the comfort of being alone
- **The Space Between**: You found meaning in observation itself

## 🚀 Getting Started

### Installation
1. Clone this repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required!

```bash
git clone https://github.com/manasvinoronha99/The-curator.git
cd The-curator
open index.html  # or double-click the file
```

### Browser Requirements
- Modern web browser with ES6 support
- Web Audio API support (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Recommended: Desktop/laptop for optimal experience

## 🎨 Customization

### Adding Your Own Visuals
The current version uses CSS-based graphics. To add your own images:

1. **Train Interior**: Add images to replace CSS backgrounds
   - Edit `.window-frame` in `style.css`
   - Replace `background:` with `background-image: url('your-image.jpg')`

2. **Passenger Silhouettes**: Replace `.passenger-silhouette` styling
   - Use actual photos or illustrations
   - Maintain aspect ratio for best results

3. **Cityscape**: Replace `.cityscape` animation
   - Create sprite-based scrolling cityscape
   - Update animation keyframes

### Adding Audio Files
Currently using Web Audio API for synthetic sounds. To add real audio:

```javascript
// In script.js, modify initAudio() function:
function initAudio() {
    const audio = new Audio('path/to/train-ambient.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioNodes.trainHum = audio;
}
```

Recommended audio files:
- `train-ambient.mp3` - Steady train hum
- `tunnel-echo.mp3` - Tunnel transition sound
- `conversation-murmur.mp3` - Distant conversations
- `station-announcement.mp3` - Station ambiance

### Modifying the Story
Edit the `scenes` array in `script.js`:

```javascript
{
    id: 0,
    text: "Your narrative text here...",
    choices: [
        {
            text: "Choice text",
            nextScene: 1,
            emotion: { connection: 10, isolation: 0 }
        }
    ],
    audioProfile: 'medium',  // low, medium, high, tunnel, muted, conversation
    lighting: 'normal'        // normal, dim, dark, warm, tunnel, phone-glow
}
```

## 🏗️ Project Structure

```
The-curator/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Game logic and interactivity
└── README.md           # Documentation
```

## 🎯 Design Philosophy

This project explores:
- **Micro-decisions**: How small choices shape our experience of the world
- **Urban isolation**: The paradox of being surrounded by people yet feeling alone
- **Emergent narrative**: Story that arises from player agency rather than fixed plot
- **Atmospheric storytelling**: Using sound, light, and visual design to convey emotion
- **Mindful interaction**: Encouraging reflection rather than rapid gameplay

## 🛠️ Technical Details

### Built With
- Vanilla JavaScript (ES6+)
- CSS3 with animations and transitions
- Web Audio API for dynamic soundscapes
- No external libraries or frameworks

### Performance
- Optimized for 60fps animations
- Minimal DOM manipulation
- CSS transitions for smooth effects
- Progressive enhancement approach

### Accessibility Considerations
- Keyboard navigation support (TODO)
- Audio toggle for sound-sensitive users
- High contrast visual design
- Screen reader compatibility (TODO)

## 🔮 Future Enhancements

- [ ] Add keyboard navigation
- [ ] Implement save/load system for choices
- [ ] Create more complex passenger interaction system
- [ ] Add time-of-day variations
- [ ] Mobile touch gesture support
- [ ] Achievement/memory system
- [ ] Social sharing of endings
- [ ] Accessibility improvements (ARIA labels, screen reader support)
- [ ] Multiple languages
- [ ] Original soundtrack and voice acting

## 📝 Credits

**Concept & Design**: Based on the interactive narrative prompt exploring urban connection and isolation

**Development**: Built with attention to atmosphere, pacing, and emotional resonance

**Inspiration**: The countless commutes we all take, the faces we see but never meet, and the stories that pass us by every day.

## 📄 License

This project is open source. Feel free to use, modify, and build upon it for your own interactive narrative projects.

## 🤝 Contributing

Contributions are welcome! Whether it's:
- New narrative branches
- Visual enhancements
- Audio assets
- Bug fixes
- Performance improvements

Please feel free to submit pull requests or open issues.

## 💭 A Note from the Creator

*"The Commute" is about noticing. In our daily lives, we pass by hundreds of stories without seeing them. This project invites you to slow down, to look, to wonder about the lives intersecting with yours. Even in a virtual space, the choice to notice matters.*

---

**Start your journey**: Open `index.html` and begin.

**Remember**: Every choice matters, even the small ones.
