# AgentLoop Studio Native

Standalone Expo/React Native adaptation of AgentLoop Studio for phones and
tablets.

## Layout

- The deck always uses four columns.
- Stickers are square on both phones and tablets.
- Tablet widths increase tile size and spacing without changing the deck
  structure.
- The Prompt control spans two positions, matching the original 15-position
  deck.
- Connection is fixed beside Preview, outside the 11 configurable positions.
- Edit mode displays a four-column library of square sticker tiles.

## Run

Requirements: Node.js 22.13 or newer and an Android/iOS development environment
compatible with Expo SDK 57.

```bash
npm install
npm start
```

Then choose Android, iOS, or scan the development-build QR code.

```bash
npm run android
npm run ios
```

## Connection behavior

- Desktop and Web open the official ChatGPT sign-in page.
- API opens the official OpenAI API keys page.
- The app never collects or stores an OpenAI email, password, or API key.

The current native project implements the complete responsive control-deck
interface and local interaction state. Connecting deck actions to the original
AgentLoop MCP server is a separate host-integration step.

## Structure

- `App.js`: application state and action orchestration only.
- `src/components/`: reusable deck, header, library, toast, and modal components.
- `src/hooks/useDeckLayout.js`: responsive four-column measurements.
- `src/deck-model.js`: sticker catalogue and initial placement.
- `src/theme.js`: shared palette and common visual primitives.
