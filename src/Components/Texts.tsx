interface Paragraph{
    text: string,
    where:string,
}
export const ParagraphLink = ({text,where}:Paragraph)  => {

    return (
        <a 
        className='cursor-pointer hover:underline'
        href={where}>{text}</a>
    )

} 