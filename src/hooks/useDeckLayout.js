import { useWindowDimensions } from 'react-native';

const PHONE_DECK_MAX = 540;
const TABLET_DECK_MAX = 820;
const LIBRARY_PADDING = 11;

export function useDeckLayout() {
  const { height, width } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;
  const horizontalPadding = isTablet ? 28 : 10;
  const deckPadding = isTablet ? 16 : 9;
  const gap = isTablet ? 12 : 7;
  const maxDeckWidth = isTablet ? TABLET_DECK_MAX : PHONE_DECK_MAX;
  const deckWidth = Math.min(width - horizontalPadding * 2, maxDeckWidth);
  const tileSize = Math.floor((deckWidth - deckPadding * 2 - gap * 3) / 4);
  const librarySize = Math.floor(
    (deckWidth - LIBRARY_PADDING * 2 - gap * 3) / 4,
  );

  return {
    deckPadding,
    deckWidth,
    gap,
    horizontalPadding,
    isTablet,
    librarySize,
    tileSize,
  };
}
