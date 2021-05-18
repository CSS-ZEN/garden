
export const DEFUALT_SIZE = '30px'

export default function IconArrowL ({
    className = '',
    width = DEFUALT_SIZE,
}) {
    return (
        <svg className={`${className} icon`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={width}>
            <path d="M745.285161 872.975355c18.999726 18.643616 18.999726 50.612725 0 69.936839-18.935258 19.648502-50.579979 19.648502-70.228481 0L279.492552 547.349089c-20.037359-19.681248-20.037359-51.293223 0-70.617337L675.05668 80.843236c19.648502-19.324114 51.293223-19.324114 70.228481 0 18.999726 19.681248 18.999726 50.579979 0 70.228481L384.187009 511.48937 745.285161 872.975355 745.285161 872.975355z" />
        </svg>
    )
}