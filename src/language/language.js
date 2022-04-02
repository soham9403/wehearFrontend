import English from "./English"

const language = (value, language) => {
    switch (language) {
        case "english": return English[value] ?? value
    }
}
export default language