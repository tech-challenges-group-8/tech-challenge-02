import type { Preview } from '@storybook/react-vite'

import { withI18n } from "../src/stories/decorators/withI18n";
import { withTheme } from "../src/stories/decorators/withTheme";
import { withUserContext } from "../src/stories/decorators/withUserContext"; 

export const decorators = [withI18n, withTheme, withUserContext];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;