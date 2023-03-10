import ghpages from "gh-pages";

ghpages.publish("dist", (error) => console.log("Ошибка:", error.message));
