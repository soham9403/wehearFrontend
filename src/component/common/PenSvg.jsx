const PenSvg = ({isWhite}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.953vw" height="1.953vw" viewBox="0 0 25 25" fill="none">
            <path d="M2.16476 16.3998L0.739762 22.5498C0.690604 22.7746 0.692289 23.0076 0.744694 23.2317C0.797099 23.4557 0.898899 23.6653 1.04266 23.845C1.18642 24.0247 1.36851 24.17 1.57562 24.2703C1.78273 24.3706 2.00964 24.4234 2.23976 24.4248C2.34699 24.4356 2.45503 24.4356 2.56226 24.4248L8.74976 22.9998L20.6298 11.1648L13.9998 4.5498L2.16476 16.3998Z" fill={isWhite?"white":"#A91674"} />
            <path d="M24.365 5.24022L19.94 0.815222C19.6491 0.52577 19.2554 0.363281 18.845 0.363281C18.4347 0.363281 18.041 0.52577 17.75 0.815222L15.29 3.27522L21.9125 9.89772L24.3725 7.43772C24.5165 7.29303 24.6305 7.12137 24.7081 6.93257C24.7856 6.74377 24.8252 6.54152 24.8245 6.33742C24.8238 6.13331 24.7828 5.93134 24.704 5.74307C24.6252 5.5548 24.51 5.38393 24.365 5.24022Z" fill={isWhite?"white":"#A91674"} />
        </svg>
    )
}
export default PenSvg