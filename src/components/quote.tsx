

interface IProps {
    inline?: boolean
    quote: string
    cite?: string
    author?: string
    work?: string
}


export default function Quote ({
    inline = false,
    quote,
    cite,
    author,
    work,
}: IProps) {
    if (inline) return (
        <span role="quote"><q cite={cite}>{quote}</q>{author ? <span>{author}</span> : null}{work ? <cite>{work}</cite> : null}</span>
    )
    return (
        <blockquote cite={cite}>
            <p>{quote}</p>
            {author ? (
                <footer>
                    <span>{author}</span>
                    {work ? <cite>{work}</cite> : null}
                </footer>
            ) : null}
        </blockquote>
    )
}
