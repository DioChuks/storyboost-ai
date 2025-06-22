'use client';
import { StoryblokCMSProvider } from '@storyblok/react';

export default function StoryblokProvider({ children }) {
  return (
    <StoryblokCMSProvider
      accessToken={process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN}
      bridge
      apiOptions={{
        region: 'eu',
      }}
    >
      {children}
    </StoryblokCMSProvider>
  );
}
