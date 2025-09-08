# Internet History: From ARPANET to Modern Web

## Timeline: Key Milestones

### 1960s - The Beginning
- **1969**: ARPANET connects 4 universities (UCLA, Stanford, UCSB, Utah)
- First message: "LO" (supposed to be "LOGIN" but system crashed)
- Military funded, designed to survive nuclear attack
- **Fun fact**: Internet was born same year as Woodstock and Moon landing

### 1970s - Foundation Protocols
- **1973**: TCP/IP invented by Vint Cerf & Bob Kahn
- **1978**: First spam email sent (advertising DEC computers)
- **1979**: USENET created for discussion groups

### 1980s - Going Global
- **1983**: DNS introduced (no more memorizing IP addresses!)
- **1986**: NSFNET created (academic backbone)
- **1989**: [Tim Berners-Lee proposes the World Wide Web](www-proposal.md) at CERN

### 1990s - The Web Explosion
- **1991**: First website goes live [info.cern.ch](http://info.cern.ch)
- **1993**: [Mosaic browser](https://en.wikipedia.org/wiki/NCSA_Mosaic) with images!
- **1994**: Amazon, Yahoo founded
- **1995**: JavaScript created in 10 days by Brendan Eich
- **1996**: CSS 1.0 released; Space Jam website still online unchanged!
- **1997**: Netflix founded as DVD-by-mail service (no streaming!)
- **1998**: Google founded in a garage (Sergey & Larry were PhD students)

### 2000s - Web 2.0
- **2003**: MySpace launches (Tom was everyone's first friend)
- **2004**: Facebook launches (Harvard only, no "like" button until 2009!)
- **2005**: YouTube's first video: ["Me at the zoo"](https://www.youtube.com/watch?v=jNQXAC9IVRw) (19 seconds)
- **2006**: Twitter's first tweet; 140 char limit from SMS constraints
- **2007**: iPhone changes mobile web forever (no App Store yet!)
- **2008**: HTML5 draft published; Bitcoin whitepaper released

### 2010s-Now - Modern Era
- **2010**: Instagram sold for $1B (had 13 employees!)
- **2012**: "Gangnam Style" breaks YouTube view counter
- **2014**: HTML5 becomes official standard
- **2015**: HTTP/2 approved; Amazon AWS revenue > their retail business
- **2016**: TikTok launches internationally (was Musical.ly)
- **2020**: HTTP/3 (QUIC) standardized; Zoom from 10M to 300M users
- **2021**: NFT jpeg sells for $69 million
- **Today**: 5.4 billion internet users; avg person checks phone 96 times/day

## Core Technologies Explained

### TCP/IP - The Internet's Language
- **TCP**: Breaks data into packets, ensures delivery
- **IP**: Addresses and routes packets
- Like postal service: IP = address, TCP = tracking/confirmation

### DNS - The Internet's Phone Book
- Translates `google.com` → `142.250.80.46`
- Hierarchical: Root → .com → google → www
- 13 root servers worldwide
- **College trivia**: Your university probably runs its own DNS server
- **Speed fact**: Average DNS lookup takes 20-120ms

### HTTP/HTTPS - The Web's Protocol
- **Request-Response** model
- Methods: GET, POST, PUT, DELETE
- Status codes: 200 (OK), 404 (Not Found), 500 (Server Error)
- **418**: "I'm a teapot" (actual joke status code from 1998!)
- HTTPS = HTTP + encryption (TLS/SSL)

## The Web Standards Trinity

### HTML - Structure
```html
<article>
  <h1>Title</h1>
  <p>Content</p>
</article>
```
- Semantic markup
- Accessibility built-in
- Currently HTML5

### CSS - Presentation
```css
article {
  display: grid;
  gap: 1rem;
}
```
- Separation of concerns
- Responsive design
- CSS3 with Flexbox/Grid

### JavaScript - Behavior
```javascript
button.addEventListener('click', () => {
  console.log('Interactive!');
});
```
- Dynamic content
- Client & server-side (Node.js)
- ECMAScript standards (ES6+)

## Why This Matters for Engineers

### Understanding the Stack
- **Network layer**: TCP/IP, DNS, CDNs
- **Protocol layer**: HTTP, WebSockets, GraphQL
- **Application layer**: Your code!

### Career Relevance
- Web tech powers mobile apps 
- Desktop apps use web tech (Electron: VS Code, Discord, Slack, Spotify)
- IoT devices speak HTTP/MQTT
- Cloud services = distributed web systems
- **Money talk**: Avg web developer salary: **$70k-95k** entry, **$110k-140k** up to **181k**+ senior
- **Job market**: 23% growth expected by 2031 (much faster than average)

### Problem-Solving Skills
- **Debugging**: Understanding DNS helps fix "site won't load"
- **Performance**: HTTP caching, CDNs, compression
- **Security**: HTTPS, CORS, CSP, XSS prevention
- **Scalability**: Load balancing, microservices

## Key Takeaways

### The Internet vs The Web
- **Internet**: Global network of networks (1969)
- **Web**: Information system on the Internet (1991)
- Internet = highways, Web = cars and destinations

### Open Standards Win
- No single company controls HTML/CSS/JS
- W3C, WHATWG, IETF maintain standards
- Open source drives innovation

### Everything is Connected
- Your smart fridge runs JavaScript (probably Node.js)
- Tesla downloads 4GB+ updates via HTTP
- Your AirPods firmware updates use web protocols
- Campus WiFi auth uses RADIUS (web-based protocol)
- **Web development = universal development**
- **Mind-blowing**: NASA's Mars rovers get software updates via deep space HTTP

## Fun Facts & College Life
- 🌍 First webcam monitored coffee pot at Cambridge (relatable!)
- 📧 Ray Tomlinson chose @ for email addresses in 1971
- 🔍 Google was almost called "BackRub" (imagine "BackRubbing" something)
- 💾 Average webpage today (2.39MB) > entire Doom game (2.39MB)
- ⚡ One Google search = ~0.3Wh (same as your body burns in 10 seconds)
- 🚀 JavaScript created in 10 days (your final project: 3 weeks)
- 🎮 Fortnite runs on AWS; when it goes down, so does half the internet
- 📱 TikTok's algorithm was written by a UC Berkeley dropout
- 💸 The most expensive domain ever sold: Cars.com for $872 million
- 🍕 Pizza Hut's first online order was in 1994 (large pepperoni with mushrooms)
- 🎵 Spotify uses ~96kbps; Napster era MP3s were 128kbps
- 👾 Discord was originally built for League of Legends players

## Resources for Deep Dives
- [Internet History Timeline](https://www.computerhistory.org/internethistory/)
- [How DNS Works (comic)](https://howdns.works/)
- [HTTP Status Dogs](https://httpstatusdogs.com/)