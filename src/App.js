import { useStoryblok, StoryblokComponent } from "@storyblok/react";

function App() {

  let slug =
    window.location.pathname === "/"
      ? "home"
      : window.location.pathname.replace("/", "");

  const story = useStoryblok(slug, { version: "draft" });
  console.log("Using slug:", slug);
  console.log("Story data:", story);
  if (!story || !story.content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (story === null) {
    return <div>Page not found</div>;
  }


  return <StoryblokComponent blok={story.content} />;
}
export default App;
