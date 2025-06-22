import Page from "@/components/Page";
import Feature from "@/components/Feature";
import Grid from "@/components/Grid";
import Teaser from "@/components/Teaser";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import AiEditor from "@/components/AiEditor";

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
    use: [apiPlugin],
    components: {
        page: Page,
        feature: Feature,
        grid: Grid,
        teaser: Teaser,
        ai_editor: AiEditor
    },
    apiOptions: {
        endpoint: "https://api.storyblok.com",
    },
});
